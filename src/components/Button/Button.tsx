
import "./button.scss";
import {FC} from "react";


interface Props{
    className?: string
    children?: JSX.Element
}

const Button: FC<Props> = (props) => {
    const {children, className: a, ...attr} = props
    return (
        <button {...attr} className={`btn ${a}`}>
        {children}
      </button>
    );
};

export default Button;