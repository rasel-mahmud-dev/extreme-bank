import {FC, ReactNode} from "react";
import "./button.scss";

interface Props{
    className?: string
    children?: ReactNode
}

const Button: FC<Props> = (props) => {
    const {children, className, ...attr} = props
    return (
        <button {...attr} className={`btn ${className}`}>
        {children}
      </button>
    );
};

export default Button;