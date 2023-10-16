import { ITrigger } from "./ITrigger";

export interface IAdaptiveDialog {
    _id: string
    $kind: string
    triggers?: ITrigger[]
    id: string
    botVersionId: string
}