import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { IBot } from "../../interfaces/IBot"
import { checkEnvironment } from "@/utils"

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
    getBots: () => Promise<IBot[]>
    createBot: (bot: IBot) => Promise<void>
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
            const response = await fetch(`${checkEnvironment()}/api/bots`, {
                cache: "no-store",
            })
            const data = await response.json()
            set({
                statusFetchingBots: {
                    isLoading: false,
                    isError: false
                }
            })
            set({ bots: data.bots })

            return data.bots

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
    createBot: async (bot: IBot) => {
        const response = await fetch(`${checkEnvironment()}/api/bots`, {
            method: 'POST',
            body: JSON.stringify(bot),
        })

        if (!response.ok) {
            throw new Error("Error al crear bot")
        }
    }
})