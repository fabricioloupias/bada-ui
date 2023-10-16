import { Popover } from "antd";
import { IPopoverComponent } from "react-flow-builder";

const PopoverComponent = (props: IPopoverComponent) => {
    const { visible, onVisibleChange, children, ...restProps } = props;

    return (
        <Popover
            overlayStyle={{
                width: "200px",
                textAlign: 'left'
            }}
            open={visible}
            onOpenChange={onVisibleChange}
            {...restProps}
        >
            {children}
        </Popover>
    );
};

export { PopoverComponent }