import { Content } from "@/components/antd";

import dynamic from 'next/dynamic'
const TopicsWrapper = dynamic(() => import("@/components/topics-wrapper"), { ssr: false })

type VersionPageProps = {
    params: {
        botVersionId: string
    };
};

export default function VersionPage(props: VersionPageProps) {
    const { botVersionId } = props.params
    return (
        <>
            <Content
                style={{
                    padding: 20
                }}>
                <TopicsWrapper
                    botVersionId={botVersionId}
                />
            </Content>
        </>
    );
}