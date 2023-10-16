"use client"
import TopicsHeader from "@/components/topics-header";
import { Card } from "@/components/antd";

import dynamic from 'next/dynamic'
const FlowTree = dynamic(() => import("@/components/flow-tree"), { ssr: false })

type TopicsVersionWrapperProps = {
    botVersionId: string
};

export default function TopicsWrapper({ botVersionId }: TopicsVersionWrapperProps) {
    return (
        <>
            <TopicsHeader
                botVersionId={botVersionId}
            />
            <Card>
                <FlowTree
                    botVersionId={botVersionId}
                />
            </Card>
        </>
    );
}