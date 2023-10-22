import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { ITrigger } from "../../interfaces/ITrigger"
import { NewTriggerDTO } from "../../app/api/triggers/route";

export interface TriggersSlice {
    triggersToSave: ITrigger[],
    saveTrigger: (triggerDTO: NewTriggerDTO) => Promise<ITrigger>;
    deleteTrigger: (triggerId: string) => Promise<void>
}

export const createTriggersSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    TriggersSlice
> = (set, get) => ({
    triggersToSave: [],
    saveTrigger: async (triggerDTO: NewTriggerDTO) => {
        try {
            const response = await fetch('/api/triggers', {
                method: 'POST',
                body: JSON.stringify({
                    adaptiveDialogId: triggerDTO.adaptiveDialogId,
                    $kind: triggerDTO.$kind,
                    intent: triggerDTO.intent
                })
            })

            const data = await response.json()
            return data.trigger
        } catch (error) {
            console.error(error)
        }
    },
    deleteTrigger: async (triggerId: string) => {
        try {
            await fetch(`/api/triggers/${triggerId}`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.error(error)
        }
    }
})