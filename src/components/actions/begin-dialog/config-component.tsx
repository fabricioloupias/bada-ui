import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { BeginDialogNode } from '.';

const { TextArea } = Input;

const BeginDialogConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

    const [form] = Form.useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();
            values.$kind = BeginDialogNode.type
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
                name="dialog"
                rules={[{ required: true }]}>
                <Input placeholder="Ingresar id diálogo" />
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

export { BeginDialogConfig };