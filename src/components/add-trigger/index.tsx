"use client"
import { Button, Form, Input, Select, Title } from "@/components/antd"
import { Dispatch, SetStateAction, useState } from "react";
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog";

export type NewTrigger = {
    trigger: string,
    intent: string
}

type AddTriggerComponentProps = {
    adaptiveDialog: IAdaptiveDialog
    triggerCb: (data: NewTrigger) => void
}
export default function AddTriggerComponent({ adaptiveDialog, triggerCb }: AddTriggerComponentProps) {
    const [form] = Form.useForm();
    form.resetFields()
    
    const onFinish = (values: NewTrigger) => {
        triggerCb(values)
        form.resetFields()
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Title level={5}>Diálogo: {adaptiveDialog.id}</Title>
            <Form.Item
                name="trigger"
                label="Seleccionar disparador">
                <Select
                >
                    <Select.Option value="Microsoft.OnIntent">Al reconocer intent</Select.Option>
                    <Select.Option value="Microsoft.OnBeginDialog">Al iniciar diálogo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="intent"
                label="Intent id">
                <Input placeholder="Intent" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    )
}