import { Layout, Content, Header } from '@/components/antd'
import { ReactNode } from 'react';
import BotActions from '@/components/bot-actions'

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
                    <Header
                        style={{
                            background: 'white',
                            padding: '0 20px'
                        }}
                    >
                       <BotActions />
                    </Header>
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