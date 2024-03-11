"use client"
import { Button, Space, Table } from "@/components/antd";
import type { ColumnsType } from 'antd/es/table';
import { useBoundStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";
import { IBotVersion } from "../../interfaces/IBotVersion";

type VersionListProps = {
    botId: string
};

export default function VersionList({ botId }: VersionListProps) {
    const versions = useBoundStore((state) => state.botVersions)
    const getBotVersions = useBoundStore((state) => state.getBotVersions)
    const createVersion = useBoundStore((state) => state.createVersion)

    const columns: ColumnsType<IBotVersion> = [
        {
            title: 'Version',
            key: 'version',
            render: (_, { _id, version }) => (
                <Space size="middle">
                    <Link
                        href={`/versions/${_id}/topics`}
                    >
                        {version}
                    </Link>
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
                dataSource={versions}
                rowKey="_id"
            />
        </>
    )
}
