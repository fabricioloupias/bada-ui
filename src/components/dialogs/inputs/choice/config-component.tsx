import React, { useContext, useState } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ChoiceInputNode } from '.';
import { Button, Checkbox, Form, InputNumber, Space, TextArea } from '../../../antd';
import { Input, Switch } from 'antd';
import { SendActivityNode } from '../../../actions/send-activity';

const ChoiceInputConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { saveDrawer: save } = useDrawer();
    const [form] = Form.useForm();

    const isInput = Form.useWatch('isInput', form);

    const onFinish = (values: any) => {
        const isInput = values.isInput;

        if (isInput) {
            values.$kind = ChoiceInputNode.type
            values.choices = values.choices.map((c: any) => ({
                ...c,
                action: {
                    ...c.action,
                    type: "messageBack",
                    text: c.action.title,
                    value: c.value
                }
            }))
        } else {
            values.$kind = SendActivityNode.type;
            values.activity = {
                attachments: [
                    {
                        contentType: "application/vnd.microsoft.card.adaptive",
                        content: {
                            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                            type: "AdaptiveCard",
                            version: "1.3",
                            body: [
                                {
                                    type: "TextBlock",
                                    text: values.prompt
                                }
                            ],
                            actions: values.choices.map((c: any) => ({
                                type: "Action.Submit",
                                title: c.action.title,
                                data: {
                                    value: c.value
                                }
                            }))
                        }
                    }
                ]
            }
        }
        save?.(values, false);
    };



    return <>
        <Form
            name="dynamic_form_item"
            onFinish={onFinish}
            style={{ width: '100%' }}
            layout='vertical'
            initialValues={{
                ...node?.data,
                isInput: node?.data?.isInput ?? false
            }}
            form={form}
        >
            <Form.Item
                name="isInput"
                label="Esperar respuesta de usuario?"
            >
                <Switch defaultChecked={node?.data?.isInput} />
            </Form.Item>
            <Form.Item
                name="prompt"
                label="Mensaje"
                rules={[{ required: true }]}>
                <TextArea
                    placeholder="Cuerpo del mensaje"
                />
            </Form.Item>
            <Form.List
                name="choices"
                rules={[
                    {
                        validator: async (_, names) => {

                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    key={key + 'item_title' + name}
                                    {...restField}
                                    name={[name, 'action', 'title']}
                                    rules={[{ required: true, message: 'Texto requerido' }]}
                                >
                                    <Input placeholder="Texto de opción" />
                                </Form.Item>
                                <Form.Item
                                    key={key + 'item_vale' + name}
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Valor ID requerido' }]}
                                >
                                    <Input placeholder="Valor ID" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '100%' }}
                                icon={<PlusOutlined />}
                            >
                                Agregar opción
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item
                name="invalidPrompt"
                label="Mensaje para respuesta inválida"
                rules={[{ required: isInput }]}>
                <TextArea
                    placeholder="Cuerpo del mensaje"
                />
            </Form.Item>
            <Form.Item
                shouldUpdate
                name="property"
                label="Guardar respuesta en..."
                rules={[{ required: isInput }]}>
                <Input
                    placeholder="Nombre variable"
                />
            </Form.Item>
            <Form.List
                name="validations"
                rules={[
                    {
                        validator: async (_, names) => {

                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    key={key + 'item_title' + name}
                                    {...restField}
                                    name={[name]}
                                    rules={[{ required: true, message: 'Validación requerido' }]}
                                >
                                    <Input placeholder="Condición" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '100%' }}
                                icon={<PlusOutlined />}
                            >
                                Agregar validación
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item
                name="style"
                label="Estilo"
                rules={[{ required: isInput }]}>
                <InputNumber
                    min={0}
                    max={5}
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

export { ChoiceInputConfig };