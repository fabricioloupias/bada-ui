"use client"
import { RangePicker, Table, Tabs, Title } from "@/components/antd"
import { Button, Popover, type TabsProps } from 'antd';
import { useEffect, useState } from "react";
import { SendActivityDisplay } from "../../components/actions/send-activity/display-component";


export default function AnalyticsPage() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Temas',
            children: <Tab1 />,
        },
        {
            key: '2',
            label: 'Funnels',
            children: <Tab2 />,
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>
            <Title
                style={{
                }} level={3}
            >
                Analítica
            </Title>
            <RangePicker
                showTime={{
                    hideDisabledOptions: true,
                }}
                format="DD-MM-YYYY HH:mm:ss"
            />
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    )
}

function Tab1() {
    const dataSource = [
        {
            topic: 'Bienvenida',
            invocaciones: '367',
        },
        {
            topic: 'Cambio de plan',
            invocaciones: '123',
        },
        {
            topic: 'Reclamo de facturación',
            invocaciones: '56',
        },
        {
            topic: 'Cierre con encuesta',
            invocaciones: '2',
        },
    ];

    const columns = [
        {
            title: 'Tema',
            dataIndex: 'topic',
        },
        {
            title: 'Total invocaciones',
            dataIndex: 'invocaciones',
        }
    ];

    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}

function Tab2() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState<{ [key: string]: boolean }>({} as { actionId: boolean });

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean, actionId: string) => {
        setVisible({ ...visible, [actionId]: newOpen })
    };

    const dataSource = [
        {
            actionId: 'f6d24d2a-ee44-43f4-a00d-d16a1203e8d1',
            invocaciones: '257',
        },
        {
            actionId: '94d30c9b-4e59-4add-8814-5c2f7fc187a7',
            invocaciones: '103',
        },
        {
            actionId: '90a1580c-2076-40c0-81a6-a0094764e2cf',
            invocaciones: '65',
        },
        {
            actionId: '17ffc3db-a1c9-4778-93c8-d27625d31b95',
            invocaciones: '9',
        },
    ];

    const columns = [
        {
            title: 'ID acción',
            dataIndex: 'actionId',
            render: (_: any, { actionId }: any) => {
                return (<>
                </>)
            }

            ,
        },
        {
            title: 'Total invocaciones',
            dataIndex: 'invocaciones',
        }
    ];

    useEffect(() => {
        dataSource.forEach(d => {
            setVisible({ ...visible, [d.actionId]: false })
        })
    }, [])
    return (
        <>
            <Title
                style={{
                    marginTop: 0
                }} level={3}
            >
                Tema: Bienvenida
            </Title>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}

