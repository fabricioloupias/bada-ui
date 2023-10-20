import { Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { CancelAllDialogsNode, primaryColor } from '.';
import { Paragraph } from '@/components/antd';

const { Text } = Typography;

const CancelAllDialogsDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            title={node.name}
            iconBackground={primaryColor}
            icon={CancelAllDialogsNode.addIcon}
            nodeId={node.id}
        >
            <Paragraph
            >
                <pre
                    style={{
                        margin: 0
                    }}
                >Finalizar diálogos</pre>
            </Paragraph>
        </NodeCard>
    );
};

export { CancelAllDialogsDisplay }