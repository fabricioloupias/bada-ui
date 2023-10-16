import { IRegisterNode } from "react-flow-builder";
import { Flash24Regular } from "@fluentui/react-icons";
import { OnIntentDisplay } from "./display-component";
import { OnIntentConfig } from "./config-component";

export const primaryColor = '#0078d4'

export const OnIntentNode: IRegisterNode = {
    type: "Microsoft.OnIntent",
    name: "Al reconocer intent",
    displayComponent: OnIntentDisplay,
    configComponent: OnIntentConfig,
    addIcon: <Flash24Regular
        primaryFill={primaryColor}
    />,
    isStart: true
}