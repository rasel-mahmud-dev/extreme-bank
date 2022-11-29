import React, { FC, ReactNode } from "react";
import Modal from "components/Modal/Modal";
import Loader from "../Loader/Loader";

interface Props {
    onClose?: () => void;
    loading: boolean;
    message: string;
    loadingTitle: string,
    isSuccess: boolean;
}

const ResponseModal: FC<Props> = ({ loadingTitle, loading, message, isSuccess, onClose }) => {
    return (
        <Modal isOpen={loading || !!message} onClose={onClose} className="!top-1/3 max-w-sm">
            {loading && !message ? (
                <div>
                    <p><Loader title={loadingTitle}/></p>
                </div>
            ): !loading && message &&  (
                <h1>{message}</h1>
            )}
        </Modal>
    );
};

export default ResponseModal;
