import { ReactNode } from "react";

export default interface IProps {
    //? reveal modal if it's true
    open: boolean;
    title?: string;
    content?: string;
    submitBtn?: string;
    onCancel?: () => void;
    onSubmit?: () => void;
    children?: ReactNode;
}
