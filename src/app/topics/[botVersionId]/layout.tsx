import { ReactNode } from "react";
import { Content, Layout, Sider, Title } from "@/components/antd";
import dynamic from "next/dynamic";

const WebChat = dynamic(() => import("@/components/webchat"), { ssr: false })

type VersionLayoutProps = {
    children: ReactNode;
}

export default function VersionLayout(props: VersionLayoutProps) {
    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            <Sider
                width={330}
                style={{
                    background: 'white',
                    padding: 20
                }}
            >
                <Title style={{
                    marginTop: 0
                }} level={4}>Test chatbot</Title>
                <WebChat />
            </Sider>
            <Content
                style={{
                }}>
                {props.children}
            </Content>
        </Layout>
    );
}