import { Schema, Types, model, models } from "mongoose";

export interface Bot {
    _id: Types.ObjectId
    owner: string;
    name: string;
}

const botSchema = new Schema<Bot>({
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
