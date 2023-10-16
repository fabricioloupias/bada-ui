import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connect-db";
import { createErrorResponse } from "../../../lib/utils";
import { TriggerModel } from "../../../models/Trigger";
import { mongoose } from "@typegoose/typegoose";
import { ActionModel } from "../../../models/Action";
import { INode } from "react-flow-builder";
import { v4 as uuidV4 } from "uuid";

export type NewTriggerDTO = {
    adaptiveDialogId: string;
    $kind: string
    intent: string
}

// crear trigger para adaptive dialog Id
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as NewTriggerDTO

        const trigger = await TriggerModel.create({
            adaptiveDialogId: new mongoose.mongo.ObjectId(body.adaptiveDialogId),
            $kind: body.$kind,
            intent: body.intent
        })

        const actions = generateActions(trigger.$kind)
        await Promise.all(actions.map(action => {
            return ActionModel.create({
                ...action,
                triggerId: trigger._id
            })
        }))

        const json_response = {
            status: "success",
            trigger,
        };

        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

const generateActions = ($kind: string): INode[] => {
    const actions = []
    if ($kind === "Microsoft.OnIntent") {
        actions.push({
            "id": uuidV4(),
            "type": "Microsoft.OnIntent",
            "name": "Al reconocer intent",
            "path": [
                "0"
            ],
            "data": {
            }
        })
        actions.push({
            "id": uuidV4(),
            "type": "Bada.End",
            name: "final",
            "path": [
                "1"
            ],
        })
    }

    if ($kind === "Microsoft.OnBeginDialog") {
        actions.push({
            "id": uuidV4(),
            "type": "Microsoft.OnBeginDialog",
            "name": "Al iniciar dialogo",
            "path": [
                "0"
            ]
        })
        actions.push({
            "id": uuidV4(),
            "type": "Bada.End",
            "name": "final",
            "path": [
                "1"
            ],
        })
    }

    return actions
}