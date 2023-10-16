import { ModelOptions, Severity, getModelForClass, mongoose, prop } from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "version-counter",
    }
})
class VersionCounter {
    _id: mongoose.Schema.Types.ObjectId
    @prop()
    counter: number;
    @prop()
    botId: mongoose.Schema.Types.ObjectId;
}

const VersionCounterModel = getModelForClass(VersionCounter);
export { VersionCounterModel, VersionCounter };