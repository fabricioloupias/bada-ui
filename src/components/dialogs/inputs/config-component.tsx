import React, { useContext } from 'react';
import { BuilderContext, IConfigComponent, useDrawer } from 'react-flow-builder';
import { Form, Button, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ChoiceInputNode } from '.';

const { TextArea } = Input;



const ChoiceInputConfig = (props: IConfigComponent) => {
    const { selectedNode: node } = useContext(BuilderContext);
    const { saveDrawer: save } = useDrawer();

    const onFinish = (values: any) => {
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
        save?.(values, false);
    };

    const [form] = Form.useForm();

    return <>
        <Form
            name="dynamic_form_item"
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
                rules={[{ required: true }]}>
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
};

export { ChoiceInputConfig };