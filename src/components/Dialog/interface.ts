import { ReactNode } from "react";

export default interface IProps {
    open: boolean;
    title?: string;
    content?: string;
    submitBtn?: string;
    onCancel?: () => void;
    onSubmit?: () => void;
    children?: ReactNode;
}
