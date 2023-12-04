import connectDB from "@/lib/connect-db";
import { AdaptiveDialog, AdaptiveDialogsModel } from "@/models/AdaptiveDialog";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/utils";
import { Trigger, TriggerModel } from "@/models/Trigger";
import { Action, ActionModel } from "@/models/Action";
import { parseToActions, setByPath } from "@/utils";
import mongoose, { FlattenMaps } from "mongoose";
import axios from "axios";

type SetToBotDTO = {
    adaptiveDialogIds: string[]
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as SetToBotDTO
        const _ids = body.adaptiveDialogIds.map(id => new mongoose.Types.ObjectId(id))
        const adaptiveDialogs: AdaptiveDialog[] = await AdaptiveDialogsModel.find({
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
            let adaptive = adaptiveDialog.toJSON() as AdaptiveDialog;
            adaptive.triggers = []
            const triggersByAdaptiveDialogId = triggers.filter(t => t.adaptiveDialogId.toString() === adaptiveDialog._id.toString()) as FlattenMaps<Trigger>[]
            adaptive.triggers = JSON.parse(JSON.stringify(triggersByAdaptiveDialogId)) as FlattenMaps<Trigger>[]
            let triggersCopy: Trigger[] = []
            adaptive.triggers.forEach(trigger => {
                let newTrigger = {
                    ...trigger
                } as Trigger
                const actionsToParse = actions.filter(a => a.triggerId.toString() === newTrigger._id.toString())

                const treeNodes: Action[] = []
                actionsToParse.forEach(a => {
                    setByPath(treeNodes, a.path!.join("."), a)
                })

                const actionsParsed: Action[] = []
                parseToActions(treeNodes, actionsParsed)
                newTrigger.actions = actionsParsed
                triggersCopy.push(newTrigger)
            })
            adaptive.triggers = triggersCopy
            toBot.push(adaptive)
        })

        const response = await axios.post(`${process.env.BADA_HOST}/api/publish`, {
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
        console.error(error)
        return createErrorResponse(error.message, 500);
    }
}