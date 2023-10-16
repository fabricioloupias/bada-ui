import { IBot } from "./IBot";
import { IAdaptiveDialog } from "./IAdaptiveDialog";

export interface IBotVersion {
    _id?: string
    botId: string
    publishedBy?: string
    publishedAt?: string
    version: number
    adaptiveDialogs?: IAdaptiveDialog[],
    isDraft: boolean
}