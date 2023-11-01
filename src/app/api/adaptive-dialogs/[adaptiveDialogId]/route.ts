import connectDB from "@/lib/connect-db";
import { createErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { AdaptiveDialogsModel } from "@/models/AdaptiveDialog";
import { AdaptiveDialogDeletedModel } from "@/models/AdaptiveDialogDeleted";
import mongoose from "mongoose";

// eliminar adaptive dialog
export async function DELETE(request: NextRequest,
    { params }: {
        params: { adaptiveDialogId: string }
    }) {
    await connectDB();
    const session = await mongoose.startSession();;

    try {
        const { adaptiveDialogId } = params;

        await session.withTransaction(async () => {
            return await Promise.all(
                [
                    AdaptiveDialogsModel.findByIdAndDelete(new mongoose.mongo.ObjectId(adaptiveDialogId)),
                    AdaptiveDialogDeletedModel.create(
                        [
                            {
                                _id: new mongoose.mongo.ObjectId(adaptiveDialogId)
                            }
                        ]
                    )
                ]
            )
        })

        let json_response = {
            status: "success",
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        if (session) {
            console.log(await session.abortTransaction());
        }
        return createErrorResponse(error.message, 500);
    } finally {
        session.endSession();
    }
}