import { Schema, Types, model, models } from "mongoose";
import { AdaptiveDialog } from "./AdaptiveDialog";

export interface Bot {
    _id: Types.ObjectId
    type: string;
    owner: string;
    name: string;
}

const botSchema = new Schema<Bot>({
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    collection: "bots",
    timestamps: true
})

const BotModel = models.BotModel || model<Bot>('BotModel', botSchema);

export { BotModel };
