import { Drawer } from "antd";
import { useContext } from "react";
import { BuilderContext, IDrawerComponent, NodeContext } from "react-flow-builder";

const DrawerComponent = (props: IDrawerComponent) => {
    const { visible, children, ...restProps } = props;
    const { selectedNode: node } = useContext(BuilderContext);

    return (
        <Drawer
            open={visible}
            {...restProps}
            title={`${node?.name} propiedades`}
        >
            {children}
        </Drawer >
    );
};

export { DrawerComponent }