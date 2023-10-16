'use client'
import React, { useState, useEffect } from 'react';
import FlowBuilder, {
    INode,
} from 'react-flow-builder';
import './style.css';
import { DrawerComponent } from '@/components/drawer';
import { PopoverComponent } from '@/components/popover';
import { PopconfirmComponent } from '@/components/popconfim';
import { parseToActions } from '@/utils';
import { ObjectId } from '@/utils'
import { useBoundStore } from '../../store';
import { Button } from '@/components/antd';
import { registerNodes } from '@/lib/register-nodes';
import { useRouter } from 'next/navigation';

type EditorProps = {
    triggerId: string
}

// const defaultNodes = [
//   {
//     id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
//     type: 'start',
//     name: 'start',
//     path: ['0'],
//   },
//   {
//     id: 'node-b2ffe834-c7c2-4f29-a370-305adc03c010',
//     type: 'branch',
//     name: '分支节点',
//     children: [
//       {
//         id: 'node-cf9c8f7e-26dd-446c-b3fa-b2406fc7821a',
//         type: 'condition',
//         name: '条件节点',
//         children: [
//           {
//             id: 'node-f227cd08-a503-48b7-babf-b4047fc9dfa5',
//             type: 'node',
//             name: '普通节点',
//             path: ['1', 'children', '0', 'children', '0'],
//           },
//         ],
//         path: ['1', 'children', '0'],
//       },
//       {
//         id: 'node-9d393627-24c0-469f-818a-319d9a678707',
//         type: 'condition',
//         name: '条件节点',
//         children: [],
//         path: ['1', 'children', '1'],
//       },
//     ],
//     path: ['1'],
//   },
//   {
//     id: 'node-972401ca-c4db-4268-8780-5607876d8372',
//     type: 'node',
//     name: '普通节点',
//     path: ['2'],
//   },
//   {
//     id: 'node-b106675a-5148-4a2e-aa86-8e06abd692d1',
//     type: 'end',
//     name: 'end',
//     path: ['3'],
//   },
// ];

const defaultNodes = [
    {
        id: 'node-0d9d4733-e48c-41fd-a41f-d93cc4718d97',
        type: 'start',
        name: 'CDU Factura',
        path: ['0'],
    },
];


const dialogsHarcoded = [
    {
        "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
        "type": "Microsoft.OnBeginDialog",
        "name": "Al iniciar dialogo",
        "path": [
            "0"
        ]
    },
    {
        "id": "Microsoft.SendActivity-c1005ee0-a3b7-41d1-81b7-167f97da202a",
        "type": "Microsoft.SendActivity",
        "name": "Mensaje",
        "path": [
            "1"
        ],
        "configuring": false,
        "data": {
            "activity": "¡Hola! Soy *BADA* un asistente virtual oculto, y estoy acá para ayudarte en lo que necesites. ¿En qué puedo asistirte hoy?",
            "$kind": "Microsoft.SendActivity"
        },
        "validateStatusError": false
    },
    {
        "id": "Microsoft.ChoiceInput-b01dde60-4261-485c-a28f-802ee72423e3",
        "type": "Microsoft.ChoiceInput",
        "name": "Opciones",
        "toExport": {
            "$kind": "Microsoft.ChoiceInput"
        },
        "path": [
            "2"
        ],
        "configuring": false,
        "data": {
            "prompt": "Primero *elegí la línea* por la que queres consulta",
            "choices": [
                {
                    "action": {
                        "title": "Esta linea",
                        "type": "messageBack",
                        "text": "Esta linea",
                        "value": "esta_linea"
                    },
                    "value": "esta_linea"
                },
                {
                    "action": {
                        "title": "Otra linea",
                        "type": "messageBack",
                        "text": "Otra linea",
                        "value": "otra_linea"
                    },
                    "value": "otra_linea"
                }
            ],
            "invalidPrompt": "Por favor seleccioná una opcion del menú",
            "property": "$option",
            "validations": [
                "$option != 'otra_linea'",
                "$option != 'esta_linea'"
            ],
            "style": 4,
            "$kind": "Microsoft.ChoiceInput"
        },
        "validateStatusError": false
    },
    {
        "id": "Microsoft.SwitchCondition-904c96a4-42cd-4ed5-b315-7a47b51f4b21",
        "type": "Microsoft.SwitchCondition",
        "name": "Ramas",
        "children": [
            {
                "id": "SwitchConditionChild-5a559967-0cdc-479d-821d-99383946a80e",
                "type": "SwitchConditionChild",
                "name": "Caso valor",
                "children": [
                    {
                        "id": "Microsoft.SendActivity-2fb98c2a-eb31-40a5-9b3c-b077d846039c",
                        "type": "Microsoft.SendActivity",
                        "name": "Mensaje",
                        "adaptiveDialog": {
                            "$kind": "Microsoft.SendActivity",
                            "activity": ""
                        },
                        "path": [
                            "3",
                            "children",
                            "0",
                            "children",
                            "0"
                        ],
                        "configuring": false,
                        "data": {
                            "activity": "Ingreso por otra linea",
                            "$kind": "Microsoft.SendActivity"
                        },
                        "validateStatusError": false
                    }
                ],
                "path": [
                    "3",
                    "children",
                    "0"
                ],
                "configuring": false,
                "data": {
                    "value": "otra_linea"
                },
                "validateStatusError": false
            },
            {
                "id": "SwitchConditionChild-1fe842ea-ff3b-4a8a-94f2-7e966c7a7578",
                "type": "SwitchConditionChild",
                "name": "Caso valor",
                "children": [
                    {
                        "id": "Microsoft.SendActivity-7aea8c6e-2d8f-4ccc-9aa4-9fe77720b6c6",
                        "type": "Microsoft.SendActivity",
                        "name": "Mensaje",
                        "adaptiveDialog": {
                            "$kind": "Microsoft.SendActivity",
                            "activity": ""
                        },
                        "path": [
                            "3",
                            "children",
                            "1",
                            "children",
                            "0"
                        ],
                        "configuring": true,
                        "data": {
                            "activity": "Ingreso por esta linea",
                            "$kind": "Microsoft.SendActivity"
                        },
                        "validateStatusError": false
                    }
                ],
                "path": [
                    "3",
                    "children",
                    "1"
                ],
                "configuring": false,
                "data": {
                    "value": "esta_linea"
                },
                "validateStatusError": false
            }
        ],
        "toExport": {
            "$kind": "Microsoft.SwitchCondition"
        },
        "path": [
            "3"
        ],
        "configuring": false,
        "data": {
            "condition": "$option",
            "$kind": "Microsoft.SwitchCondition"
        },
        "validateStatusError": false
    },
    {
        "id": "node-0d9d5793-e48c-41fd-a41f-d93cc4718d97",
        "type": "end",
        "name": "",
        "path": [
            "4"
        ],
    },
]


