import { IRegisterNode } from "react-flow-builder";
import { SetPropertyDisplay } from "./display-component";
import { SetPropertyConfig } from "./config-component";
import { Key24Regular } from "@fluentui/react-icons";

export const primaryColor = '#da3b01'

export const SetPropertyNode: IRegisterNode = {
    type: 'Microsoft.SetProperty',
    name: "Propiedad",
    displayComponent: SetPropertyDisplay,
    configComponent: SetPropertyConfig,
    addIcon: <Key24Regular
        primaryFill={primaryColor}
    />,
}