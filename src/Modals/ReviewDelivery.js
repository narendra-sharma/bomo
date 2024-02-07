import React from 'react'
import { Modal } from 'react-bootstrap';

const ReviewDelivery = ({show,handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="px-4 py-4">
            <h1> Great News! </h1>
            </div>
        </Modal.Body>
    </Modal>
    )
}

export default ReviewDelivery;