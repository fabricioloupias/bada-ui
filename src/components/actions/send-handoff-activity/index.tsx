import { IRegisterNode } from "react-flow-builder";
import { CallOutbound24Regular } from "@fluentui/react-icons";
import { SendHandoffActivityDisplay } from "./display-component";
import { SendHandoffActivityConfig } from "./config-component";

export const primaryColor = '#8a3707'

export const SendHandoffActivityNode: IRegisterNode = {
    type: 'Bada.SendHandoff',
    name: "Transferir conversación",
    displayComponent: SendHandoffActivityDisplay,
    configComponent: SendHandoffActivityConfig,
    addIcon: <CallOutbound24Regular
        primaryFill={primaryColor}
    />,
    initialNodeData: {
        data: {
            $kind: 'Bada.SendHandoff',
        }
    }
}