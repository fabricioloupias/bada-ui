import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { IBot } from "../../interfaces/IBot"

export interface BotSlice {
    bots: IBot[]
    botSelected: IBot | null
    statusFetchingBots: {
        isLoading: boolean
        isError: boolean
    }
    setBots: (bots: IBot[]) => void
    setBotSelected: (botId: string) => void
    getBotSelected: () => IBot | null
    getBots: () => Promise<void>
}

export const createBotSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    BotSlice
> = (set, get) => ({
    botSelected: null,
    bots: [],
    statusFetchingBots: {
        isLoading: false,
        isError: false
    },
    setBots(bots) {
        set(() => ({ bots }))
    },
    getBots: async () => {
        set({
            statusFetchingBots: {
                isLoading: true,
                isError: false
            }
        })
        try {
            const response = await fetch('/api/bots')
            const data = await response.json()
            set({
                statusFetchingBots: {
                    isLoading: false,
                    isError: false
                }
            })
            set({ bots: data.bots })

        } catch (error) {
            console.error(error)
            set({
                statusFetchingBots: {
                    isLoading: false,
                    isError: true
                }
            })
        }
    },
    setBotSelected(botId: string) {
        const Ibot = get().bots.find(b => b._id === botId)
        if (Ibot) {
            set((state) => ({ ...state, botSelected: Ibot }))
        }
    },
    getBotSelected() {
        console.log('state', get().botSelected)
        return get().botSelected
    },
})