import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/connect-db";
import { TriggerModel } from "../../../../models/Trigger";
import { createErrorResponse } from "../../../../lib/utils";
import mongoose from "mongoose";

export async function GET(request: NextRequest,
    { params }: {
        params: { triggerId: string }
    }) {
    try {
        const { triggerId } = params;
        await connectDB();

        const trigger = await TriggerModel.findById(triggerId).exec();

        let json_response = {
            status: "success",
            trigger,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

//eliminar trigger por id
export async function DELETE(request: NextRequest,
    { params }: {
        params: { triggerId: string }
    }) {
    try {
        const { triggerId } = params;
        await connectDB();

        const trigger = await TriggerModel.findByIdAndDelete(new mongoose.mongo.ObjectId(triggerId));

        let json_response = {
            status: "success",
            trigger,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}