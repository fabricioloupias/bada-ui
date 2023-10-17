"use client"
import { useEffect, useState } from "react";
import type { DataNode } from 'antd/es/tree';
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import AddTriggerComponent from "@/components/add-trigger";
import { Button, CarryOutOutlined, Flash16Regular, Modal, Tree } from "@/components/antd";
import { useBoundStore } from "@/store";
import AddTopicComponent from "../add-topic";
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog";
import { ITrigger } from "@/interfaces/ITrigger";

type FlowTreeProps = {
    botVersionId: string
};

export type NewTrigger = {
    trigger: string,
    intent: string
}

export default function FlowTree({ botVersionId }: FlowTreeProps) {
    const getAdaptiveDialogs = useBoundStore((state) => state.getAdaptiveDialogs)
    const deepAdaptiveDialogs = useBoundStore((state) => state.deepAdaptiveDialogs)
    const setDeepAdaptiveDialogs = useBoundStore((state) => state.setDeepAdaptiveDialogs)
    const statusFetchingAdaptiveDialogs = useBoundStore((state) => state.statusFetchingAdaptiveDialogs)
    const saveTrigger = useBoundStore((state) => state.saveTrigger)
    const saveAdaptiveDialog = useBoundStore((state) => state.saveAdaptiveDialog)
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    const [isModalTriggerOpen, setIsModalTriggerOpen] = useState(false);
    const [isModalTopicOpen, setIsModalTopicOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("")
    const [triggerValue, setTriggerValue] = useState<NewTrigger>({
        trigger: "",
        intent: ""
    })
    const [topicIdValue, setTopicIdValue] = useState<string>("")
    const [isModalTopic, setIsModalTopic] = useState<boolean>(false)
    const [isModalTrigger, setIsModalTrigger] = useState<boolean>(false)
    const [adaptiveDialogIdToModal, setAdaptiveDialogIdToModal] = useState<string>("")

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

    const showModalToTrigger = (adaptiveDialogId: string) => {
        if (adaptiveDialogId) {
            setAdaptiveDialogIdToModal(adaptiveDialogId)
            setIsModalTrigger(true)
            setModalTitle("Agregar disparador")
            setIsModalTriggerOpen(true);
        }
    };

    const showModalToTopic = () => {
        setIsModalTopic(true)
        setModalTitle("Agregar tema")
        setIsModalTopicOpen(true);
    };

    const handleOkTrigger = () => {
        addTrigger(adaptiveDialogIdToModal, triggerValue)

        closeModal()
    };

    const handleOkTopic = () => {
        addTopic(botVersionId, topicIdValue)

        closeModal()
    };

    const handleCancel = () => {
        closeModal();
    };

    const closeModal = () => {
        setIsModalTrigger(false)
        setIsModalTopic(false)
        setIsModalTriggerOpen(false);
        setIsModalTopicOpen(false);
    }

    const getTreeData = (adaptiveDialogs: IAdaptiveDialog[]) => {
        if (adaptiveDialogs.length > 0) {
            const data = adaptiveDialogs.map((adaptiveDialog, index) => {
                adaptiveDialog.triggers = adaptiveDialog.triggers ?? [];
                const children = adaptiveDialog.triggers.map((t, indexC: number) => {
                    return {
                        key: `${index}-${index}-${indexC}`,
                        title: <Link href={`editor/${t._id}`}>{formatTrigger(t)}</Link>,
                        icon: <Flash16Regular />
                    }
                })
                children.push({
                    key: uuidv4(),
                    title: <Button
                        size="small"
                        onClick={() => showModalToTrigger(adaptiveDialog._id!)}
                    >
                        Agregar disparador
                    </Button>,
                    icon: <Flash16Regular />
                })
                return {
                    key: `${index}-${index}`,
                    title: adaptiveDialog.id,
                    icon: <CarryOutOutlined />,
                    children
                }

            }) as DataNode[]

            data.push({
                key: uuidv4(),
                title: (<Button
                    size="small"
                    onClick={() => showModalToTopic()}
                >
                    Agregar tema
                </Button>),
                icon: <CarryOutOutlined />,
                children: []
            })
            return data
        }
    }

    useEffect(() => {
        getAdaptiveDialogs(botVersionId)
    }, [botVersionId, getAdaptiveDialogs])

    const addTrigger = async (dialogId: string, triggerValue: NewTrigger) => {
        const newTrigger = {
            $kind: triggerValue.trigger,
            adaptiveDialogId: dialogId,
            intent: triggerValue.intent
        }
        const trigger = await saveTrigger(newTrigger)

        const index = deepAdaptiveDialogs.findIndex(d => d._id === dialogId)
        const dialogSelected = deepAdaptiveDialogs[index]
        if (dialogSelected) {

            deepAdaptiveDialogs[index].triggers = deepAdaptiveDialogs[index].triggers ?? []
            deepAdaptiveDialogs[index].triggers!.push(trigger)
            setDeepAdaptiveDialogs(deepAdaptiveDialogs)
            getTreeData(deepAdaptiveDialogs)
        }
    }

    const addTopic = async (botVersionId: string, topicIdValue: string) => {
        const adaptiveDialog = await saveAdaptiveDialog({
            botVersionId,
            id: topicIdValue
        })
        deepAdaptiveDialogs.push(adaptiveDialog)
        setDeepAdaptiveDialogs(deepAdaptiveDialogs)
        getTreeData(deepAdaptiveDialogs)
    }

    const afterClose = () => {
        setIsModalTrigger(false)
        setIsModalTopic(false)
    }

    if (statusFetchingAdaptiveDialogs.isError && deepAdaptiveDialogs.length === 0) {
        return (
            <>
                error
            </>
        )
    }
    return (
        <>
            <Tree
                showLine
                defaultExpandAll
                treeData={getTreeData(deepAdaptiveDialogs)}
            />
            <Modal
                title={modalTitle}
                onOk={handleOkTrigger}
                afterClose={afterClose}
                onCancel={handleCancel}
                open={isModalTriggerOpen}
            >
                <AddTriggerComponent
                    setTriggerValue={setTriggerValue}
                />
            </Modal>
            <Modal
                title={modalTitle}
                onOk={handleOkTopic}
                afterClose={afterClose}
                onCancel={handleCancel}
                open={isModalTopicOpen}
            >
                <AddTopicComponent
                    setTopicIdValue={setTopicIdValue}
                />
            </Modal>
        </>
    )
}
