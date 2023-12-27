import { StateCreator } from "zustand"
import { BoundStoreType } from ".."
import { persist } from "zustand/middleware";

export interface WebchatSlice {
    botServiceUrl: string | null;
    setBotServiceUrl: (botServiceUrl: string) => void;
    store: any;
    setStore: (store: any) => void
}

export const createWebchatSlice: StateCreator<
    BoundStoreType,
    [],
    [['zustand/persist', unknown]],
    WebchatSlice
> = persist((set, get) => ({
    botServiceUrl: null,
    setBotServiceUrl: (botServiceUrl: string) => {
        set({ botServiceUrl })
    },
    setStore: (store) => {
        console.log(store)
        set(() => ({ store: JSON.stringify(store) }))
    },
    store: null
}), {
    name: "store-webchat"
})