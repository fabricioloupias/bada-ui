import connectDB from "@/lib/connect-db";
import { AdaptiveDialog, AdaptiveDialogsModel } from "@/models/AdaptiveDialog";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/utils";
import { Trigger, TriggerModel } from "@/models/Trigger";
import { Action, ActionModel } from "@/models/Action";
import { parseToActions } from "@/utils";
import { FlattenMaps } from "mongoose";
import axios from "axios";

type SetToBotDTO = {
    adaptiveDialogIds: string[]
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as SetToBotDTO
        const _ids = body.adaptiveDialogIds.map(id => new mongoose.mongo.ObjectId(id))
        const adaptiveDialogs = await AdaptiveDialogsModel.find({
            _id: _ids
        })

        const triggers = await TriggerModel.find({
            adaptiveDialogId: _ids
        })

        const _triggerIds = triggers.map(trigger => trigger._id)

        const actions = await ActionModel.find({
            triggerId: _triggerIds
        })

        const toBot: AdaptiveDialog[] = []
        adaptiveDialogs.forEach(adaptiveDialog => {
            let adaptive = adaptiveDialog.toJSON();
            adaptive.triggers = []
            console.log('triggers', triggers)
            const triggersByAdaptiveDialogId = triggers.filter(t => t.adaptiveDialogId.toString() === adaptiveDialog._id.toString()) as FlattenMaps<Trigger>[]
            adaptive.triggers = JSON.parse(JSON.stringify(triggersByAdaptiveDialogId)) as FlattenMaps<Trigger>[]
            let triggersCopy: mongoose.FlattenMaps<Trigger>[] = []
            adaptive.triggers.forEach(trigger => {
                let newTrigger = {
                    ...trigger
                }
                const actionsToParse = actions.filter(a => a.triggerId.toString() === newTrigger._id.toString())
                const actionsParsed: Action[] = []
                parseToActions(actionsToParse, actionsParsed)
                newTrigger.actions = actionsParsed as FlattenMaps<Action>[]
                triggersCopy.push(newTrigger)
            })
            adaptive.triggers = triggersCopy
            toBot.push(adaptive)
        })

        const response = await axios.post('http://192.168.0.243:3978/api/publish', {
            dialogs: toBot
        })

        if (response.status === 201) {
            return NextResponse.json({
                status: "success",
                message: "Enviado correctamente"
            });
        }

        const jsonResponse = {
            status: "error",
            message: response.data
        };

        return NextResponse.json(jsonResponse);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}