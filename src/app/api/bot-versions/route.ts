import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "../../../lib/utils";
import connectDB from "../../../lib/connect-db";
import { BotVersionModel } from "../../../models/BotVersion";
import { VersionCounterModel } from "../../../models/VersionCounter";
import { AdaptiveDialogsModel } from "../../../models/AdaptiveDialog";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const botId = request.nextUrl.searchParams.get("botId");
        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");

        const filterPage = page_str ? parseInt(page_str, 10) : 1;
        const filterLimit = limit_str ? parseInt(limit_str, 10) : 10;

        const page = filterPage ?? 1;
        const limit = filterLimit ?? 10;
        const skip = (page - 1) * limit;

        if (!botId) {
            return NextResponse.json({
                status: "error",
                message: "Faltan parámetros"
            });
        }

        const data = await BotVersionModel.find({
            botId: new mongoose.Types.ObjectId(botId)
        });
        const results = data.length;

        let json_response = {
            status: "success",
            results,
            bot_versions: data,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

type NewBotVersionDTO = {
    botId: string;
    userId: string;
    fromVersionId: string;
}

//crear nueva version para un bot
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json() as NewBotVersionDTO

        const versionCounter = await VersionCounterModel.findOne({
            botId: new mongoose.Types.ObjectId(body.botId)
        })

        if (versionCounter) {
            const newCount = versionCounter.counter + 1
            const data = await BotVersionModel.create({
                botId: body.botId,
                isDraft: true,
                createdBy: body.userId,
                version: newCount
            })

            await AdaptiveDialogsModel.create({
                botVersionId: data._id,
                id: "Root",
                $kind: "Microsoft.AdaptiveDialog",
                recognizer: {
                    $kind: "Bada.MCRecognizer",
                    intents: [
                    ]
                }
            })

            versionCounter.counter++
            await versionCounter.save()

            let json_response = {
                status: "success",
                bot_version: data,
            };
            return NextResponse.json(json_response);
        }

        return createErrorResponse("Bot no encontrado", 404);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}

