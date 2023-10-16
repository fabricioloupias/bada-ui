import { IRegisterNode } from "react-flow-builder";
import { ChoiceInputDisplay } from "./display-component";
import { ChoiceInputConfig } from "./config-component";
import { AlignSpaceEvenlyVertical24Regular } from "@fluentui/react-icons";

export const primaryColor = '#5c2d91'

export const ChoiceInputNode: IRegisterNode = {
    type: 'Microsoft.ChoiceInput',
    name: "Opciones",
    displayComponent: ChoiceInputDisplay,
    configComponent: ChoiceInputConfig,
    addIcon: <AlignSpaceEvenlyVertical24Regular
        primaryFill={primaryColor}
    />,
    initialNodeData: {
        toExport: {
            $kind: "Microsoft.ChoiceInput"
        }
    }
}