"use client"
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Table, Tag } from "@/components/antd"
import { useBoundStore } from '@/store';
import { useEffect } from 'react';
import mongoose from 'mongoose';
import Link from 'next/link';
import { IBot } from '@/interfaces/IBot';

const getColorTag = (type: string) => {
    let color = "";
    switch (type) {
        case "Produccion":
            color = "volcano"
            break;
        case "Certificacion":
            color = "geekblue"
            break;
        default:
            break;
    }

    return color;
}

type BotListProps = {
};

export default function BotList() {
    const {
        bots,
        getBots
    } = useBoundStore((state) => state)
    const botSelected = useBoundStore((state) => state.botSelected)
    const setBotSelected = useBoundStore((state) => state.setBotSelected)
    const statusFetchingBots = useBoundStore((state) => state.statusFetchingBots)

    const selectBot = (id: string) => {
        setBotSelected(id)
        // setFlows(id)
    }

    useEffect(() => {
        getBots()
    }, [getBots])

    const columns: ColumnsType<any> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            render: (_, { type, name, _id }) => (
                <Tag
                    key={`tag${_id}`}
                    color={getColorTag(type)}
                >
                    {type.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Dueño',
            dataIndex: 'owner',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, { _id }) => {
                return (
                    <Space size="middle" key={`space_${_id}`}>
                        <Link
                            href={`bots/${_id}`}
                        >
                            <Button
                                key={`button${_id}`}
                                onClick={() => selectBot(_id)}
                            >
                                Ver
                            </Button>
                        </Link>
                    </Space>
                )
            },
        },
    ];

    if (statusFetchingBots.isError && bots.length === 0) {
        return (<p>Error</p>)
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={bots}
                rowKey="_id"
            />
        </>
    )
}