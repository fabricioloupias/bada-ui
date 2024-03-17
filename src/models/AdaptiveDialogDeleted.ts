import { Document, Schema, Types, model, models } from "mongoose";
import { Trigger } from "./Trigger";


export interface AdaptiveDialogDeleted extends Document {
    _id: Types.ObjectId
}

//TODO: agregar pre save para validar que solo los Root tengan recognizer
const adaptiveDialogDeletedSchema = new Schema<AdaptiveDialogDeleted>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    strict: false,
    collection: "adaptive-dialogs-deleted",
    timestamps: true
})

const AdaptiveDialogDeletedModel = models.AdaptiveDialogDeletedModel || model<AdaptiveDialogDeleted>('AdaptiveDialogDeletedModel', adaptiveDialogDeletedSchema);

export { AdaptiveDialogDeletedModel };