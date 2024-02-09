import React from "react";
import { Modal } from "react-bootstrap";

const FeedBackSubmit = ({show,handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <h1>FeedBack Form</h1>
            </Modal.Body>
        </Modal>
    )
}
export default FeedBackSubmit;
