"use client"
import { useBoundStore } from "@/store";
import { Button, Card, Result } from "@/components/antd";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useEffect } from "react";

const TopicsVersionHeader = dynamic(() => import("@/components/topics-version-header"), { ssr: false })
const FlowTree = dynamic(() => import("@/components/flow-tree"), { ssr: false })

type TopicsVersionWrapperProps = {
    botVersionId: string
};

export default function TopicsVersionWrapper({ botVersionId }: TopicsVersionWrapperProps) {
    const versionSelected = useBoundStore((state) => state.botVersionSelected)
    const setVersionSelected = useBoundStore(state => state.setVersionSelected)

    useEffect(() => {
        setVersionSelected(botVersionId)
    }, [])

    if (!versionSelected?.version) {
        return (
            <>
                <Result
                    status="warning"
                    title="No hay ningun bot seleccionado"
                    extra={
                        <Link
                            href="/bots"
                        >
                            <Button type="primary" key="console">
                                Ir a Bots
                            </Button>
                        </Link>
                    }
                />
            </>
        )
    }
    return (
        <>
            <TopicsVersionHeader />
            <Card
                style={{
                    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)'
                }}
            >
                <FlowTree />
            </Card>
        </>
    );
}