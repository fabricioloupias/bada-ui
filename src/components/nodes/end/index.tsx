import { IRegisterNode } from "react-flow-builder";
import { EndDisplay } from "./display-component";
import { EndConfig } from "./config-component";
import { Key24Regular } from "@fluentui/react-icons";

export const primaryColor = '#da3b01'

export const EndNode: IRegisterNode = {
    type: 'Node.End',
    name: "Cierre",
    displayComponent: EndDisplay,
    configComponent: EndConfig,
    addIcon: <Key24Regular
        primaryFill={primaryColor}
    />,
    isEnd: true
}