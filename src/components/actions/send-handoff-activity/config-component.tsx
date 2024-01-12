import React, { useContext, useState } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input } from 'antd';
import { SendHandoffActivityNode } from '.';
import { JsonEditor } from 'json-edit-react';
import { Paragraph } from '../../antd';

const { TextArea } = Input;

const SendHandoffActivityConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const [jsonData, setJsonData] = useState(node?.data?.activity?.channelData || {});
    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

    const [form] = Form.useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();
            values.$kind = SendHandoffActivityNode.type

            if (Object.keys(jsonData).length !== 0) {
                values.activity = {
                    channelData: jsonData
                }
            }
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
                    label="Objeto que viaja dentro de Activity.channelData"
                >
                    <Paragraph>
                        <JsonEditor
                            data={jsonData}
                            rootName='channelData'
                            onUpdate={({ newData }) => {
                                setJsonData({ ...jsonData, ...newData })
                            }}
                        />
                    </Paragraph>
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

export { SendHandoffActivityConfig };