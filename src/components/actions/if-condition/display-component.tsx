import { Tag } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { BoxPlotTwoTone } from '@ant-design/icons';
import { IfConditionNode, primaryColor } from '.';

const IfConditionDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={IfConditionNode.addIcon}
        >
            {
                node.data?.condition
                    ?
                    <Tag
                        style={{
                            width: '100%'
                        }}
                    >
                        {node.data?.condition}
                    </Tag>
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

export { IfConditionDisplay }