import { Content, Header, Title } from "@/components/antd";
import VersionActions from "@/components/version-actions";

import dynamic from 'next/dynamic'
const VersionList = dynamic(() => import("@/components/version-list"), { ssr: false })

type VersionPageProps = {
    params: {
        botId: string
    };
};

export default function VersionPage(props: VersionPageProps) {
    const { botId } = props.params
    return (
        <>
            <Header
                style={{
                    background: 'white',
                    padding: '0 20px'
                }}
            >
                <VersionActions
                    botId={botId}
                />
            </Header>
            <Title
                style={{
                }} level={3}
            >
                Versiones
            </Title>
            <VersionList
                botId={botId}
            />
        </>
    );
}