'use client'
import React, { useState, useEffect } from 'react';
import FlowBuilder, {
    INode,
} from 'react-flow-builder';
import './style.css';
import { DrawerComponent } from '@/components/drawer';
import { PopoverComponent } from '@/components/popover';
import { PopconfirmComponent } from '@/components/popconfim';
import { ObjectId } from '@/utils'
import { useBoundStore } from '../../store';
import { Button, Col, Header, Row, Space, Title } from '@/components/antd';
import { registerNodes } from '@/lib/register-nodes';
import { useRouter } from 'next/navigation';
import { LeftOutlined } from '@ant-design/icons';

type EditorProps = {
    triggerId: string
}


export default function Editor(props: EditorProps) {
    const router = useRouter()
    const { triggerId } = props;
    const {
        changesToSave,
        setChangesToSave,
        saveActions,
        setActions,
        addActionToDelete,
        actionsToDelete
    } = useBoundStore(state => state)
    const getActions = useBoundStore(state => state.getActions)
    const actions = useBoundStore(state => state.actions)
    const [isLoadingFlow, setIsLoadingFlow] = useState<boolean>(true);

    const handleChange = (nodesChanged: INode[], event: string, nodeChanged?: INode) => {
        console.log(nodesChanged)
        setChangesToSave(true)
        nodesChanged.forEach(node => {
            node.triggerId = triggerId;
        })
        setActions(nodesChanged);
    };

    useEffect(() => {
        setIsLoadingFlow(true)
        getActions({ triggerId })
        setIsLoadingFlow(false)
    }, [getActions, triggerId])

    const onSaveActions = () => {
        saveActions(actions, actionsToDelete)
    }

    const onRemoveNodeSuccess = (node: INode) => {
        addActionToDelete(node)
    }

    if (isLoadingFlow) {
        return null
    }

    if (!isLoadingFlow) {
        return (
            <>
                <Header
                    style={{
                        padding: "0 10px",
                        backgroundColor: "white",
                        borderLeft: "1px solid rgba(5, 5, 5, 0.06)",
                        borderBottom: "1px solid rgba(5, 5, 5, 0.06)"
                    }}>
                    <Row
                        justify="space-between"
                        align="middle"
                    >
                        <Col span={10}>
                            <Space >
                                <Button
                                    type='text'
                                    icon={<LeftOutlined />}
                                    onClick={() => router.back()}
                                >
                                </Button>
                                <Title style={{
                                    margin: 0
                                }} level={3}>Editor</Title>
                            </Space>
                        </Col>
                        <Col span={3}>
                            <Button
                                block
                                disabled={!changesToSave}
                                onClick={onSaveActions}
                            >
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Header>

                <FlowBuilder
                    nodes={actions}
                    zoomTool
                    onChange={handleChange}
                    historyTool
                    onRemoveNodeSuccess={onRemoveNodeSuccess}
                    showArrow
                    createUuid={() => ObjectId()}
                    registerNodes={registerNodes}
                    DrawerComponent={DrawerComponent}
                    PopoverComponent={PopoverComponent}
                    PopconfirmComponent={PopconfirmComponent}
                />
            </>
        );
    }
};