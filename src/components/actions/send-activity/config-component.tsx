import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input } from 'antd';
import { SendActivityNode } from '.';

const { TextArea } = Input;

const SendActivityConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);

    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

    const [form] = Form.useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();
            values.$kind = SendActivityNode.type
            save?.(values, false);
        } catch (error) {
            const values = form.getFieldsValue();
            save?.(values, !!error);
        }
    };

    return (
        <div>
            <Form
                form={form}
                initialValues={node?.data}
                layout='vertical'
            >
                <Form.Item
                    name="activity"
                    label="Mensaje"
                    rules={[{ required: true }]}>
                    <TextArea
                        rows={4}
                    />
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
        </div >
    );
};

export { SendActivityConfig };