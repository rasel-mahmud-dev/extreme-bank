import { FC, HTMLAttributes, ReactNode } from "react";
import "./button.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    variant?: "list" | "";
    disabled?: boolean
    type?: "button" | "submit";
}

const Button: FC<Props> = (props) => {
    const { children, className = "", disabled, variant, ...attr } = props;

    return (
        <button {...attr} className={`btn ${variant === "list" ? "btn-list" : "shadow-bg-md"} ${disabled ? "btn-disabled": ""} ${className}`}>
            {children}
        </button>
    );
};

export default Button;