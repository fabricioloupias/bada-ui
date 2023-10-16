import { NodeContext } from "react-flow-builder";
import { NodeCard } from "@/components/node-card";
import { BoxPlotTwoTone, MessageTwoTone } from '@ant-design/icons';
import { useContext } from "react";
import { Tag } from "antd";

const IfConditionChildDisplay = () => {
    const node = useContext(NodeContext);
    const isFirstNode = node.path && node.path[node.path.length - 1] == "0"

    return (
        <>
            {isFirstNode
                ?
                <Tag>
                    Acciones para verdadero
                </Tag>
                :
                <Tag>
                    Acciones para falso
                </Tag>
            }
        </>
    );
};

export { IfConditionChildDisplay }