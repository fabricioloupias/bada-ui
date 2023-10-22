import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { setByPath } from "../../utils"
import { INode } from "react-flow-builder"
import * as uuid from 'uuid';

export interface ActionsSlice {
    actions: INode[],
    actionsToDelete: INode[]
    statusFetchingFlows: {
        isLoading: boolean
        isError: boolean
    },
    getActions: ({ triggerId }: { triggerId: string }) => Promise<void>
    saveActions: (actions: INode[], actionsToDelete: INode[]) => void
    changesToSave: boolean
    setChangesToSave: (changes: boolean) => void
    setActions: (actions: INode[]) => void
    addActionToDelete: (action: INode) => void
}

export const createActionsSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    ActionsSlice
> = (set, get) => ({
    changesToSave: false,
    actions: [],
    actionsSaved: [],
    actionsToDelete: [],
    statusFetchingFlows: {
        isLoading: false,
        isError: false
    },
    saveActions: async (actions: INode[], actionsToDelete: INode[]) => {
        let actionIdsToDelete: string[] = []
        actionsToDelete.forEach(a => {
            if (a._id)
                actionIdsToDelete.push(a._id)
        })
        
        try {
            const response = await fetch(`/api/actions`, {
                method: 'POST',
                body: JSON.stringify({
                    actionsToSave: actions,
                    actionIdsToDelete
                })
            })

            const json = await response.json();
            return json
        } catch (error) {
            console.error('saveActions', error)
        }
    },
    getActions: async ({ triggerId }) => {
        if (uuid.validate(triggerId)) {
            const triggersToSave = get().triggersToSave
            const trigger = triggersToSave.find(trigger => trigger._id === triggerId)
            const treeNodes: INode[] = []

            trigger?.actions.forEach(a => {
                setByPath(treeNodes, a.path!.join("."), a)
            })
            set({ triggersToSave })
            set({ actions: treeNodes })
        } else {
            set({
                statusFetchingFlows: {
                    isLoading: true,
                    isError: false
                }
            })
            try {
                const response = await fetch(`/api/actions?triggerId=${triggerId}`)
                const json = await response.json() as { actions: INode[] }

                set({
                    statusFetchingFlows: {
                        isLoading: false,
                        isError: false
                    }
                })
                const treeNodes: INode[] = []
                json.actions.forEach(a => {
                    setByPath(treeNodes, a.path!.join("."), a)
                })
                set({ actions: treeNodes })

            } catch (error) {
                console.error(error)
                set({
                    statusFetchingFlows: {
                        isLoading: false,
                        isError: true
                    }
                })
            }
        }
    },
    setChangesToSave: (changes: boolean) => {
        set({ changesToSave: changes })
    },
    setActions: (actions: INode[]) => {
        set({ actions })
    },
    addActionToDelete: (action: INode) => {
        const actionsToDelete = get().actionsToDelete;
        actionsToDelete.push(action)
        set({ actionsToDelete })
    }
})