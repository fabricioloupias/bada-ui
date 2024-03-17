import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "../../../lib/utils";
import connectDB from "../../../lib/connect-db";
import { AdaptiveDialog, AdaptiveDialogsModel } from "../../../models/AdaptiveDialog";
import { TriggerModel } from "../../../models/Trigger";
import mongoose from "mongoose"

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const botVersionId = request.nextUrl.searchParams.get("botVersionId");

        if (!botVersionId) {
            return NextResponse.json({
                status: 'error',
                message: "Faltan parametros"
            })
        }

        const adaptiveDialogsModel: AdaptiveDialog[] = await AdaptiveDialogsModel.find({
            botVersionId: new mongoose.Types.ObjectId(botVersionId)
        })

        const triggerPromises = []
        for (const a of adaptiveDialogsModel) {
            triggerPromises.push(TriggerModel.find({
                adaptiveDialogId: a._id
            }))
        }

        const resolved = await Promise.all(triggerPromises)
        const adaptiveDialogs: AdaptiveDialog[] = []

        adaptiveDialogsModel.forEach((adaptiveDialog, index) => {
            adaptiveDialogs.push({
                ...adaptiveDialog.toJSON(),
                triggers: resolved[index]
            })
        })

        const json_response = {
            status: "success",
            adaptive_dialogs: adaptiveDialogs
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export type NewAdaptiveDialogDTO = {
    botVersionId: string,
    id: string
}

// crear adaptive dialog para bot version Id
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as NewAdaptiveDialogDTO

        const adaptiveDialog = await AdaptiveDialogsModel.create({
            botVersionId: new mongoose.mongo.ObjectId(body.botVersionId),
            $kind: "Microsoft.AdaptiveDialog",
            id: body.id
        })

        const json_response = {
            status: "success",
            adaptive_dialog: adaptiveDialog,
        };

        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

export type UpdateAdaptiveDialogDTO = {
    adaptiveDialog: AdaptiveDialog,
}

// Actualizar adaptive dialog
export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as UpdateAdaptiveDialogDTO

        const adaptiveDialog = await AdaptiveDialogsModel.findByIdAndUpdate(body.adaptiveDialog._id, body.adaptiveDialog)

        const json_response = {
            status: "success",
            adaptive_dialog: adaptiveDialog,
        };

        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}