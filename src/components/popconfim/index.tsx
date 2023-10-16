import { Popconfirm } from "antd";

const PopconfirmComponent = (props: any) => {
    const { children, ...restProps } = props;
    return (
        <Popconfirm
            {...restProps}
        >
            {children}
        </Popconfirm>
    );
};

export { PopconfirmComponent }