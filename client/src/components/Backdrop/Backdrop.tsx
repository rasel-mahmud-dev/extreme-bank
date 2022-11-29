import React, { FC, ReactNode } from "react";

import "./backdrop.scss";

type Props = {
    isOpen: boolean;
    className?: string;
    onClose?: ()=>void
};

const Backdrop: FC<Props> = ({ isOpen, className = "", onClose}) => {
    return <div className={`backdrop ${isOpen ? "backdrop-show" : ""} ${className}`} onClick={onClose} />;
};

export default Backdrop;
