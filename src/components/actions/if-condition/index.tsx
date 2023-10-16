import { IRegisterNode } from "react-flow-builder";
import { IfConditionDisplay } from "./display-component";
import { IfConditionConfig } from "./config-component";
import { CubeTree24Regular } from "@fluentui/react-icons";

export const primaryColor = '#00B294'

export const IfConditionNode: IRegisterNode = {
    type: 'Microsoft.IfCondition',
    name: "Condicional",
    displayComponent: IfConditionDisplay,
    configComponent: IfConditionConfig,
    addIcon: <CubeTree24Regular
        primaryFill={primaryColor}
    />
}