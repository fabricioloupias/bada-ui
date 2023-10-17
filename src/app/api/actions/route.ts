import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connect-db";
import { createErrorResponse } from "../../../lib/utils";
import { ActionModel } from "../../../models/Action";
import mongoose from "mongoose";
import { INode } from "react-flow-builder";

// obtener actions por triggerId
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const triggerId = request.nextUrl.searchParams.get("triggerId");

        if (!triggerId) {
            return NextResponse.json({
                status: "error",
                message: "Faltan parámetros"
            });
        }

        const actions = await ActionModel.find({
            triggerId: new mongoose.mongo.ObjectId(triggerId)
        }).exec();

        let json_response = {
            status: "success",
            actions,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

interface ActionDTO extends INode {
    triggerId: string,
    _id?: string
}
type NewActionsDTO = {
    actionsToSave: ActionDTO[]
}
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json() as NewActionsDTO

        //TODO: tener en cuenta que cambia todo el arbol
        await Promise.all(body.actionsToSave.map(actionToSave => {
            if (actionToSave._id) {
                return ActionModel.findByIdAndUpdate(new mongoose.mongo.ObjectId(actionToSave._id), {
                    ...actionToSave,
                    triggerId: new mongoose.mongo.ObjectId(actionToSave.triggerId)
                })
            } else {
                ActionModel.create({
                    ...actionToSave,
                    _id: new mongoose.mongo.ObjectId(actionToSave.id),
                    triggerId: new mongoose.mongo.ObjectId(actionToSave.triggerId),
                })
            }
        }))


        let json_response = {
            status: "success",
            message: "Acciones guardadas exitosamente",
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        console.log(error)
        return createErrorResponse(error.message, 500);
    }
}