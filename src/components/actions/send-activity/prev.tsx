import { Card, Input, Tag, Typography } from 'antd';
import { ChangeEvent, useContext } from "react";
import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { SendActivityNode, primaryColor } from '.';
import { Title } from '../../antd';

const { Paragraph } = Typography;

export default function SendActivityPrevDisplay() {

    return (
        <>
            <Title
                level={5}
                style={{
                    margin: 0
                }}
            >
                Nodo mensaje
            </Title>
            <Paragraph>
                <pre>¡Hola! Soy *BADA* un asistente virtual oculto, y estoy acá para ayudarte en lo que necesites. ¿En qué puedo asistirte hoy?</pre>
            </Paragraph>
        </>
    );
};
