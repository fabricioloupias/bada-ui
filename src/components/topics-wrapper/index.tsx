import TopicsHeader from "@/components/topics-header";
import { useBoundStore } from "@/store";

import dynamic from 'next/dynamic'
const FlowTree = dynamic(() => import("@/components/flow-tree/index"), { ssr: false })

type TopicsVersionWrapperProps = {
    botVersionId: string
};

export default async function TopicsWrapper({ botVersionId }: TopicsVersionWrapperProps) {
    const {
        getAdaptiveDialogs,
    } = useBoundStore.getState()

    const adaptiveDialogs = await getAdaptiveDialogs(botVersionId)
    return (
        <>
            <TopicsHeader
                botVersionId={botVersionId}
            />
            {adaptiveDialogs.length > 0
                ?
                <FlowTree
                    botVersionId={botVersionId}
                    adaptiveDialogs={adaptiveDialogs}
                />
                :
                null
            }
        </>
    );
}