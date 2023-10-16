import { Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { SwitchConditionNode, primaryColor } from '.';

const { Text } = Typography;

const SwitchConditionDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            title={node.name}
            iconBackground={primaryColor}
            icon={SwitchConditionNode.addIcon}
            nodeId={node.id}
        >
            {
                node.data?.condition
                    ?
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%'
                        }}
                    >

                        <Text strong>Valor condición</Text>
                        <Text code>{node.data?.condition}</Text>
                    </Space>
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

export { SwitchConditionDisplay }