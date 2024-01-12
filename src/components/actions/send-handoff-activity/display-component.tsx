import { Input, Tag, Typography } from 'antd';
import { ChangeEvent, useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { SendHandoffActivityNode, primaryColor } from '.';
import { JsonEditor } from 'json-edit-react';
import { Paragraph, Text } from '@/components/antd'


const SendHandoffActivityDisplay = () => {
    const node = useContext(NodeContext);

    return (
        <NodeCard
            nodeId={node.id}
            title={node.name}
            iconBackground={primaryColor}
            icon={SendHandoffActivityNode.addIcon}
        >
            {
                node.data?.activity
                    ?
                    <>
                        <Text strong>Contexto a enviar</Text>
                        <Paragraph>
                            <JsonEditor
                                data={node.data.activity.channelData}
                                restrictEdit={true}
                                restrictDelete
                                restrictAdd
                                restrictTypeSelection
                                enableClipboard={false}
                                rootName='channelData'
                            />
                        </Paragraph>
                    </>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Handoff sin contexto
                    </Tag>
            }
        </NodeCard>
    );
};

export { SendHandoffActivityDisplay }