import { create } from "zustand";
import { BotSlice, createBotSlice } from "./slices/bot";
import { BotVersionSlice, createBotVersionSlice } from "./slices/bot-version";
import { persist } from "zustand/middleware";
import { DialogSlice, createDialoglice } from "./slices/dialogs";
import { ActionsSlice, createActionsSlice } from "./slices/actions";
import { WebchatSlice, createWebchatSlice } from "./slices/webchat";
import { TriggersSlice, createTriggersSlice } from "./slices/triggers";

// agregar cada slice
export type BoundStoreType = BotSlice & BotVersionSlice & DialogSlice & ActionsSlice & WebchatSlice & TriggersSlice;

export const useBoundStore = create<BoundStoreType>()(
    (...a) => ({
        ...createBotSlice(...a),
        ...createBotVersionSlice(...a),
        ...createDialoglice(...a),
        ...createActionsSlice(...a),
        ...createWebchatSlice(...a),
        ...createTriggersSlice(...a),
    })
)