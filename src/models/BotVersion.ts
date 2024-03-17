import { Schema, Types, model, Document, models } from "mongoose";

export interface BotVersion extends Document {
    botId: Types.ObjectId
    publishedBy: string
    createdBy: string
    publishedAt?: string
    version: number
    isDraft: boolean
}

const botVersionSchema = new Schema<BotVersion>({
    botId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Bot'
    },
    publishedBy: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Schema.Types.Date,
        required: false
    },
    version: {
        type: Number,
        required: true
    },
    isDraft: {
        type: Boolean,
        required: true
    },
}, {
    collection: 'bot-versions',
    timestamps: true
})

const BotVersionModel = models.BotVersionModel || model<BotVersion>('BotVersionModel', botVersionSchema);

export { BotVersionModel };