"use client"
import { Space, Button } from '@/components/antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBoundStore } from '@/store';

type VersionActionsProps = {
    botId: string
};

export default function VersionActions({ botId }: VersionActionsProps) {
    const {
        createVersion
    } = useBoundStore((state) => state)

    return (
        <Space wrap>
            <Button
                type='text'
                onClick={() => createVersion(botId)}
                icon={<PlusOutlined />}
            >
                Nueva versión
            </Button>
        </Space>
    )
}