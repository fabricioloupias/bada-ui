import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input } from 'antd';
import { IfConditionNode } from '.';

const IfConditionConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

    const [form] = Form.useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();
            values.$kind = IfConditionNode.type
            save?.(values, false);
        } catch (error) {
            const values = form.getFieldsValue();
            save?.(values, !!error);
        }
    };

    return <>
        <Form
            form={form}
            initialValues={node?.data}
            layout='vertical'
        >
            <Form.Item
                name="condition"
                rules={[{ required: true }]}>
                <Input placeholder="Ingresar valor" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    onClick={saveForm}
                >
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    </>
};

export { IfConditionConfig };