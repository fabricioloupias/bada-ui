import { IRegisterNode } from "react-flow-builder";
import { SwitchConditionDisplay } from "./display-component";
import { SwitchConditionConfig } from "./config-component";
import { Branch24Regular } from "@fluentui/react-icons";
import { SwitchConditionChildNode } from "./child";

export const primaryColor = '#3ff23f'

export const SwitchConditionNode: IRegisterNode = {
    type: 'Microsoft.SwitchCondition',
    name: "Ramas",
    displayComponent: SwitchConditionDisplay,
    configComponent: SwitchConditionConfig,
    conditionNodeType: SwitchConditionChildNode.type,
    showPracticalBranchNode: true,
    addIcon: <Branch24Regular
        primaryFill={primaryColor}
    />,
}