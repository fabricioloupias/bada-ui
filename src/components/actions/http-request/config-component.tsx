import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { HttpRequestNode } from '.';

const methodList = ['GET', 'POST', 'PUT', 'DELETE']

const HttpRequestConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { closeDrawer: cancel, saveDrawer: save } = useDrawer();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        values.$kind = HttpRequestNode.type
        let headers: { [key: string]: string } = {}

        if (values.headers) {
            values.headers.map((h: { key: string, value: string }) => {
                headers[h.key] = h.value
            })
        }

        values.headers = headers
        save?.(values, false);
    };

    return <>
        <Form
            form={form}
            initialValues={node?.data}
            onFinish={onFinish}
            layout='vertical'
        >
            <Form.Item
                name="method"
                label="Método HTTP"
            >
                <Select
                    placeholder="GET, POST, PUT, DELETE"
                >
                    {methodList.map((m, index) =>
                        <Select.Option
                            key={m + index}
                            value={m}
                        >
                            {m}
                        </Select.Option>
                    )}

                </Select>
            </Form.Item>
            <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true }]}>
                <Input
                    placeholder="https://.."
                />
            </Form.Item>
            <Form.Item
                name="resultProperty"
                label="Guardar respuesta como..."
                rules={[{ required: true }]}>
                <Input
                    placeholder="Nombre variable"
                />
            </Form.Item>
            <Form.Item
                name="contentType"
                label="Tipo contenido"
                rules={[{ required: true }]}>
                <Input
                    placeholder="application/json, application/xml..."
                />
            </Form.Item>
            <Form.List
                name="headers"
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key}
                                style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                    rules={[{ required: true, message: 'Se necesita key' }]}
                                >
                                    <Input placeholder="key" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Se necesita value' }]}
                                >
                                    <Input placeholder="value" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Agregar header
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
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

export { HttpRequestConfig };