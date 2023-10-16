import { Title } from "@/components/antd"

import dynamic from 'next/dynamic'
const BotList = dynamic(() => import("@/components/bot-list"), { ssr: false })

function BotsPage() {
    return (
        <>
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