import { Space } from "antd";
import React, {  } from "react";
import { DataNode } from "antd/es/tree";
import { Delete12Filled } from "@fluentui/react-icons";

export interface EditableNode extends DataNode {
    type?: "addAdaptiveDialog" | "addTrigger" | "trigger" | "adaptiveDialog"
    id?: string
}

type EditableTreeTitleProps = {
    node: EditableNode;
    onClickDeleteNode: (node: EditableNode) => void
};

export type TEditableTreeTitle = Omit<
    EditableTreeTitleProps,
    "treeData" | "node" | "expandKey"
>;

export const EditableTreeTitle = ({
    node,
    onClickDeleteNode
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
                <Delete12Filled
                    onClick={() => {
                        onClickDeleteNode(node)
                    }} />
            </Space>
        </>
    );
};