import { IRegisterNode } from "react-flow-builder";
import { TextInputDisplay } from "./display-component";
import { TextInputConfig } from "./config-component";
import { ChatBubblesQuestion24Regular } from "@fluentui/react-icons";

export const primaryColor = '#5c2d91'

export const TextInputNode: IRegisterNode = {
    type: 'Microsoft.TextInput',
    name: "Preguntar",
    displayComponent: TextInputDisplay,
    configComponent: TextInputConfig,
    addIcon: <ChatBubblesQuestion24Regular
        primaryFill={primaryColor}
    />,
}