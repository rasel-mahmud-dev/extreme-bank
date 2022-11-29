import {FC, HTMLAttributes, ReactNode} from "react";
import "./button.scss";

interface Props extends HTMLAttributes<HTMLButtonElement>{
    className?: string
    children?: ReactNode
    variant?: "list" | ""
}

const Button: FC<Props> = (props) => {
    const {children, className="", variant,...attr} = props


    return (
        <button {...attr} className={`btn ${variant === "list" ? "btn-list" : "shadow-bg-md"} ${className}`}>
        {children}
      </button>
    );
};

export default Button;