import { Button, Divider, Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { ChoiceInputNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

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
                            <Text strong>Respuesta guardada en...</Text>
                            <Text code>{node.data.property}</Text>
                            <Text strong>Mensaje para respuesta inválida</Text>
                            <Paragraph
                            >
                                <pre
                                    style={{
                                        margin: 0
                                    }}
                                >{node.data?.invalidPrompt}</pre>
                            </Paragraph>
                            <Text strong>Estilo</Text>
                            <Text code>{node.data.style}</Text>
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
        </NodeCard>
    );
};

export { ChoiceInputDisplay }