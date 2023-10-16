import { ModelOptions, Severity, getModelForClass, mongoose, prop, Ref, PropType } from "@typegoose/typegoose";
import { Action } from "./Action";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "triggers",
        strict: false
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
class Trigger {
    _id: mongoose.Schema.Types.ObjectId
    @prop()
    adaptiveDialogId: mongoose.Schema.Types.ObjectId
    @prop()
    $kind: string
    @prop()
    intent?: string
    actions?: Action[]
}

const TriggerModel = getModelForClass(Trigger);
export { TriggerModel, Trigger };
