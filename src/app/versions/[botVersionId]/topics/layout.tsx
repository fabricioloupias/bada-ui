import { ReactNode } from "react";
import { Content, Layout } from "@/components/antd";
import dynamic from "next/dynamic";

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
                    padding: 20
                }}>
                {props.children}
            </Content>
        </Layout>
    );
}