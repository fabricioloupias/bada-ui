import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/connect-db";
import { BotVersionModel } from "../../../../models/BotVersion";
import { createErrorResponse } from "../../../../lib/utils";

export async function GET(request: NextRequest,
    { params }: {
        params: { botVersionId: string }
    }) {
    try {
        const { botVersionId } = params;
        await connectDB();

        const botVersion = await BotVersionModel.findById(botVersionId).exec();

        let json_response = {
            status: "success",
            bot_version: botVersion,
        };
        return NextResponse.json(json_response);
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}