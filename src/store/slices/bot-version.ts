import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { IBotVersion } from "../../interfaces/IBotVersion"
import { v4 as uuidV4 } from "uuid"

export interface BotVersionSlice {
    botVersions: IBotVersion[]
    statusFetchingFlows: {
        isLoading: boolean
        isError: boolean
    },
    botVersionSelected: IBotVersion | null
    setVersionSelected: (version: string) => Promise<void>
    getBotVersions: (botId: string) => Promise<void>
    createVersion: (botId: string) => Promise<void>
}

export const createBotVersionSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    BotVersionSlice
> = (set, get) => ({
    botVersions: [],
    statusFetchingFlows: {
        isLoading: false,
        isError: false
    },
    botVersionSelected: null,
    getBotVersions: async (botId: string) => {
        set({
            statusFetchingFlows: {
                isLoading: true,
                isError: false
            }
        })
        try {
            const response = await fetch(`/api/bot-versions?botId=${botId}`)
            const json = await response.json()

            set({
                statusFetchingFlows: {
                    isLoading: false,
                    isError: false
                }
            })
            set({ botVersions: json.bot_versions })

        } catch (error) {
            console.error(error)
            set({
                statusFetchingFlows: {
                    isLoading: false,
                    isError: true
                }
            })
        }
    },
    setVersionSelected: async (versionId: string) => {
        const botVersionSelected = get().botVersionSelected

        if (botVersionSelected?._id?.toString() !== versionId) {
            try {
                const response = await fetch(`/api/bot-versions/${versionId}`)
                const json = await response.json()
                set((state) => ({ ...state, botVersionSelected: json.bot_version }))
            } catch (error) {
                set((state) => ({ ...state, botVersionSelected: null }))
            }
        }
    },
    createVersion: async (botId: string) => {
        // const botVersions = get().botVersions.sort((a, b) => a.version - b.version);
        // console.log(botVersions)
        // const newVersion = {
        //     _id: uuidV4(),
        //     botId: botVersionSelected!._id!,
        //     isDraft: true,
        //     version: 999999,
        //     adaptiveDialogs: [],
        // }
        // set((state) => ({ botVersions: [...state.botVersions, newVersion] }))

        try {
           await fetch(`/api/bot-versions`, {
                method: 'post',
                body: JSON.stringify({
                    botId,
                    userId: 'cliente'
                })
            })

            get().getBotVersions(botId)
        } catch (error) {
            console.error(error)
        }
    }
})