import { Schema, Types, model, models } from "mongoose"

export interface Action {
    _id?: Types.ObjectId
    triggerId: Types.ObjectId
    id: string
    type: string
    name: string
    data?: any
    path: string[]
    configuring?: boolean
    validateStatusError?: boolean
    next?: string[]
    [key: string]: any
}

const actionSchema = new Schema<Action>({
    triggerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trigger'
    },
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: Object,
    },
    path: {
        type: [String],
        required: true
    },
    configuring: {
        type: Boolean,
    },
    validateStatusError: {
        type: Boolean,
    },
    next: {
        type: [String],
    },
}, {
    strict: false,
    collection: "actions",
    timestamps: true
});

const ActionModel = models.Action || model<Action>('Action', actionSchema);

export { ActionModel }
