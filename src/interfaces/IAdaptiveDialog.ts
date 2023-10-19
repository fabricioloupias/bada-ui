import { ITrigger } from "./ITrigger";

export interface IAdaptiveDialog {
    _id: string
    $kind: string
    triggers?: ITrigger[]
    id: string
    botVersionId: string
    recognizer?: IBadaRecognizer
}

export interface IRecognizer {
    $kind: string
}

export interface IBadaRecognizer extends IRecognizer {
    intents: string[]
}