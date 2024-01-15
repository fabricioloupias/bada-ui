"use client"
import TopicsHeader from "@/components/topics-header";

import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from "react";
import { useBoundStore } from "../../store";
const FlowTree = dynamic(() => import("@/components/flow-tree/index"), { ssr: false })

type TopicsVersionWrapperProps = {
    botVersionId: string
};

export default function TopicsWrapper({ botVersionId }: TopicsVersionWrapperProps) {




    useEffect(() => {
    }, []);

    return (
        <>
            <TopicsHeader
                botVersionId={botVersionId}
            />

            <FlowTree
                botVersionId={botVersionId}
            />
        </>
    );
}