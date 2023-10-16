import { ReactNode } from "react";
import { Content, Layout, Sider, Title } from "@/components/antd";

type BotIdLayoutProps = {
    children: ReactNode;
}

export default function BotIdLayout(props: BotIdLayoutProps) {
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