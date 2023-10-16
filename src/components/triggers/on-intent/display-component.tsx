import { Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { OnIntentNode, primaryColor } from '../on-intent';

const { Text, Paragraph } = Typography;

const OnIntentDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            title={node.name}
            iconBackground={primaryColor}
            icon={OnIntentNode.addIcon}
            nodeId={node.id}
        >
        </NodeCard>
    );
};

export { OnIntentDisplay }