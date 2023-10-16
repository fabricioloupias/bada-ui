import { ModelOptions, Severity, getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Trigger } from "./Trigger";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "adaptive-dialogs",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
class AdaptiveDialog {
    _id?: mongoose.Schema.Types.ObjectId
    @prop()
    $kind: string
    @prop()
    id: string
    triggers?: Trigger[]
    @prop()
    botVersionId: mongoose.Schema.Types.ObjectId
    @prop()
    recognizer: any //TODO: modificar el type
}

const AdaptiveDialogsModel = getModelForClass(AdaptiveDialog);
export { AdaptiveDialogsModel, AdaptiveDialog };