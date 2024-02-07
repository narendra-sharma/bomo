import React from 'react'
import { Modal } from 'react-bootstrap';

const ReviewDelivery = ({show,handleClose}) => {
    return (
        <Modal show={show} size="xl" onHide={handleClose} className="logout-popup">
        <Modal.Body>
           <div className="py-5 px-60 rounded">
           <div className="review-main-content review-delvery-popup p-5 rounded text-center extra-dark-green">
                <h1 className="extra-dark-green h2 fw-bold mt-3">Great News!</h1>
                <h4>Your delivery for <span className="fw-bold">Transition Brand Video </span> 
                <span className="d-block">is ready for your review</span></h4>
                <div className="my-5 pt-3 pb-4"><button className="review-btn fw-bold rounded-pill">Review</button></div>
                <p className="mb-0">Delivered on Jan 20th 17:22</p>
            </div>

           </div>
          
        </Modal.Body>
    </Modal>
    )
}

export default ReviewDelivery;