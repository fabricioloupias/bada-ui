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
import { Button } from '@/components/antd';
import { registerNodes } from '@/lib/register-nodes';
import { useRouter } from 'next/navigation';

type EditorProps = {
    triggerId: string
}


export default function Editor(props: EditorProps) {
    const router = useRouter()
    const { triggerId } = props;
    const {
        addActionToSave,
        changesToSave,
        setChangesToSave,
        saveActionsUnsaved
    } = useBoundStore(state => state)
    const getActions = useBoundStore(state => state.getActions)
    const actions = useBoundStore(state => state.actions)
    const [nodes, setNodes] = useState<INode[]>([]);
    const [isLoadingFlow, setIsLoadingFlow] = useState<boolean>(true);

    const handleChange = (nodesChanged: INode[], event: string, nodeChanged?: INode) => {
        setChangesToSave(true)
        nodesChanged.forEach(node => {
            node.triggerId = triggerId;
        })
        setNodes(nodesChanged);
    };

    const onAddNodeSuccess = (type: string, node: INode) => {
        node = {
            ...node,
            triggerId
        }
        addActionToSave(node)
    }

    useEffect(() => {
        setIsLoadingFlow(true)
        getActions({ triggerId })
        setIsLoadingFlow(false)
    }, [getActions, triggerId])

    const onSaveActionsUnsaved = () => {
        saveActionsUnsaved(actions)
    }

    if (isLoadingFlow) {
        return null
    }

    if (!isLoadingFlow) {
        return (
            <>
                <Button
                    onClick={() => router.back()}
                >
                    Volver
                </Button>
                <Button
                    disabled={!changesToSave}
                    onClick={onSaveActionsUnsaved}
                >
                    Guardar
                </Button>
                <FlowBuilder
                    nodes={actions}
                    zoomTool
                    onChange={handleChange}
                    historyTool
                    onAddNodeSuccess={onAddNodeSuccess}
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