import { ReactNode } from "react";
import { Content, Layout, Sider } from "@/components/antd";

type TopicsLayoutProps = {
    children: ReactNode;
}

export default function TopicsLayout(props: TopicsLayoutProps) {
    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            {/* <Sider
                width={300}
                style={{
                    background: 'white'
                }}
            >
                <WebChat />
            </Sider> */}
            <Content>
                {props.children}
            </Content>
        </Layout>
    );
}