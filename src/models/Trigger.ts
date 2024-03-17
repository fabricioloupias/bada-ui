import { Document, Schema, Types, model, models } from "mongoose";
import { Action } from "./Action";

export interface Trigger extends Document {
    adaptiveDialogId: Types.ObjectId
    $kind: string
    intent?: string
    actions?: Action[]
}

const triggerSchema = new Schema<Trigger>({
    adaptiveDialogId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AdaptiveDialog'
    },
    $kind: {
        type: String,
        required: true
    },
    intent: {
        type: String,
        required: false
    }
}, {
    strict: false,
    collection: "triggers",
    timestamps: true
})

const TriggerModel = models.TriggerModel || model<Trigger>('TriggerModel', triggerSchema);

export { TriggerModel };
