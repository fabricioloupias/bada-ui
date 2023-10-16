import { Content } from "@/components/antd";
import dynamic from 'next/dynamic'

const TopicsWrapper = dynamic(() => import("@/components/topics-wrapper"), { ssr: false })



export default function TopicsPage() {
    return (
        <>
            <Content
                style={{
                    padding: 20
                }}>
                <TopicsWrapper
                
                />
                {/* <Publish /> */}
                {/* <TreeComponent /> */}
            </Content>
        </>
    );
}