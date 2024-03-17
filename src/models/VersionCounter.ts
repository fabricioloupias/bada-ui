import { Types, Schema, model, models } from "mongoose";

export interface VersionCounter {
    _id: Types.ObjectId
    counter: number;
    botId: Types.ObjectId;
}

const versionCounterSchema = new Schema<VersionCounter>({
    botId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    counter: {
        type: Number,
        required: true
    }
}, {
    collection: "version-counter",
    timestamps: true
})

const VersionCounterModel = models.VersionCounterModel || model<VersionCounter>('VersionCounterModel', versionCounterSchema);

export { VersionCounterModel };