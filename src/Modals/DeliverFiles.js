import React from "react";
import { Modal } from "react-bootstrap";

const DeliverFiles = ({show,onClose}) => {
    return (
        <Modal show={show} onHide={onClose} size="xl" className="logout-popup">
            <Modal.Body>
                <h1>Congratulation</h1>
                <button>Get My files</button>
            </Modal.Body>
        </Modal>
    )
}

export default DeliverFiles;
