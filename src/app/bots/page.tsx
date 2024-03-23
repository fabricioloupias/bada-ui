import { Header, Title } from "@/components/antd"

import dynamic from 'next/dynamic'
import BotActions from '@/components/bot-actions'
import { checkEnvironment } from "@/utils"
import { Suspense } from "react"
import LoadingSkeleton from "@/components/loading-skeleton"
const BotList = dynamic(() => import("@/components/bot-list"), {
    suspense: true,
})

async function getBots() {
    const response = await fetch(`${checkEnvironment()}/api/bots`, {
        cache: "no-store",
    })
    const data = await response.json()

    return data.bots
}

async function BotsPage() {
    const bots = await getBots()
    return (
        <>
            <Header
                style={{
                    background: 'white',
                    padding: '0 20px'
                }}
            >
                <BotActions />
            </Header>
            <Title
                style={{
                }} level={3}
            >
                Chabots
            </Title>
            <Suspense fallback={
                <LoadingSkeleton />
            }>
                <BotList bots={bots} />
            </Suspense>
        </>
    )
}

export default BotsPage