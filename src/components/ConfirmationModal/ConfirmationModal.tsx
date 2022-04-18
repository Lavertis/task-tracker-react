import React, {FC} from 'react';
import {Button, Modal} from "react-bootstrap";


interface ConfirmationModalProps {
    title: string;
    message: string;
    isShown: boolean;
    confirm: () => void;
    hide: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({title, message, isShown, confirm, hide}) => (
    <Modal show={isShown} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{message}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={confirm}>Delete</Button>
            <Button variant="secondary" onClick={hide}>Cancel</Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmationModal;
