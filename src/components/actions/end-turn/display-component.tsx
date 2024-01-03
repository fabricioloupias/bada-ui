import { Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { EndTurnNode, primaryColor } from '.';

const { Paragraph } = Typography;

const EndTurnDisplay = () => {
    const node = useContext(NodeContext);
    const action = {
        $kind: "Microsoft.EndTurn",
    }

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={EndTurnNode.addIcon}
        >
            <>
                <Paragraph>
                    <pre>Fin de turno</pre>
                </Paragraph>
            </>
        </NodeCard>
    );
};

export { EndTurnDisplay }