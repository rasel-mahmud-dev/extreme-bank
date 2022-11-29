import React, { FC, HTMLAttributes, useEffect } from "react";
import "./style.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose?: () => void;
}

const Modal: FC<Props> = (props) => {
    const { className = "", isOpen = false, onClose, title, children } = props;

    return (
        <div className={`modal ${isOpen ? "modal-show" : ""}`}>
            <div className="modal-backdrop cursor-pointer" onClick={onClose}></div>

            <div className={`modal-box relative ${className}`}>
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export default Modal;
