import { Input, Tag, Typography } from 'antd';
import { ChangeEvent, useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { SendActivityNode, primaryColor } from '.';

const { Paragraph } = Typography;

const SendActivityDisplay = () => {
    const node = useContext(NodeContext);
    const action = {
        $kind: "Microsoft.SendActivity",
        activity: ""
    }

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={SendActivityNode.addIcon}
        >
            {
                node.data?.activity
                    ?
                    <>
                        <Paragraph>
                            <pre>{node.data?.activity}</pre>
                        </Paragraph>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar mensaje
                    </Tag>
            }
        </NodeCard>
    );
};

export { SendActivityDisplay }