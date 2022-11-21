import {FC, HTMLAttributes, ReactNode} from "react";
import "./button.scss";

interface Props extends HTMLAttributes<HTMLButtonElement>{
    className?: string
    children?: ReactNode
}

const Button: FC<Props> = (props) => {
    const {children, className, ...attr} = props
    return (
        <button {...attr} className={`btn shadow-bg-md ${className}`}>
        {children}
      </button>
    );
};

export default Button;