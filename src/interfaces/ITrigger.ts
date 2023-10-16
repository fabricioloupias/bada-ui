import { INode } from "react-flow-builder";
import { IAction } from "./IAction";

export interface ITrigger {
    _id?: string
    adaptiveDialogId: string
    $kind: string
    actions: INode[];
    intent?: string
}
