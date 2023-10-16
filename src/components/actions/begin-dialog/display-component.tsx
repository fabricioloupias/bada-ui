import { Button, Divider, Space, Tag, Typography } from 'antd';
import { useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { BeginDialogNode, primaryColor } from '.';

const { Text, Paragraph } = Typography;

const BeginDialogDisplay = () => {

    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={BeginDialogNode.addIcon}
        >
            {
                node.data
                    ?
                    <>

                        <Text strong>Diálogo</Text>
                        <Paragraph
                        >
                            <pre
                                style={{
                                    margin: 0
                                }}
                            >{node.data?.dialog}</pre>
                        </Paragraph>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                       Setear diálogo
                    </Tag>
            }
        </NodeCard>
    );
};

export { BeginDialogDisplay }