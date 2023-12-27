import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog"
import { NewAdaptiveDialogDTO } from "../../app/api/adaptive-dialogs/route"

export interface DialogSlice {
    adaptiveDialogs: IAdaptiveDialog[]
    statusFetchingAdaptiveDialogs: {
        isLoading: boolean
        isError: boolean
    },
    getAdaptiveDialogs: (botVersionId: string) => Promise<void>
    deepAdaptiveDialogs: IAdaptiveDialog[]
    setDeepAdaptiveDialogs: (adaptiveDialogs: IAdaptiveDialog[]) => void
    saveAdaptiveDialog: (newAdaptiveDialogDTO: NewAdaptiveDialogDTO) => Promise<IAdaptiveDialog>;
    setAdaptiveDialogsOnBot: () => Promise<void>
    updateAdaptiveDialog: (adaptiveDialog: IAdaptiveDialog) => Promise<void>
    deleteAdaptiveDialog: (adaptiveDialogId: string) => Promise<void>
}

export const createDialoglice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    DialogSlice
> = (set, get) => ({
    adaptiveDialogs: [],
    deepAdaptiveDialogs: [],
    statusFetchingAdaptiveDialogs: {
        isLoading: false,
        isError: false
    },
    getAdaptiveDialogs: async (botVersionId: string) => {
        set({
            statusFetchingAdaptiveDialogs: {
                isLoading: true,
                isError: false
            }
        })
        try {
            const response = await fetch(`/api/adaptive-dialogs?botVersionId=${botVersionId}`)
            const json = await response.json()

            set({
                statusFetchingAdaptiveDialogs: {
                    isLoading: false,
                    isError: false
                }
            })

            set({ adaptiveDialogs: json.adaptive_dialogs })
            set({ deepAdaptiveDialogs: json.adaptive_dialogs })
        } catch (error) {
            console.error(error)
            set({
                statusFetchingAdaptiveDialogs: {
                    isLoading: false,
                    isError: true
                }
            })
        }
    },
    setDeepAdaptiveDialogs: (adaptiveDialogs: IAdaptiveDialog[]) => {
        set({ deepAdaptiveDialogs: adaptiveDialogs })
    },
    saveAdaptiveDialog: async (newAdaptiveDialogDTO: NewAdaptiveDialogDTO) => {
        const response = await fetch('/api/adaptive-dialogs', {
            method: 'POST',
            body: JSON.stringify({
                botVersionId: newAdaptiveDialogDTO.botVersionId,
                id: newAdaptiveDialogDTO.id
            })
        })

        const data = await response.json()
        return data.adaptive_dialog
    },
    setAdaptiveDialogsOnBot: async () => {
        const adaptiveDialogIds = get().adaptiveDialogs.map(a => a._id)

        const response = await fetch('/api/adaptive-dialogs/set-to-bot', {
            method: 'POST',
            body: JSON.stringify({
                adaptiveDialogIds
            })
        })

        const data = await response.json()
        return data.adaptive_dialog
    },
    updateAdaptiveDialog: async (adaptiveDialog: IAdaptiveDialog) => {
        const response = await fetch('/api/adaptive-dialogs', {
            method: 'PUT',
            body: JSON.stringify({
                adaptiveDialog
            })
        })

        const data = await response.json()
        return data.adaptive_dialog
    },
    deleteAdaptiveDialog: async (adaptiveDialogId: string) => {
        console.log(adaptiveDialogId)
        const response = await fetch(`/api/adaptive-dialogs/${adaptiveDialogId}`, {
            method: 'DELETE'
        })

        const data = await response.json()
        if (response.ok) {
            return data.adaptive_dialog
        }

        throw new Error(data.message)
    }
})