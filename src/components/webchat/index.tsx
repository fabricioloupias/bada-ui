"use client"

import Script from "next/script"
import { Button, Card, Input, Modal } from "@/components/antd"
import { useBoundStore } from "../../store"
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { createDirectLine, createStore } from "botframework-webchat";

const ReactWebChat = dynamic(
    () => {
        return import('botframework-webchat');
    },
    { ssr: false }
);

export default function WebChat() {
    const botServiceUrl = useBoundStore(state => state.botServiceUrl);
    const setBotServiceUrl = useBoundStore(state => state.setBotServiceUrl);

    const [botServiceUrlInput, setBotServiceUrlInput] = useState<string>("");
    const [store, setStore] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [directLine, setDirectLine] = useState<any>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setBotServiceUrl(botServiceUrlInput)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //@ts-ignore
    const st = createStore({}, ({ dispatch }) => next => action => {
        return next(action);
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBotServiceUrlInput(value)
        setDirectLine(createDirectLine({
            secret: '',
            token: '',
            domain: value,
            webSocket: false
        } as any))
    };

    useEffect(() => {
        setStore(st)
    }, [directLine]);

    if (!botServiceUrl) {
        return (
            <>
                <Button type="primary" onClick={showModal}>
                    Conectar a bot
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input
                        onChange={handleInputChange}
                        placeholder="Setear url de servicio"
                    />
                </Modal>
            </>
        )
    }

    if (directLine) {
        return (
            <>
                <Card
                    bodyStyle={{
                        height: '100%',
                        padding: 0
                    }}
                    style={{
                        height: '95%'
                    }}>
                    <ReactWebChat
                        store={store}
                        directLine={directLine}
                    />
                </Card>
            </>
        )
    }

    return null
}