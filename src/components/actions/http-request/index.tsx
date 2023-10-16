import { IRegisterNode } from "react-flow-builder";
import { HttpRequestDisplay } from "./display-component";
import { HttpRequestConfig } from "./config-component";
import { CloudBidirectional24Regular } from "@fluentui/react-icons";

export const primaryColor = '#00188f'

export const HttpRequestNode: IRegisterNode = {
    type: 'Microsoft.HttpRequest',
    name: "Servicio",
    displayComponent: HttpRequestDisplay,
    configComponent: HttpRequestConfig,
    addIcon: <CloudBidirectional24Regular
        primaryFill={primaryColor}
    />,
}