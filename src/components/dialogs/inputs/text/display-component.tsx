import { Button, Divider, Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { TextInputNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

const TextInputDisplay = () => {

    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={TextInputNode.addIcon}
        >
            {
                node.data
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
                        </Space>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Escribir pregunta
                    </Tag>
            }
        </NodeCard>
    );
};

export { TextInputDisplay }