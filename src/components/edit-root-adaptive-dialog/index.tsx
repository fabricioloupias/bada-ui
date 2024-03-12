import { IAdaptiveDialog } from "@/interfaces/IAdaptiveDialog"
import { Form, Title } from "../antd"
import { Alert, Button, Card, Input, Select, Space, Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { recognizerTypes } from "@/utils";
import { useBoundStore } from "@/store";
import { useState } from "react";

type EditRootAdaptiveDialogProps = {
    adaptiveDialog: IAdaptiveDialog
}

export default function EditRootAdaptiveDialog({ adaptiveDialog }: EditRootAdaptiveDialogProps) {
    const {
        updateAdaptiveDialog
    } = useBoundStore((state) => state)
    const [showSpin, setShowSpin] = useState<boolean>(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false)

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setShowAlertSuccess(true)
        adaptiveDialog.recognizer = values
        try {
            await updateAdaptiveDialog(adaptiveDialog)
            setShowSpin(true)
        } catch (error) {
            console.error(error)
        } finally {
            setShowSpin(false)
        }
    };

    return (
        <>
            <Spin
                spinning={showSpin}
            >

                <Title style={{
                    marginTop: 0
                }} level={5}>
                    Reconocedores
                </Title>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    onFinish={onFinish}
                    name="dynamic_form_complex"
                    autoComplete="off"
                    initialValues={
                        adaptiveDialog.recognizer
                    }
                >
                    <Form.List name="recognizers"
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        style={{
                                            marginBottom: 10
                                        }}
                                        title={`Reconocedor ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item label="$kind" name={[field.name, '$kind']}>
                                            <Select
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {
                                                    recognizerTypes().map((recognizerType, index) =>
                                                        <Select.Option key={index} value={recognizerType}>{recognizerType}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>

                                        {/* Nest Form.List
                                <Form.Item label="List">
                                    <Form.List name={[field.name, 'list']}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item noStyle name={[subField.name, 'first']}>
                                                            <Input placeholder="first" />
                                                        </Form.Item>
                                                        <Form.Item noStyle name={[subField.name, 'second']}>
                                                            <Input placeholder="second" />
                                                        </Form.Item>
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                subOpt.remove(subField.name);
                                                            }}
                                                        />
                                                    </Space>
                                                ))}
                                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                                    + Add Sub Item
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item> */}
                                    </Card>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Agregar reconocedor
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
                {showAlertSuccess
                    ?
                    <Alert message="Guardado exitoso" type="success" />

                    :
                    null
                }
            </Spin>

        </>
    )
}