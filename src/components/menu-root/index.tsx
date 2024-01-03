"use client"
import Link from "next/link";
import { Bot20Regular, DataTrending20Regular, Home20Regular, Menu } from '@/components/antd';

export default function MenuRoot() {
    return (
        <Menu
            mode="inline"
            style={{
                height: '100%',
            }}
            items={[
                {
                    key: `sub${1}`,
                    icon: <Home20Regular />,
                    label: <Link href="/" >Home</Link>,
                },
                {
                    key: `sub${4}`,
                    icon: <Bot20Regular />,
                    label: <Link href="/bots" >Chatbots</Link>,
                },
                {
                    key: `sub${3}`,
                    icon: <DataTrending20Regular />,
                    label: <Link href="/analytics" >Analítica</Link>
                }
            ]}
        />
    )
}