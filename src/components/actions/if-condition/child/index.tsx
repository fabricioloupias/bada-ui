import { IRegisterNode } from "react-flow-builder";
import { IfConditionChildDisplay } from "./display-component";
import { IfConditionChildConfig } from "./config-component";

export const IfConditionChildNode: IRegisterNode = {
    type: 'IfConditionChild',
    name: "Condición",
    displayComponent: IfConditionChildDisplay,
}