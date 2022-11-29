import React, { FC, HTMLAttributes } from "react";
import "./style.scss";
import Backdrop from "../Backdrop/Backdrop";

interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose?: () => void;
}

const Modal: FC<Props> = (props) => {
    const { className = "", isOpen = false, onClose, title, children } = props;

    return (
        <div className={`modal ${isOpen ? "modal-show" : ""}`}>

            <Backdrop isOpen={isOpen}  onClose={onClose} />

            <div className={`modal-box relative ${className}`}>
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
            </div>
        </div>
    );
};

export default Modal;
