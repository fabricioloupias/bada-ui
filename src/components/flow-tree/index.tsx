"use client"
import { Key, useEffect, useState } from "react";
import type { DataNode, EventDataNode } from 'antd/es/tree';
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import AddTriggerComponent from "@/components/add-trigger";
import { Button, CarryOutOutlined, EditOutlined, Flash16Regular, Form, Input, Modal, Space, Title, Tree } from "@/components/antd";
import { useBoundStore } from "@/store";
import AddTopicComponent from "../add-topic";
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog";
import { ITrigger } from "@/interfaces/ITrigger";
import node from "postcss/lib/node";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

type FlowTreeProps = {
    botVersionId: string
};

export type NewTrigger = {
    trigger: string,
    intent: string
}

export default function FlowTree({ botVersionId }: FlowTreeProps) {
    const {
        updateAdaptiveDialog
    } = useBoundStore((state) => state)
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
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])
    const [isModalEditRootOpen, setIsModalEditRootOpen] = useState(false);
    const [rootAdaptiveDialog, setRootAdaptiveDialog] = useState<IAdaptiveDialog>()

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

    const onSelectNode = (selectedKeys: Key[], info: { node: EventDataNode<DataNode> }) => {
        if (info.node.key == "0-0") {
            showEditRootModal()
        }
    }

    const getTreeData = (adaptiveDialogs: IAdaptiveDialog[]) => {
        const expandedKeys = []
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
                        title: <Link href={`editor/${t._id}`}>{formatTrigger(t)}</Link>,
                        icon: <Flash16Regular />
                    }
                })
                countIndex++
                const key = `${mainIndex}-${index}-${countIndex}`
                expandedKeys.push(key)
                children.push({
                    key,
                    title: <Button
                        size="small"
                        onClick={() => showModalToTrigger(adaptiveDialog._id!)}
                    >
                        Agregar disparador
                    </Button>,
                    icon: <Flash16Regular />
                })
                expandedKeys.push(`${mainIndex}-${index}`)
                if (adaptiveDialog.id === "Root") {
                    setRootAdaptiveDialog(adaptiveDialog)
                    return {
                        key: `${mainIndex}-${index}`,
                        title:
                            <Space>
                                {adaptiveDialog.id}
                                <EditOutlined />
                            </Space>,
                        icon: <CarryOutOutlined />,
                        children,
                        selectable: true
                    } as DataNode
                } else {
                    return {
                        key: `${mainIndex}-${index}`,
                        title: adaptiveDialog.id,
                        icon: <CarryOutOutlined />,
                        children,
                        selectable: false
                    } as DataNode
                }

            }) as DataNode[]
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
                icon: <CarryOutOutlined />,
                children: []
            })
            setExpandedKeys(expandedKeys)
            console.log(data)
            setTreeData([...data])
        }
    }

    useEffect(() => {
        getAdaptiveDialogs(botVersionId)
    }, [botVersionId, getAdaptiveDialogs,])


    useEffect(() => {
        getTreeData(deepAdaptiveDialogs)
    }, [deepAdaptiveDialogs])

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

    const showEditRootModal = () => {
        setIsModalEditRootOpen(true);
    };

    const handleOkEditRootModal = async (values: any) => {
        if (rootAdaptiveDialog && values) {
            rootAdaptiveDialog.recognizer!.intents = values.intents
            try {
                await updateAdaptiveDialog(rootAdaptiveDialog)
            } catch (error) {
                console.error(error)
            }
        }
        setIsModalEditRootOpen(false);
    };

    const handleCancelEditRootModal = () => {
        setIsModalEditRootOpen(false);
    };

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
                expandedKeys={expandedKeys}
                treeData={treeData}
                onSelect={onSelectNode}
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
            <Modal title="Editar Root"
                open={isModalEditRootOpen}
                onCancel={handleCancelEditRootModal}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={rootAdaptiveDialog?.recognizer}
                    onFinish={handleOkEditRootModal}
                    autoComplete="off"
                >
                    <Form.List
                        name="intents"
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            key={field.key}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Ingresa el nombre del intent o eliminalo",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="intent id" style={
                                                { width: '93%' }
                                            } />
                                        </Form.Item>
                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{
                                                    marginLeft: "5px"
                                                }}
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '100%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Agregar intent
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Actualizar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
