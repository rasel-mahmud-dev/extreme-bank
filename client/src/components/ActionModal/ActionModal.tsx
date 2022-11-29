import React, { FC, ReactNode } from "react";
import Modal from "components/Modal/Modal";

interface Props {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
}

const ActionModal: FC<Props> = ({  isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="!top-1/3 max-w-sm">
            {children}
        </Modal>
    );
};

export default ActionModal;
