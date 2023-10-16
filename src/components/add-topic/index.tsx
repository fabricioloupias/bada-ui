"use client"
import { Form, Input, Select } from "@/components/antd"
import { Dispatch, SetStateAction, useState } from "react";

type AddTopicComponentProps = {
    setTopicIdValue: Dispatch<SetStateAction<string>>
}
export default function AddTopicComponent({ setTopicIdValue }: AddTopicComponentProps) {
    const [form] = Form.useForm();

    const onTopicIdChange = ({ id }: { id: string }) => {
        setTopicIdValue(id)
    };

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onValuesChange={onTopicIdChange}
            >
                <Form.Item
                    name="id"
                    label="Tema"
                >
                    <Input placeholder="Título del tema" />
                </Form.Item>
            </Form>
        </>
    )
}