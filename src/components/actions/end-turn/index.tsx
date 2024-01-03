import { IRegisterNode } from "react-flow-builder";
import { EndTurnDisplay } from "./display-component";
import { Comment24Regular } from "@fluentui/react-icons";

export const primaryColor = '#eb2f96'

export const EndTurnNode: IRegisterNode = {
    type: 'Microsoft.EndTurn',
    name: "Fin de turno",
    displayComponent: EndTurnDisplay,
    addIcon: <Comment24Regular
        primaryFill={primaryColor}
    />,
    initialNodeData: {
        data: {
            $kind: "Microsoft.EndTurn",
        }
    }
}