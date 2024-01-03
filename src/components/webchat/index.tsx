"use client"

import Script from "next/script"
import { Button, Card, Col, Input, Modal, Row, Sider, Title } from "@/components/antd"
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
    const {
        botServiceUrl,
        setBotServiceUrl,
        isWebchatOpen
    } = useBoundStore(state => state);

    const [botServiceUrlInput, setBotServiceUrlInput] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [directLine, setDirectLine] = useState<any>(null);
    const [store, setStore] = useState<any>(null);
    const [isChatbotConnected, setIsChatbotConneced] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    //@ts-ignore
    const st = createStore({}, ({ dispatch }) => next => action => {
        if (action.type == "DIRECT_LINE/CONNECT_FULFILLED") {
            setIsChatbotConneced(true)
        }
        if (action.type == "DIRECT_LINE/CONNECT_STILL_PENDING" && !isChatbotConnected) {
            loadChatbot()
        }
        return next(action);
    });


    const handleOk = () => {
        setIsModalOpen(false);
        setBotServiceUrl(botServiceUrlInput)
        loadChatbot()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setBotServiceUrlInput(value)
    };

    const loadChatbot = () => {

        setStore(st)

        setDirectLine(createDirectLine({
            secret: '',
            token: '',
            domain: botServiceUrl,
            webSocket: false
        } as any))
    }

    useEffect(() => {
        loadChatbot()
    }, [botServiceUrl]);

    if (isWebchatOpen) {
        return (
            <Sider
                width={330}
                style={{
                    background: 'white',
                    padding: 20
                }}
            >
                <Row>
                    <Col span={14}>
                        <Title style={{
                            marginTop: 0
                        }} level={4}>Test chatbot</Title>
                    </Col>
                    <Col span={10}>
                        <Button block onClick={showModal}>
                            Conectar a bot
                        </Button>
                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Input
                                onChange={handleInputChange}
                                placeholder="Setear url de servicio"
                            />
                        </Modal>
                    </Col>
                </Row>
                {botServiceUrl && directLine && store
                    ?
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
                        </Card></>
                    :
                    null
                }
            </Sider>
        )
    }

    return null
}