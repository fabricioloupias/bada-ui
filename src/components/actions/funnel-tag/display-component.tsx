import { Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { FunnelTagNode, primaryColor } from '.';

const { Paragraph } = Typography;

const FunnelTagDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={FunnelTagNode.addIcon}
            isNewFeature
        >
            {
                node.data?.activity.value
                    ?
                    <>
                        <Paragraph>
                            <pre>{node.data?.activity.value}</pre>
                        </Paragraph>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar valor para funnel
                    </Tag>
            }
        </NodeCard>
    );
};

export { FunnelTagDisplay }