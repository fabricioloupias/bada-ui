import { IRegisterNode } from "react-flow-builder";
import { OnBeginDialogDisplay } from "./display-component";
import { Flash24Regular } from "@fluentui/react-icons";

export const primaryColor = '#0078d4'

export const OnBeginDialogNode: IRegisterNode = {
    type: "Microsoft.OnBeginDialog",
    name: "Disparador",
    displayComponent: OnBeginDialogDisplay,
    addIcon: <Flash24Regular
        primaryFill={primaryColor}
    />,
    isStart: true
}