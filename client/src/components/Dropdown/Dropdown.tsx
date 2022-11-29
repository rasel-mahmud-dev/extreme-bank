import React, { FC, ReactNode } from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./style.scss";

type Props = {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
    className?: string;
};

const Dropdown: FC<Props> = ({ isOpen, children, className = "", onClose }) => {
    return (
        <>
            <Backdrop isOpen={isOpen} className="!z-40 !bg-transparent !backdrop-blur-0 " onClose={onClose} />
            <div className={`dropdown ${isOpen ? "dropdown-open" : ""} ${className}`}>{children}</div>
        </>
    );
};

export default Dropdown;
