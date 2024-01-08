"use client"
import './style.css'
import { useEffect, useMemo, useState } from "react";
import type { DataNode } from 'antd/es/tree';
import { Tree, Search, Button, CarryOutOutlined, Modal, Flash16Regular, Text } from "@/components/antd";
import { useBoundStore } from "@/store";
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog";
import { EditableNode, EditableTreeTitle } from "./crud-tree-antd";
import Link from "next/link";
import { ITrigger } from "../../interfaces/ITrigger";
import { deleteTreeNode } from "./utils";
import AddTriggerComponent from "../add-trigger";
import AddTopicComponent from "../add-topic";

const formatTrigger = (trigger: ITrigger) => {
    switch (trigger.$kind) {
        case "Microsoft.OnIntent":
            return `Al reconocer intent - ${trigger.intent}`
        case "Microsoft.OnBeginDialog":
            return "Al iniciar diálogo"
        default:
            return ""
    }
}

type FlowTreeProps = {
    botVersionId: string,
    parentElementHeight: number
};

export type NewTrigger = {
    trigger: string,
    intent: string
}

export default function FlowTree({ botVersionId, parentElementHeight }: FlowTreeProps) {
    const {
        deepAdaptiveDialogs,
        getAdaptiveDialogs,
        deleteTrigger,
        deleteAdaptiveDialog,
        saveTrigger,
        setDeepAdaptiveDialogs,
        saveAdaptiveDialog
    } = useBoundStore((state) => state)

    const [defaultData, setDefaultData] = useState<EditableNode[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [triggerModalOptions, setTriggerModalOptions] = useState<{
        openModalTrigger: boolean,
        adaptiveDialogSelected: IAdaptiveDialog | null,
        triggerValue: string
    }>({
        adaptiveDialogSelected: null,
        openModalTrigger: false,
        triggerValue: ""
    });

    const [topicModalOptions, setTopicModalOptions] = useState<{
        openModalTopic: boolean,
    }>({
        openModalTopic: false,
    });

    const showModalToTrigger = (adaptiveDialog: IAdaptiveDialog) => {
        if (adaptiveDialog) {
            setTriggerModalOptions(prev => (
                {
                    ...prev,
                    adaptiveDialogSelected: adaptiveDialog,
                    openModalTrigger: true
                }
            ))
        }
    };

    const showModalToTopic = () => {
        setTopicModalOptions(prev => ({
            ...prev,
            openModalTopic: true
        }))
    };

    const generateData = (adaptiveDialogs: IAdaptiveDialog[]) => {
        const rootAdaptiveDialog = adaptiveDialogs.splice(0, 1)[0];
        
        adaptiveDialogs = adaptiveDialogs.sort((a, b) => a.id.localeCompare(b.id))
        adaptiveDialogs.unshift(rootAdaptiveDialog);

        const expandedKeys: string[] = []
        let mainIndex = 0
        let countAdaptiveIndex = 0
        if (adaptiveDialogs.length > 0) {

            const data = adaptiveDialogs.map((adaptiveDialog, index) => {
                countAdaptiveIndex = index
                adaptiveDialog.triggers = adaptiveDialog.triggers ?? [];
                let countIndex = 0
                const children = adaptiveDialog.triggers.map((t, indexC: number) => {
                    countIndex = indexC
                    const key = `${mainIndex}-${index}-${indexC}`
                    expandedKeys.push(key)
                    return {
                        key,
                        id: t._id,
                        title: <Link href={`editor/${t._id}`}>{formatTrigger(t)}</Link>,
                        type: "trigger",
                        icon: <Flash16Regular />
                    } as EditableNode
                })
                if (children.length > 0) {
                    countIndex++
                }
                const key = `${mainIndex}-${index}-${countIndex}`
                expandedKeys.push(key)
                children.push({
                    key,
                    title: <Button
                        size="small"
                        onClick={() => showModalToTrigger(adaptiveDialog)}
                    >
                        Agregar disparador
                    </Button>,
                    type: "addTrigger"
                } as EditableNode)
                expandedKeys.push(`${mainIndex}-${index}`)
                if (adaptiveDialog.id === "Root") {
                    return {
                        key: `${mainIndex}-${index}`,
                        title: adaptiveDialog.id,
                        // icon: <CarryOutOutlined />,
                        id: adaptiveDialog._id,
                        children,
                        type: "adaptiveDialog",
                        selectable: true
                    } as EditableNode
                } else {
                    return {
                        key: `${mainIndex}-${index}`,
                        title: adaptiveDialog.id,
                        id: adaptiveDialog._id,
                        type: "adaptiveDialog",
                        icon: <CarryOutOutlined />,
                        children,
                        selectable: false
                    } as EditableNode
                }

            }) as EditableNode[]
            countAdaptiveIndex++

            expandedKeys.push(`${mainIndex}-${countAdaptiveIndex}`)
            data.push({
                key: `${mainIndex}-${countAdaptiveIndex}`,
                title: (<Button
                    size="small"

                    onClick={() => showModalToTopic()}
                >
                    Agregar tema
                </Button>),
                type: "addAdaptiveDialog",
                icon: <CarryOutOutlined />,
                children: []
            } as EditableNode)
            setExpandedKeys(expandedKeys)
            // setTreeData(data)

            setDefaultData(data)
        }
    };

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChangeTemaValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newExpandedKeys = defaultData
            .map((item) => {
                if (typeof item.title === 'string' && item.title.indexOf(value) > -1) {
                    return item.key
                }
                return null;
            })
            .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const treeData = useMemo(() => {
        const loop = (data: DataNode[]): DataNode[] =>
            data.map((item) => {
                if (typeof item.title === 'string') {
                    const strTitle = String(item.title);
                    const index = strTitle.indexOf(searchValue);
                    const beforeStr = strTitle.substring(0, index);
                    const afterStr = strTitle.slice(index + searchValue.length);
                    const title =
                        index > -1 ? (
                            <>
                                {beforeStr}
                                <Text mark>{searchValue}</Text>
                                {afterStr}
                            </>
                        ) : (
                            <span>{strTitle}</span>
                        );

                    if (item.children) {
                        return {
                            ...item,
                            title,
                            children: loop(item.children)
                        };
                    }
                }

                return {
                    ...item,
                }
            });

        return loop(defaultData);
    }, [defaultData, searchValue]);


    const onClickDeleteNode = async (node: EditableNode) => {
        // solo se recibe nodos eliminables con ids
        if (node.type === "trigger") {
            try {
                await deleteTrigger(node.id!)
                deleteTreeNode(deepAdaptiveDialogs, node)
                generateData(deepAdaptiveDialogs)
            } catch (error) {
                console.error(error)
            }
        }

        if (node.type === "adaptiveDialog") {
            try {
                const repsonse = await deleteAdaptiveDialog(node.id!)
                console.log(repsonse)
                deleteTreeNode(deepAdaptiveDialogs, node)
                generateData(deepAdaptiveDialogs)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const addTrigger = async (dialogId: string, triggerValue: NewTrigger) => {
        const newTrigger = {
            $kind: triggerValue.trigger,
            adaptiveDialogId: dialogId,
            intent: triggerValue.intent
        }
        try {
            const trigger = await saveTrigger(newTrigger)
            const adaptiveDialogs = [...deepAdaptiveDialogs]
            const index = adaptiveDialogs.findIndex(d => d._id === dialogId)
            const dialogSelected = adaptiveDialogs[index]
            if (dialogSelected) {

                adaptiveDialogs[index].triggers = adaptiveDialogs[index].triggers ?? []
                adaptiveDialogs[index].triggers!.push(trigger)
                generateData(adaptiveDialogs)
                setDeepAdaptiveDialogs(adaptiveDialogs)
            }
        } catch (error) {
            console.error(error)
        }

    }


    const addTopic = async (botVersionId: string, topicIdValue: string) => {
        try {
            const adaptiveDialog = await saveAdaptiveDialog({
                botVersionId,
                id: topicIdValue
            })
            deepAdaptiveDialogs.push(adaptiveDialog)
            generateData(deepAdaptiveDialogs)
            setDeepAdaptiveDialogs(deepAdaptiveDialogs)
        } catch (error) {
            console.error(error)
        }
    }

    const closeModalTrigger = () => {
        setTriggerModalOptions(prev => ({
            ...prev,
            openModalTrigger: false,
            adaptiveDialogSelected: null,
        }))
    }

    const closeModalTopic = () => {
        setTopicModalOptions(prev => ({
            ...prev,
            openModalTopic: false,
        }))
    }

    const triggerCb = (trigger: NewTrigger) => {
        addTrigger(triggerModalOptions.adaptiveDialogSelected!._id, trigger)

        closeModalTrigger()
    }

    const topicCb = (topicId: string) => {
        addTopic(botVersionId, topicId)

        closeModalTopic()
    }

    useEffect(() => {
        getAdaptiveDialogs(botVersionId)
    }, [])

    useEffect(() => {
        generateData(deepAdaptiveDialogs)
    }, [deepAdaptiveDialogs])

    return (
        defaultData.length > 0
            ?
            <>
                <Search style={{ marginBottom: 8 }} placeholder="Buscar tema" onChange={onChangeTemaValue} />
                <Tree
                    showLine
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    defaultExpandAll
                    rootStyle={{
                        background: 'transparent'
                    }}
                    titleRender={(node: any) => (
                        <EditableTreeTitle
                            onClickDeleteNode={onClickDeleteNode}
                            node={node}
                        />
                    )}
                    autoExpandParent={autoExpandParent}
                    treeData={treeData}
                />

                <Modal
                    title={`Agregar trigger`}
                    footer={null}
                    afterClose={closeModalTrigger}
                    onCancel={closeModalTrigger}
                    open={triggerModalOptions.openModalTrigger}
                >
                    <AddTriggerComponent
                        adaptiveDialog={triggerModalOptions.adaptiveDialogSelected!}
                        triggerCb={triggerCb}
                    />
                </Modal>
                <Modal
                    title={`Agregar tema`}
                    afterClose={closeModalTopic}
                    footer={null}
                    onCancel={closeModalTopic}
                    open={topicModalOptions.openModalTopic}
                >
                    <AddTopicComponent
                        topicCb={topicCb}
                    />
                </Modal>
            </>
            : null
    )
}
