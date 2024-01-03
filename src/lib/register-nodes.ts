import { BeginDialogNode } from "@/components/actions/begin-dialog";
import { CancelAllDialogsNode } from "@/components/actions/cancel-all-dialogs";
import { HttpRequestNode } from "@/components/actions/http-request";
import { IfConditionNode } from "@/components/actions/if-condition";
import { IfConditionChildNode } from "@/components/actions/if-condition/child";
import { SendActivityNode } from "@/components/actions/send-activity";
import { SetPropertyNode } from "@/components/actions/set-property";
import { SwitchConditionNode } from "@/components/actions/switch-condition";
import { SwitchConditionChildNode } from "@/components/actions/switch-condition/child";
import { FunnelTagNode } from "@/components/actions/funnel-tag";
import { ChoiceInputNode } from "@/components/dialogs/inputs/choice";
import { TextInputNode } from "@/components/dialogs/inputs/text";
import { EndNode } from "@/components/nodes/end";
import { OnBeginDialogNode } from "@/components/triggers/on-begin-dialog";
import { OnIntentNode } from "@/components/triggers/on-intent";
import { IRegisterNode } from "react-flow-builder";
import { EndTurnNode } from "../components/actions/end-turn";

// registro de tipos de nodos, agregar a la lista para el renderizado en el componente Editor
// el orden es el que aparecerá en el popup del editor
export const registerNodes: IRegisterNode[] = [
    OnBeginDialogNode,
    OnIntentNode,
    IfConditionChildNode,
    SwitchConditionChildNode,
    SendActivityNode,
    IfConditionNode,
    ChoiceInputNode,
    HttpRequestNode,
    SwitchConditionNode,
    SetPropertyNode,
    BeginDialogNode,
    EndNode,
    TextInputNode,
    FunnelTagNode,
    EndTurnNode,
    CancelAllDialogsNode,
];