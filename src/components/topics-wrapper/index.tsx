"use client"
import TopicsHeader from "@/components/topics-header";

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from "react";
const FlowTree = dynamic(() => import("@/components/flow-tree/index"), { ssr: false })

type TopicsVersionWrapperProps = {
    botVersionId: string
};

export default function TopicsWrapper({ botVersionId }: TopicsVersionWrapperProps) {
    const [parentHeight, setParentHeight] = useState<number>(0);
    const elementRef = useRef(null);

    useEffect(() => {
    }, []);

    return (
        <>
            <TopicsHeader
                botVersionId={botVersionId}
            />

            <FlowTree
                parentElementHeight={parentHeight}
                botVersionId={botVersionId}
            />
        </>
    );
}