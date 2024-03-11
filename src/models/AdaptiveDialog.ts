import { Document, Schema, Types, model, models } from "mongoose";
import { Trigger } from "./Trigger";


export interface AdaptiveDialog extends Document {
    _id: Types.ObjectId
    $kind: string
    id: string
    triggers?: Trigger[]
    botVersionId: Types.ObjectId
    recognizer?: any //TODO: modificar el type
}

//TODO: agregar pre save para validar que solo los Root tengan recognizer
const adaptiveDialogSchema = new Schema<AdaptiveDialog>({
    $kind: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    botVersionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'BotVersion'
    },
    recognizer: {
        type: Schema.Types.Mixed,
        required: false
    },
}, {
    strict: false,
    collection: "adaptive-dialogs",
    timestamps: true
})

const AdaptiveDialogsModel = models.AdaptiveDialog || model<AdaptiveDialog>('AdaptiveDialog', adaptiveDialogSchema);
const createEmptyAdaptiveDialog = (botVersionId: string) => {
    return {
        botVersionId,
        $kind: "Microsoft.AdaptiveDialog",
        id: "Root",
        recognizer: {
            $kind: "Microsof.RecognizerSet",
            recognizers: []
        }
    }
} 

export { AdaptiveDialogsModel, createEmptyAdaptiveDialog };