import { IRegisterNode } from "react-flow-builder";
import { SwitchConditionDisplay } from "./display-component";
import { SwitchConditionConfig } from "./config-component";
import { Branch24Regular } from "@fluentui/react-icons";

export const primaryColor = '#3ff23f'

export const SwitchConditionNode: IRegisterNode = {
    type: 'Microsoft.SwitchCondition',
    name: "Ramas",
    displayComponent: SwitchConditionDisplay,
    configComponent: SwitchConditionConfig,
    addIcon: <Branch24Regular
        primaryFill={primaryColor}
    />,
}