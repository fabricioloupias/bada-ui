import { Popconfirm } from "antd";
import { useContext } from "react";
import { BuilderContext, NodeContext, useAction } from "react-flow-builder";

const PopconfirmComponent = (props: any) => {
    const { children, onConfirm, ...restProps } = props;
    const { onRemoveNodeSuccess } = useContext(BuilderContext);
    const node = useContext(NodeContext);
    const { removeNode } = useAction();

    return (
        <Popconfirm
            style={{
                width: 180
            }}
            title={"Eliminar nodo"}
            description={"Querés remover esta acción?"}
            cancelText="Cancelar"
            onConfirm={() => {
                removeNode(node);
                onRemoveNodeSuccess?.(node);
            }}
        >
            {children}
        </Popconfirm>
    );
};

export { PopconfirmComponent }