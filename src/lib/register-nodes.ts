import { BeginDialogNode } from "@/components/actions/begin-dialog";
import { HttpRequestNode } from "@/components/actions/http-request";
import { IfConditionNode } from "@/components/actions/if-condition";
import { IfConditionChildNode } from "@/components/actions/if-condition/child";
import { SendActivityNode } from "@/components/actions/send-activity";
import { SetPropertyNode } from "@/components/actions/set-property";
import { SwitchConditionNode } from "@/components/actions/switch-condition";
import { SwitchConditionChildNode } from "@/components/actions/switch-condition/child";
import { ChoiceInputNode } from "@/components/dialogs/inputs";
import { EndNode } from "@/components/nodes/end";
import { OnBeginDialogNode } from "@/components/triggers/on-begin-dialog";
import { OnIntentNode } from "@/components/triggers/on-intent";
import { IRegisterNode } from "react-flow-builder";

export const registerNodes: IRegisterNode[] = [
    {
        type: OnBeginDialogNode.type,
        name: OnBeginDialogNode.name,
        displayComponent: OnBeginDialogNode.displayComponent,
        isStart: OnBeginDialogNode.isStart,
    },
    {
        type: OnIntentNode.type,
        name: OnIntentNode.name,
        displayComponent: OnIntentNode.displayComponent,
        configComponent: OnIntentNode.configComponent,
        isStart: OnIntentNode.isStart,
    },
    {
        type: IfConditionChildNode.type,
        name: IfConditionChildNode.name,
        displayComponent: IfConditionChildNode.displayComponent,
        customRemove: true
    },
    {
        type: SwitchConditionChildNode.type,
        name: SwitchConditionChildNode.name,
        displayComponent: SwitchConditionChildNode.displayComponent,
        configComponent: SwitchConditionChildNode.configComponent,
        showPracticalBranchRemove: true,
    },
    {
        type: SendActivityNode.type,
        name: SendActivityNode.name,
        displayComponent: SendActivityNode.displayComponent,
        configComponent: SendActivityNode.configComponent,
        initialNodeData: SendActivityNode.initialNodeData,
        addIcon: SendActivityNode.addIcon,
    },
    {
        type: IfConditionNode.type,
        name: IfConditionNode.name,
        conditionNodeType: IfConditionChildNode.type,
        configComponent: IfConditionNode.configComponent,
        displayComponent: IfConditionNode.displayComponent,
        conditionMaxNum: 2,
        showPracticalBranchNode: true,
        showPracticalBranchRemove: true,
        initialNodeData: IfConditionNode.initialNodeData,
        addIcon: IfConditionNode.addIcon
    },
    {
        type: ChoiceInputNode.type,
        name: ChoiceInputNode.name,
        displayComponent: ChoiceInputNode.displayComponent,
        configComponent: ChoiceInputNode.configComponent,
        initialNodeData: ChoiceInputNode.initialNodeData,
        addIcon: ChoiceInputNode.addIcon
    },
    {
        type: HttpRequestNode.type,
        name: HttpRequestNode.name,
        displayComponent: HttpRequestNode.displayComponent,
        configComponent: HttpRequestNode.configComponent,
        initialNodeData: HttpRequestNode.initialNodeData,
        addIcon: HttpRequestNode.addIcon
    },
    {
        type: SwitchConditionNode.type,
        name: SwitchConditionNode.name,
        conditionNodeType: SwitchConditionChildNode.type,
        displayComponent: SwitchConditionNode.displayComponent,
        configComponent: SwitchConditionNode.configComponent,
        initialNodeData: SwitchConditionNode.initialNodeData,
        addIcon: SwitchConditionNode.addIcon,
        showPracticalBranchNode: true,
    },
    {
        type: SetPropertyNode.type,
        name: SetPropertyNode.name,
        displayComponent: SetPropertyNode.displayComponent,
        configComponent: SetPropertyNode.configComponent,
        initialNodeData: SetPropertyNode.initialNodeData,
        addIcon: SetPropertyNode.addIcon
    },
    {
        type: BeginDialogNode.type,
        name: BeginDialogNode.name,
        displayComponent: BeginDialogNode.displayComponent,
        configComponent: BeginDialogNode.configComponent,
        initialNodeData: BeginDialogNode.initialNodeData,
        addIcon: BeginDialogNode.addIcon
    },
    {
        type: EndNode.type,
        name: EndNode.name,
        displayComponent: EndNode.displayComponent,
        configComponent: EndNode.configComponent,
        initialNodeData: EndNode.initialNodeData,
        addIcon: EndNode.addIcon,
        isEnd: true
    },
];