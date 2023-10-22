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
                <Button
                    onClick={() => router.back()}
                >
                    Volver
                </Button>
                <Button
                    disabled={!changesToSave}
                    onClick={onSaveActions}
                >
                    Guardar
                </Button>
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