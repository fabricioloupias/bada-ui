import { StateCreator } from "zustand"
import { BoundStoreType } from ".."

export interface WebchatSlice {
    botServiceUrl: string | null;
    setBotServiceUrl: (botServiceUrl: string) => void
}

export const createWebchatSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    WebchatSlice
> = (set, get) => ({
    botServiceUrl: null,
    setBotServiceUrl: (botServiceUrl: string) => {
        set({ botServiceUrl })
    }
})