"use client"
import { ReactNode, useEffect, useState } from "react";
import { Content, Layout, } from "@/components/antd";
import dynamic from "next/dynamic";
import { useBoundStore } from "../../../store";

const WebChat = dynamic(() => import("@/components/webchat"), { ssr: false })

type VersionLayoutProps = {
    children: ReactNode;
}

export default function VersionLayout(props: VersionLayoutProps) {
    const {
        isWebchatOpen,
    } = useBoundStore(state => state)
    const [contentMarginLeft, setContentMarginLeft] = useState(0)

    useEffect(() => {
        if (isWebchatOpen) {
            setContentMarginLeft(330)
        } else {
            setContentMarginLeft(0)
        }
    }, [isWebchatOpen])
    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            <WebChat />
            <Content
                style={{
                    height: '100%',
                    marginLeft: contentMarginLeft
                }}>
                {props.children}
            </Content>
        </Layout>
    );
}