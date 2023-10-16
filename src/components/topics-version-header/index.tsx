"use client"
import { useBoundStore } from "@/store";
import { Title } from "@/components/antd";

export default function TopicsVersionHeader() {
    const versionSelected = useBoundStore((state) => state.botVersionSelected)

    return (
        <>
            <Title style={{
                marginTop: 0
            }} level={3}>Temas</Title>
            <Title style={{
                marginTop: 0
            }} level={5}>Versión: {versionSelected?.version}
            </Title>
        </>
    );
}