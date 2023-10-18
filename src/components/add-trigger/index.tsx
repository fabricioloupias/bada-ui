"use client"
import { Button, Form, Input, Select } from "@/components/antd"
import { Dispatch, SetStateAction, useState } from "react";
import { NewTrigger } from "../flow-tree";

type AddTriggerComponentProps = {
    setTriggerValue: Dispatch<SetStateAction<
        {
            trigger: string,
            intent: string
        }
    >>
}
export default function AddTriggerComponent({ setTriggerValue }: AddTriggerComponentProps) {
    const [form] = Form.useForm();


    const onFinish = (values: NewTrigger) => {
        setTriggerValue(values)
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
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