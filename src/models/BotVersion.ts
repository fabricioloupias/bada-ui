import { Bot } from "./Bot";
import mongoose from "mongoose";
import * as typegoose from "@typegoose/typegoose";
import { AdaptiveDialog } from "./AdaptiveDialog";

@typegoose.ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "bot-versions",
    },
})
class BotVersion {
    _id: mongoose.Schema.Types.ObjectId
    @typegoose.prop({ ref: () => Bot })
    bot: typegoose.Ref<Bot>
    @typegoose.prop()
    botId: mongoose.Schema.Types.ObjectId
    @typegoose.prop()
    publishedBy: string
    @typegoose.prop()
    createdBy: string
    @typegoose.prop()
    publishedAt: string
    @typegoose.prop()
    version: number
    @typegoose.prop()
    isDraft: boolean
}

const BotVersionModel = typegoose.getModelForClass(BotVersion);
export { BotVersionModel, BotVersion };