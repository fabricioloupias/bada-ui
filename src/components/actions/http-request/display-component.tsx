import { Divider, Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { HttpRequestNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

const HttpRequestDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={HttpRequestNode.addIcon}
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
                            <Text strong>Método HTTP</Text>
                            <Text code>{node.data.method}</Text>
                            <Text strong>Endpoint</Text>
                            <Paragraph
                            >
                                <pre
                                    style={{
                                        margin: 0
                                    }}
                                >{node.data?.url}
                                </pre>
                            </Paragraph>
                            <Text strong>Variable para respuesta</Text>
                            <Text code>{node.data.resultProperty}</Text>
                        </Space>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar condición
                    </Tag>
            }
        </NodeCard>
    );
};

export { HttpRequestDisplay }