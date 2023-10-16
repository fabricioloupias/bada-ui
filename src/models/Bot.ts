import { ModelOptions, Severity, getModelForClass, mongoose, prop } from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "bots",
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
class Bot {
    _id: mongoose.Schema.Types.ObjectId
    @prop()
    type: string;
    @prop()
    owner: string;
    @prop()
    name: string;
}

const BotModel = getModelForClass(Bot);
export { BotModel, Bot };
