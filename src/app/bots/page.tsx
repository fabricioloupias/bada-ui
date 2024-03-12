import { Header, Title } from "@/components/antd"

import dynamic from 'next/dynamic'
import BotActions from '@/components/bot-actions'
const BotList = dynamic(() => import("@/components/bot-list"), { ssr: false })

async function BotsPage() {
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
            <BotList />
        </>
    )
}

export default BotsPage