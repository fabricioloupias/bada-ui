"use client"
import { Space, Button, Modal, Form, Input, Select } from '@/components/antd'
import { DeleteOutlined, PlusOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { Bot } from '../../models/Bot';

export default function BotsActions() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formNewChatbot] = Form.useForm();
    const [chatBot, setChatBot] = useState<Bot>();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        try {
            const response = await fetch(`/api/bots`, {
                method: 'POST',
                body: JSON.stringify(chatBot),
            })

            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
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
                onClick={showModal}
                icon={<PlusOutlined />}
            >
                Nuevo chatbot
            </Button>
            <Modal
                title="Crear nuevo chatbot"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    form={formNewChatbot}
                    initialValues={chatBot}
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