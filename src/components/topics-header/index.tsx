"use client"
import { Button, Col, Row, Title } from "@/components/antd";
import { useBoundStore } from "../../store";
import { useEffect } from "react";

type TopicsHeaderProps = {
    botVersionId: string
};

export default function TopicsHeader({ botVersionId }: TopicsHeaderProps) {
    const {
        setVersionSelected,
        setAdaptiveDialogsOnBot,
        exportVersion
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
        setAdaptiveDialogsOnBot('http://localhost:3978')
    }

    return (
        <Row justify="space-between">
            <Col span={8}>
                <Title style={{
                    marginTop: 0
                }} level={3}>Temas de la versión: {botVersionSelected.version}
                </Title>
            </Col>
            <Col span={4}>
                <Button
                    block
                    onClick={exportVersion}>
                    Exportar
                </Button>
            </Col>
            <Col span={4}>
                <Button
                    block
                    onClick={onSetAdaptiveDialogsOnBot}>
                    Previsualización
                </Button>
            </Col>
        </Row>
    );
}