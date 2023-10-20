import { IRegisterNode } from "react-flow-builder";
import { CancelAllDialogsDisplay } from "./display-component";
import { PresenceBlocked24Regular } from "@fluentui/react-icons";

export const primaryColor = '#d13438'

export const CancelAllDialogsNode: IRegisterNode = {
    type: 'Microsoft.CancelAllDialogs',
    name: "Cancelar diálogos",
    displayComponent: CancelAllDialogsDisplay,
    addIcon: <PresenceBlocked24Regular
        primaryFill={primaryColor}
    />,
    initialNodeData: {
        data: {
            $kind: "Microsoft.CancelAllDialogs"
        }
    }
}