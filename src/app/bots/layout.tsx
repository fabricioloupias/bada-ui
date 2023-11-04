import { Layout, Content, Header } from '@/components/antd'
import { ReactNode } from 'react';

type BotsLayoutProps = {
    children: ReactNode;
}

export default function BotsLayout(props: BotsLayoutProps) {
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