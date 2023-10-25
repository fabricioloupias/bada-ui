import { IRegisterNode } from "react-flow-builder";
import { FunnelTagDisplay } from "./display-component";
import { FunnelTagConfig } from "./config-component";
import { Tag24Regular } from "@fluentui/react-icons";

export const primaryColor = '#ff8c00'

export const FunnelTagNode: IRegisterNode = {
    type: 'Bada.FunnelTag',
    name: "Etiqueta funnel",
    displayComponent: FunnelTagDisplay,
    configComponent: FunnelTagConfig,
    addIcon: <Tag24Regular
        primaryFill={primaryColor}
    />,
    initialNodeData: {
        data: {
            activity: {}
        }
    }
}