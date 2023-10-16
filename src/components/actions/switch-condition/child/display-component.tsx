import { NodeContext } from "react-flow-builder";
import { useContext } from "react";
import { Card, Space, Tag, Typography } from "antd";

const { Text } = Typography;

const SwitchConditionChildDisplay = () => {
    const node = useContext(NodeContext);
    const isFirstNode = node.path && node.path[node.path.length - 1] == "0"
    return (
        <>
            <Card
                size="small"
                style={{
                    minWidth: '150px'
                }}
                title={isFirstNode ? 'Por defecto' : 'Otro caso'}
            >
                {node.data?.value
                    ?
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%'
                        }}
                    >

                        <Text strong>Valor del caso</Text>
                        <Text code>{node.data?.value}</Text>
                    </Space>
                    :
                    <Tag
                        style={{
                            width: '100%'
                        }}
                        color="gold"
                    >
                        Agregar caso valor
                    </Tag>
                }
            </Card>
        </>
    );
};

export { SwitchConditionChildDisplay }