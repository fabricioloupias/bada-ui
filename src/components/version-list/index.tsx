"use client"
import { Button, Space, Table, Text } from "@/components/antd";
import type { ColumnsType } from 'antd/es/table';
import { useBoundStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";
import { IBotVersion } from "../../interfaces/IBotVersion";
import { Add16Filled, Open16Filled } from "@fluentui/react-icons";

type VersionListProps = {
    botId: string
};

export default function VersionList({ botId }: VersionListProps) {
    const {
        botVersions,
        getBotVersions,
        createVersion
    } = useBoundStore((state) => state)

    const newVersionFrom = (fromVersionId: string) => {
        createVersion(botId, fromVersionId)
    }

    const columns: ColumnsType<IBotVersion> = [
        {
            title: 'Version',
            key: 'version',
            render: (_, { _id, version }) => (
                <Space size={3}>
                    <Text style={{
                        marginRight: 5
                    }}> {version}</Text>
                    <Button
                        type="link"
                        size="small"
                        href={`/versions/${_id}/topics`}
                        icon={<Open16Filled />}
                    >
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => newVersionFrom(_id!)}
                        icon={<Add16Filled />}
                    >
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Creada por',
            dataIndex: 'createdBy',
        },
        {
            title: 'Publicado por',
            dataIndex: 'publishedBy',

        },
        {
            title: 'Borrador?',
            dataIndex: 'isDraft',
            render: (_, { isDraft }) => (
                <>{isDraft ? "Si" : "No"}</>
            ),
        },
        {
            title: 'Fecha publicacion',
            dataIndex: 'publishedAt',
        },
        {
            title: 'Publicar',
            key: 'publish',
            render: (_, { _id }) => (
                <Space size="middle">
                    <Button>
                        Certificación
                    </Button>
                    <Button>
                        Producción
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getBotVersions(botId)
    }, [botId, getBotVersions])

    return (
        <>
            <Table
                columns={columns}
                dataSource={botVersions}
                rowKey="_id"
            />
        </>
    )
}
