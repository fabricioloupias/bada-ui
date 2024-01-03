import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { ChoiceInputNode, primaryColor } from '.';
import { Button, Space, Switch, Tag, Text, Paragraph } from "../../../antd";

const ChoiceInputDisplay = () => {

    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={ChoiceInputNode.addIcon}
        >
            {
                node.data?.choices
                    ?
                    <>
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%'
                            }}
                        >
                            <Text strong>Esperar respuesta de usuario?</Text>
                            <Switch checked={node?.data?.isInput} />
                            <Text strong>Mensaje cuerpo</Text>
                            <Paragraph
                            >
                                <pre
                                    style={{
                                        margin: 0
                                    }}
                                >{node.data?.prompt}</pre>
                            </Paragraph>
                            <Text strong>Opciones</Text>
                            {node.data.choices.map((c: any, index: number) =>
                                <Button
                                    key={c.value + index} block>
                                    {c.action.title}
                                </Button>
                            )}
                            {node?.data?.isInput ??
                                <>
                                    <Text strong>Respuesta guardada en...</Text>
                                    <Text code>{node.data.property}</Text>
                                </>
                            }
                            {node?.data?.isInput ??
                                <>
                                    <Text strong>Mensaje para respuesta inválida</Text>
                                    <Paragraph
                                    >
                                        <pre
                                            style={{
                                                margin: 0
                                            }}
                                        >{node.data?.invalidPrompt}</pre>
                                    </Paragraph>
                                </>
                            }
                            {node?.data?.isInput ??
                                <>
                                    <Text strong>Estilo</Text>
                                    <Text code>{node.data.style}</Text>
                                </>
                            }
                        </Space>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar opciones
                    </Tag>
            }
        </NodeCard >
    );
};

export { ChoiceInputDisplay }