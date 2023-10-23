import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TextInputNode } from '.';

const { TextArea } = Input;

const TextInputConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { saveDrawer: save } = useDrawer();

    const onFinish = (values: any) => {
        values.$kind = TextInputNode.type
        save?.(values, false);
    };

    const [form] = Form.useForm();

    return <>
        <Form
            onFinish={onFinish}
            style={{ width: '100%' }}
            layout='vertical'
            initialValues={node?.data}
            form={form}
        >
            <Form.Item
                name="prompt"
                label="Mensaje"
                rules={[{ required: true }]}>
                <TextArea
                    placeholder="Cuerpo de la pregunta"
                />
            </Form.Item>
            <Form.Item
                name="invalidPrompt"
                label="Mensaje para respuesta inválida"
                rules={[{ required: true }]}>
                <TextArea
                    placeholder="Cuerpo del mensaje"
                />
            </Form.Item>
            <Form.Item
                name="property"
                label="Guardar respuesta en..."
                rules={[{ required: true }]}>
                <Input
                    placeholder="Nombre variable"
                />
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
};

export { TextInputConfig };