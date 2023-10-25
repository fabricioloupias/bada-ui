import { Avatar, Badge, Card, Space, Typography } from "antd";
import { ReactNode, useContext } from "react";
import { generate as generateColor } from '@ant-design/colors';
import './style.css'
import { BuilderContext } from "react-flow-builder";

const { Title } = Typography;

type NodeCardProps = {
    children: ReactNode;
    title: string;
    icon: ReactNode;
    iconBackground: string;
    nodeId: string,
    isNewFeature?: boolean
}


const NodeCard = (props: NodeCardProps) => {
    const secondaryColor = generateColor(props.iconBackground)[0]
    const { selectedNode: node } = useContext(BuilderContext);

    if (props.isNewFeature) {
        return (
            <Badge.Ribbon
                text="Nuevo"
                color="volcano">
                <Card
                    className={node?.configuring && node.id === props.nodeId ? 'dynamic-bg' : 'null'}
                    headStyle={{
                        padding: 0,
                        minHeight: 'auto'
                    }}
                    title={
                        <Space wrap size={12}>
                            <Avatar
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: secondaryColor,
                                }}
                                size={46}
                                shape="square"
                                icon={
                                    props.icon
                                }
                            />
                            <Title
                                style={{
                                    margin: 0
                                }}
                                level={5}
                            >
                                {props.title}
                            </Title>
                        </Space>
                    }
                    bordered={false}
                    size="small"
                    style={{
                        minWidth: '320px',
                        maxWidth: '320px'
                    }}
                    bodyStyle={{
                        display: !props.children ? "none" : ""
                    }}
                >
                    {props.children}
                </Card>
            </Badge.Ribbon>
        )
    }

    return (
        <Card
            className={node?.configuring && node.id === props.nodeId ? 'dynamic-bg' : 'null'}
            headStyle={{
                padding: 0,
                minHeight: 'auto'
            }}
            title={
                <Space wrap size={12}>
                    <Avatar
                        style={{
                            borderRadius: 0,
                            backgroundColor: secondaryColor,
                        }}
                        size={46}
                        shape="square"
                        icon={
                            props.icon
                        }
                    />
                    <Title
                        style={{
                            margin: 0
                        }}
                        level={5}
                    >
                        {props.title}
                    </Title>
                </Space>
            }
            bordered={false}
            size="small"
            style={{
                minWidth: '320px',
                maxWidth: '320px'
            }}
            bodyStyle={{
                display: !props.children ? "none" : ""
            }}
        >
            {props.children}
        </Card>
    )
};

export { NodeCard }