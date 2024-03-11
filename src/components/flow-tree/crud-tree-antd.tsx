import { Space, Tooltip } from "antd";
import React, { } from "react";
import { DataNode } from "antd/es/tree";
import { Delete16Filled, BoxEditFilled, Edit16Filled } from "@fluentui/react-icons";

export interface EditableNode extends DataNode {
    type?: "addAdaptiveDialog" | "addTrigger" | "trigger" | "adaptiveDialog"
    id: string
}

type EditableTreeTitleProps = {
    node: EditableNode;
    onClickDeleteNode: (node: EditableNode) => void
    onClickEditNode: (node: string) => void
};

export type TEditableTreeTitle = Omit<
    EditableTreeTitleProps,
    "treeData" | "node" | "expandKey"
>;

export const EditableTreeTitle = ({
    node,
    onClickDeleteNode,
    onClickEditNode
}: EditableTreeTitleProps) => {


    if (node['type'] === "addAdaptiveDialog" || node['type'] === "addTrigger") {
        return (
            <>
                {node.title}
            </>
        )
    }

    return (
        <>
            {node.title}
            <Space
                style={{
                    marginLeft: 10
                }}
                size={[6, 0]}
                wrap>
                {
                    node.key === "0-0"
                        ?
                        <Tooltip title="Editar">
                            <Edit16Filled
                                onClick={() => {
                                    onClickEditNode(node.id)
                                }} />
                        </Tooltip>

                        :
                        <Tooltip title="Eliminar">
                            <Delete16Filled
                                onClick={() => {
                                    onClickDeleteNode(node)
                                }} />
                        </Tooltip>
                }
            </Space>
        </>
    );
};