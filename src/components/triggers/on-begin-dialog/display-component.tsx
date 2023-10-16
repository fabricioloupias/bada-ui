import { Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { OnBeginDialogNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

const OnBeginDialogDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            title={node.name}
            iconBackground={primaryColor}
            icon={OnBeginDialogNode.addIcon}
            nodeId={node.id}
        >
        </NodeCard>
    );
};

export { OnBeginDialogDisplay }