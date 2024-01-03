"use client"

import { Button, Flex } from "@/components/antd"
import { ChatSparkle24Regular } from "@fluentui/react-icons"
import { Tooltip } from "antd"
import { useBoundStore } from "../../store"

export default function MenuHeader() {
    const {
        isWebchatOpen,
        setIsWebchatOpen
    } = useBoundStore(state => state)

    return (
        <>
            <Flex gap="middle" vertical>
                <Tooltip title={isWebchatOpen ? "Ocultar webchat" : "Mostrar webchat"}>
                    <Button
                        type="text"
                        onClick={() => setIsWebchatOpen(!isWebchatOpen)}
                        icon={
                            <ChatSparkle24Regular />
                        } />
                </Tooltip>
            </Flex>
        </>
    )
}