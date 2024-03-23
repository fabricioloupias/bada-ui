import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "../../../lib/utils";
import connectDB from "../../../lib/connect-db";
import { BotVersionModel } from "@/models/BotVersion";
import { VersionCounterModel } from "@/models/VersionCounter";
import { AdaptiveDialogsModel, createEmptyAdaptiveDialog } from "@/models/AdaptiveDialog";
import { BotModel } from "@/models/Bot";

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
        const newBot = new BotModel(body)
        await newBot.save()

        const date = new Date()
        const botVersion = new BotVersionModel({
            version: 0,
            botId: newBot._id,
            publishedBy: "Sistema",
            publishedAt: date,
            createdBy: "Sistema",
            isDraft: false
        })
        await botVersion.save();

        const versionCounter = new VersionCounterModel({
            botId: newBot._id,
            counter: 0
        })
        await versionCounter.save()

        const emptyAdaptiveDialog = createEmptyAdaptiveDialog(botVersion._id)
        const adaptiveDialog = new AdaptiveDialogsModel(emptyAdaptiveDialog)
        await adaptiveDialog.save()

        let json_response = {
            status: "success",
            bot: newBot,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 400);
    }
}
