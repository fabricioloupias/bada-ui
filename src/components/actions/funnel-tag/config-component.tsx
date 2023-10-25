import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input } from 'antd';
import { FunnelTagNode } from '.';

const { TextArea } = Input;

const FunnelTagConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);

    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

    const [form] = Form.useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();
            values.$kind = "Microsoft.SendActivity"
            values.activity.type = "event"
            values.activity.name = "funnel-tag"
            save?.(values, false);
        } catch (error) {
            console.error(error)
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
                    name={["activity", "value"]}
                    label="Mensaje"
                    rules={[{ required: true }]}>
                    <Input placeholder="Ingresar valor para funnel" />
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

export { FunnelTagConfig };