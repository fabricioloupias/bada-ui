import { Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { SetPropertyNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

const SetPropertyDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={SetPropertyNode.addIcon}
        >
            {
                node.data
                    ?
                    <>
                        <Text strong>Clave</Text>
                        <Paragraph
                        >
                            <pre
                                style={{
                                    margin: 0
                                }}
                            >{node.data?.property}</pre>
                        </Paragraph>
                        <Text strong>Valor</Text>
                        <Paragraph
                        >
                            <pre
                                style={{
                                    margin: 0
                                }}
                            >{node.data?.value}</pre>
                        </Paragraph>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar propiedad
                    </Tag>
            }
        </NodeCard>
    );
};

export { SetPropertyDisplay }