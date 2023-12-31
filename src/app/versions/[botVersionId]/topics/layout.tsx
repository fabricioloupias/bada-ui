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
            <Content
                style={{
                }}>
                {props.children}
            </Content>
        </Layout>
    );
}