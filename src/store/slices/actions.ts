import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { setByPath } from "../../utils"
import { INode } from "react-flow-builder"
import { IAction } from "../../interfaces/IAction"
import * as uuid from 'uuid';

export interface ActionsSlice {
    actions: INode[],
    actionsToSave: INode[]
    actionsToUpdate: INode[]
    statusFetchingFlows: {
        isLoading: boolean
        isError: boolean
    },
    getActions: ({ triggerId }: { triggerId: string }) => Promise<void>
    addActionToSave: (action: INode) => void
    addActionToUpdate: (action: INode) => void
    onChangeAction: (action: INode) => void
    saveActionsUnsaved: (actions: INode[]) => void
    changesToSave: boolean
    setChangesToSave: (changes: boolean) => void
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
    actionsToSave: [],
    actionsToUpdate: [],
    statusFetchingFlows: {
        isLoading: false,
        isError: false
    },
    saveActionsUnsaved: async (actions: INode[]) => {
        try {
            const response = await fetch(`/api/actions`, {
                method: 'POST',
                body: JSON.stringify({
                    actionsToSave: actions
                })
            })

            const json = await response.json();
            return json
        } catch (error) {
            console.error('saveActionsUnsaved', error)
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
                const json = await response.json() as { actions: IAction[] }

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
    addActionToSave: (action: INode) => {
        const actionsToSave = get().actionsToSave
        actionsToSave.push(action)

        set({ actionsToSave })
        set({ changesToSave: true })
    },
    addActionToUpdate: (action: INode) => {
        const actionsToSave = get().actionsToSave
        actionsToSave.push(action)

        set({ actionsToSave })
    },
    onChangeAction: (action: INode) => {
        const actionsToSave = get().actionsToSave
        actionsToSave.push(action)

        set({ actionsToSave })
    },
    setChangesToSave: (changes: boolean) => {
        set({ changesToSave: changes })
    }
})