"use client"
import { Space, Button, Modal, Form, Input, Select, Spin } from '@/components/antd'
import { DeleteOutlined, PlusOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { Bot } from '../../models/Bot';
import { Alert } from 'antd';
import { useBoundStore } from '@/store';

export default function BotsActions() {
    const {
        getBots
    } = useBoundStore((state) => state)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formNewChatbot] = Form.useForm();
    const [chatBot, setChatBot] = useState<Bot>();
    const [showSpin, setShowSpin] = useState<boolean>(false)
    const [showAlertNewBotSuccess, setShowAlertNewBotSuccess] = useState<boolean>(false)

    const showModalNewBot = () => {
        formNewChatbot.resetFields()
        setShowAlertNewBotSuccess(false)
        setOpen(true);
    };

    const handleOkNewBot = async () => {
        setShowSpin(true)
        try {
            await fetch(`/api/bots`, {
                method: 'POST',
                body: JSON.stringify(chatBot),
            })
            setShowAlertNewBotSuccess(true)
            getBots()
        } catch (error) {
            console.error(error)
        }
        setShowSpin(false)
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFormNewChatbotChange = (bot: Bot) => {
        setChatBot({ ...chatBot, ...bot });
    };

    return (
        <Space wrap>
            <Button
                type="text"
                onClick={showModalNewBot}
                icon={<PlusOutlined />}
            >
                Nuevo chatbot
            </Button>
            <Modal
                title="Crear nuevo chatbot"
                open={open}
                onOk={handleOkNewBot}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Spin
                    spinning={showSpin}
                >
                    <Form
                        layout="vertical"
                        form={formNewChatbot}
                        initialValues={{
                            name: "",
                            type: ""
                        }}
                        onValuesChange={onFormNewChatbotChange}
                    >
                        <Form.Item
                            name="name"
                            label="Nombre para el bot">
                            <Input placeholder="Bot2C, test_bot, Prueba bot..." />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Tipo"
                        >
                            <Select
                            >
                                <Select.Option value="Producción">Producción</Select.Option>
                                <Select.Option value="Certificación">Certificación</Select.Option>
                                <Select.Option value="Desarrollo">Desarrollo</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    {showAlertNewBotSuccess
                        ?
                        <Alert message="Bot creado exitosamente" type="success" />

                        :
                        null
                    }
                </Spin>
            </Modal>
            <Button
                type="text"
                icon={<VerticalAlignBottomOutlined />}
            >
                Importar chatbot
            </Button>
            <Button
                type="text"
                icon={<VerticalAlignTopOutlined />}
            >
                Exportar chatbot
            </Button>
            <Button
                type="text"
                icon={<DeleteOutlined />}
            >
                Eliminar chatbot
            </Button>
        </Space>
    )
}