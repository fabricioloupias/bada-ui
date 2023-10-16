import { Layout, Content, Header } from '@/components/antd'
import { ReactNode } from 'react';
import BotsActions from '@/components/bot-actions'

type AnalitycsLayoutProps = {
    children: ReactNode;
}

export default function AnalyticsLayout(props: AnalitycsLayoutProps) {
    return (
        <Layout
            style={{
                height: '100%',
            }}
        >
            <Content
            >
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
            </Content>
        </Layout>
    );
}