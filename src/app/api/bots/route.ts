import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "../../../lib/utils";
import connectDB from "../../../lib/connect-db";
import { Bot, BotModel } from "../../../models/Bot";
import { AdaptiveDialog, AdaptiveDialogsModel } from "../../../models/AdaptiveDialog";
import { BotVersion, BotVersionModel } from "../../../models/BotVersion";
import { VersionCounter, VersionCounterModel } from "../../../models/VersionCounter";
import { HydratedDocument } from "mongoose";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const page_str = request.nextUrl.searchParams.get("page");
        const limit_str = request.nextUrl.searchParams.get("limit");

        const filterPage = page_str ? parseInt(page_str, 10) : 1;
        const filterLimit = limit_str ? parseInt(limit_str, 10) : 10;

        const page = filterPage ?? 1;
        const limit = filterLimit ?? 10;
        const skip = (page - 1) * limit;

        const bots = await BotModel.find().skip(skip).limit(limit).lean().exec();
        const results = bots.length;

        let json_response = {
            status: "success",
            results,
            bots,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}


// crear bot
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json()
        body.owner = 'No identificado'
        const newBot: HydratedDocument<Bot> = new BotModel(body)
        await newBot.save()

        const botVersion: HydratedDocument<BotVersion> = new BotVersionModel({
            version: 0,
            botId: newBot._id,
            publishedBy: "Sistema",
            createdBy: "Sistema",
            isDraft: true
        })
        await botVersion.save();

        const versionCounter: HydratedDocument<VersionCounter> = new VersionCounterModel({
            botId: newBot._id,
            counter: 0
        })
        await versionCounter.save()

        const adaptiveDialog: HydratedDocument<AdaptiveDialog> = new AdaptiveDialogsModel({
            botVersionId: botVersion._id,
            $kind: "Microsoft.AdaptiveDialog",
            id: "Root",
            recognizer: {
                $kind: "Bada.MCRecognizer",
                intents: []
            }
        })
        await adaptiveDialog.save()

        let json_response = {
            status: "success",
            bot: newBot,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