const dialogsAux: any[] = [
    {
        $kind: "Microsoft.AdaptiveDialog",
        id: "Root",
        triggers: [
            {
                "$kind": "Microsoft.OnIntent",
                "intent": "intent.common_greetings",
                "actions": [
                    {
                        "id": "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
                        "type": "Microsoft.OnIntent",
                        "name": "Al reconocer intent",
                        "path": [
                            "0"
                        ],
                        "data": {
                            "intent": "intent.common_greetings",
                            "$kind": "Microsoft.OnIntent"
                        }
                    },
                    {
                        "id": "node-0d9d5733-e48c-41fd-a41f-d93cc4718d97",
                        "type": "end",
                        "name": "Al reconocer intent",
                        "path": [
                            "1"
                        ],
                    },
                ]
            }
        ]
    },
    {
        $kind: "Microsoft.AdaptiveDialog",
        id: "Factura",
        triggers: [
            {
                $kind: "Microsoft.OnBeginDialog",
                "actions": dialogsHarcoded
            }
        ]
    }
]

export default function Editor(props: EditorProps) {
    const router = useRouter()
    const { triggerId } = props;
    const {
        addActionToSave,
        changesToSave,
        saveActionsUnsaved
    } = useBoundStore(state => state)
    const getActions = useBoundStore(state => state.getActions)
    const actions = useBoundStore(state => state.actions)
    const [nodes, setNodes] = useState<INode[]>([]);
    const [dialogs, setDialogs] = useState<any[]>(dialogsAux);
    const [isLoadingFlow, setIsLoadingFlow] = useState<boolean>(true);
    const [dialogSelected, setDialogSelected] = useState<any>(null);
    const [triggerSelected, setTriggerSelected] = useState<any>(null);

    const getNodes = (dialogId: string) => {
        const dialog = dialogs.find(d => d.id === dialogId)
        // if (dialog && params.dialogIdTrigger && params.dialogIdTrigger) {
        //     const trigger = dialog.triggers.find((t: any) => t.id === params.dialogIdTrigger[1])
        //     if (trigger) {
        //         setDialogSelected(dialog)
        //         setTriggerSelected(trigger)
        //         return trigger.actions
        //     }
        // }

        if (dialog) {
            const trigger = dialog.triggers.find((t: any) => t.$kind === "Microsoft.OnBeginDialog")
            if (trigger) {
                setDialogSelected(dialog)
                setTriggerSelected(trigger)
                return trigger.actions
            }
        }
        return []
    }

    const handleChange = (nodesChanged: INode[], event: string, nodeChanged?: INode) => {
        console.log(nodeChanged)
        nodesChanged.forEach(node => {
            node.triggerId = triggerId;
        })
        setNodes(nodesChanged);
        
        //     const botAux = { ...bot }
        //     const botDialogs = botAux.flow.dialogs
        //     const index = botDialogs.findIndex(d => d.id = dialog.id)
        //     botAux.flow.dialogs[index] = dialog;
        //     // setBot(botAux)
    };

    const onAddNodeSuccess = (type: string, node: INode) => {
        node = {
            ...node,
            triggerId
        }
        addActionToSave(node)
    }

    useEffect(() => {
        getActions({ triggerId })
        // setBreadcrumbItems(params.dialogIdTrigger)
        setIsLoadingFlow(true)
        // setNodes(getNodes("Factura"))
        setIsLoadingFlow(false)
    }, [getActions, triggerId])

    const onSaveActionsUnsaved = () => {
        saveActionsUnsaved(actions)
    }

    return (
        <>
            <Button
                onClick={() => router.back()}
            >
                Volver
            </Button>
            <Button
                disabled={!changesToSave}
                onClick={onSaveActionsUnsaved}
            >
                Guardar
            </Button>
            <FlowBuilder
                nodes={actions}
                zoomTool
                onChange={handleChange}
                historyTool
                onAddNodeSuccess={onAddNodeSuccess}
                showArrow
                createUuid={() => ObjectId()}
                registerNodes={registerNodes}
                DrawerComponent={DrawerComponent}
                PopoverComponent={PopoverComponent}
                PopconfirmComponent={PopconfirmComponent}
            />
        </>
    );
};