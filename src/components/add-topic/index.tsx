"use client"
import { Button, Form, Input } from "@/components/antd"
import { Dispatch, SetStateAction, useState } from "react";

type AddTopicComponentProps = {
    topicCb: (topicId: string) => void
}
export default function AddTopicComponent({ topicCb }: AddTopicComponentProps) {
    const [form] = Form.useForm();
    form.resetFields()

    const onFinish = ({ id }: { id: string }) => {
        topicCb(id)
        form.resetFields()
    };

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="id"
                    label="Nombre tema"
                >
                    <Input placeholder="Caso de uso" />
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
        </>
    )
}