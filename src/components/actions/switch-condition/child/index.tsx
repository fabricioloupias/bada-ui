import { IRegisterNode } from "react-flow-builder";
import { SwitchConditionChildDisplay } from "./display-component";
import { SwitchConditionChildConfig } from "./config-component";

export const SwitchConditionChildNode: IRegisterNode = {
    type: 'SwitchConditionChild',
    name: "Caso valor",
    displayComponent: SwitchConditionChildDisplay,
    configComponent: SwitchConditionChildConfig,
}