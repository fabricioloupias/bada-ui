import { IAdaptiveDialog } from "@/interfaces/IAdaptiveDialog";
import { EditableNode } from "./crud-tree-antd";

export const deleteTreeNode = (
    tree: IAdaptiveDialog[],
    node: EditableNode
) => {
    const parentIndex = tree.findIndex((el) => el._id === node.id);

    if (parentIndex !== -1) {
        tree.splice(parentIndex, 1);
        return;
    }

    deleteNestedNode(tree, node);
};

const deleteNestedNode = (
    tree: IAdaptiveDialog[],
    nodeToDelete: EditableNode
) => {
    for (let i = 0; i < tree.length; i++) {
        let node = tree[i];

        if (!node.triggers) {
            continue;
        }

        if (node.triggers.some((item) => item._id === nodeToDelete.id)) {
            node.triggers = node.triggers.filter((el) => el._id !== nodeToDelete.id);
            return;
        }
    }
};