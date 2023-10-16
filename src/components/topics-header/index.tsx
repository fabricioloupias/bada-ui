"use client"
import { Button, Title } from "@/components/antd";
import { useBoundStore } from "../../store";
import { useEffect } from "react";

type TopicsHeaderProps = {
    botVersionId: string
};

export default function TopicsHeader({ botVersionId }: TopicsHeaderProps) {
    const { 
        setVersionSelected,
        setAdaptiveDialogsOnBot 
    } = useBoundStore((state) => state)
    const botVersionSelected = useBoundStore((state) => state.botVersionSelected)

    useEffect(() => {
        setVersionSelected(botVersionId)
    }, [botVersionId, setVersionSelected])

    if (!botVersionSelected) {
        return (
            <>
                No hay version seleccionada
            </>
        )
    }

    const onSetAdaptiveDialogsOnBot = () => {
        setAdaptiveDialogsOnBot()
    }

    return (
        <>
            <Title style={{
                marginTop: 0
            }} level={3}>Temas de la versión: {botVersionSelected.version}
            </Title>
            <Button
                onClick={onSetAdaptiveDialogsOnBot}>
                Previsualización
            </Button>
        </>
    );
}