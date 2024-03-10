import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { IAdaptiveDialog } from "../../interfaces/IAdaptiveDialog"
import { NewAdaptiveDialogDTO } from "../../app/api/adaptive-dialogs/route"
import { checkEnvironment } from "@/utils/checkenvironment"

export interface DialogSlice {
    adaptiveDialogs: IAdaptiveDialog[]
    statusFetchingAdaptiveDialogs: {
        isLoading: boolean
        isError: boolean
    },
    getAdaptiveDialogs: (botVersionId: string) => Promise<IAdaptiveDialog[]>
    deepAdaptiveDialogs: IAdaptiveDialog[]
    setDeepAdaptiveDialogs: (adaptiveDialogs: IAdaptiveDialog[]) => void
    saveAdaptiveDialog: (newAdaptiveDialogDTO: NewAdaptiveDialogDTO) => Promise<IAdaptiveDialog>;
    setAdaptiveDialogsOnBot: (urlBot: string) => Promise<void>
    updateAdaptiveDialog: (adaptiveDialog: IAdaptiveDialog) => Promise<void>
    deleteAdaptiveDialog: (adaptiveDialogId: string) => Promise<void>
    exportVersion: () => Promise<void>

}

export const createDialoglice: StateCreator<
    BoundStoreType,
    [],
    [],
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
            const response = await fetch(`${checkEnvironment()}/api/adaptive-dialogs?botVersionId=${botVersionId}`)
            const json = await response.json()

            set({
                statusFetchingAdaptiveDialogs: {
                    isLoading: false,
                    isError: false
                }
            })

            set({ adaptiveDialogs: json.adaptive_dialogs }) //TODO: sacar
            set({ deepAdaptiveDialogs: json.adaptive_dialogs })//TODO: sacar
            return json.adaptive_dialogs
        } catch (error) {
            console.error(error)
            set({
                statusFetchingAdaptiveDialogs: {
                    isLoading: false,
                    isError: true
                }
            })
            return []
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
    setAdaptiveDialogsOnBot: async (urlBot: string) => {
        const adaptiveDialogIds = get().adaptiveDialogs.map(a => a._id)

        const response = await fetch('/api/adaptive-dialogs/set-to-bot', {
            method: 'POST',
            body: JSON.stringify({
                adaptiveDialogIds,
                urlBot
            })
        })

        const data = await response.json()
        return data
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
        const response = await fetch(`/api/adaptive-dialogs/${adaptiveDialogId}`, {
            method: 'DELETE'
        })

        const data = await response.json()
        if (response.ok) {
            return data.adaptive_dialog
        }

        throw new Error(data.message)
    },
    exportVersion: async () => {
        const adaptiveDialogIds = get().adaptiveDialogs.map(a => a._id)

        const response = await fetch('/api/adaptive-dialogs/export-version', {
            method: 'POST',
            body: JSON.stringify({
                adaptiveDialogIds,
            })
        })

        const data = await response.json()
        console.log(JSON.stringify({
            dialogs: data.data
        }))
        return data
    },
})