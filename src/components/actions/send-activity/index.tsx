import { IRegisterNode } from "react-flow-builder";
import { SendActivityDisplay } from "./display-component";
import { SendActivityConfig } from "./config-component";
import { Comment24Regular } from "@fluentui/react-icons";

export const primaryColor = '#eb2f96'

export const SendActivityNode: IRegisterNode = {
    type: 'Microsoft.SendActivity',
    name: "Mensaje",
    displayComponent: SendActivityDisplay,
    configComponent: SendActivityConfig,
    addIcon: <Comment24Regular
        primaryFill={primaryColor}
    />,
}