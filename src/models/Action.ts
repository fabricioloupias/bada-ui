import { ModelOptions, Severity, getModelForClass, mongoose, prop, Ref, PropType } from "@typegoose/typegoose"

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "actions",
        strict: false
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
class Action {
    _id?: mongoose.Schema.Types.ObjectId
    @prop()
    triggerId: mongoose.Schema.Types.ObjectId
    @prop()
    id: string
    @prop()
    $kind: string
    @prop()
    type: string
    @prop()
    name: string
    @prop()
    data?: any
    @prop()
    path: string[]
    @prop()
    configuring?: boolean
    @prop()
    validateStatusError?: boolean
    @prop()
    next?: string[]
    [key: string]: any
}

const ActionModel = getModelForClass(Action)
export { ActionModel, Action }
