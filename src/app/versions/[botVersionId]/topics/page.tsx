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
            <TopicsWrapper
                botVersionId={botVersionId}
            />
        </>
    );
}