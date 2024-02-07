import React from "react";
import { Modal } from "react-bootstrap";

const ConfirmDeliver = ({ isshow, viewClose }) => {
    return (
        <Modal show={isshow} size="xl" onHide={viewClose} className="logout-popup">
            <Modal.Body>
                <div>
                    <h1>Transition Band Video</h1>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default ConfirmDeliver;
