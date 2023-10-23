import { IRegisterNode } from "react-flow-builder";
import { BeginDialogDisplay } from "./display-component";
import { BeginDialogConfig } from "./config-component";
import { PictureInPictureEnter24Regular } from "@fluentui/react-icons";

export const primaryColor = '#5c2d91'

export const BeginDialogNode: IRegisterNode = {
    type: 'Node.Begin',
    name: "Ir a",
    displayComponent: BeginDialogDisplay,
    configComponent: BeginDialogConfig,
    addIcon: <PictureInPictureEnter24Regular
        primaryFill={primaryColor}
    />,
}