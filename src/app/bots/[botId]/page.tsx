import { Content } from "@/components/antd";

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
            <Content
                style={{
                    padding: 20
                }}>
                <VersionList
                    botId={botId}
                />
            </Content>
        </>
    );
}