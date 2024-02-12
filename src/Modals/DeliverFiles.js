import React from "react";
import { Modal } from "react-bootstrap";

const DeliverFiles = ({show,onClose}) => {
    return (
        <Modal show={show} onHide={onClose} size="xl" className="logout-popup">
            <Modal.Body>
                <div className="py-5 px-60 rounded">
                    <div className="review-main-content review-delvery-popup p-5 rounded text-center extra-dark-green">
                        <h1 className="extra-dark-green h2 fw-bold mt-3">Congratulation</h1>
                        <h4>Your delivery for <span className="fw-bold">Transition Brand Video </span>
                            <span className="d-block">has been approved and files are ready</span></h4>
                        <div className="my-5 pt-3 pb-4">
                            <button className="review-btn fw-bold rounded-pill px-2" >Get My files</button>
                        </div>
                        <p className="mb-0">Time Share Your Creation!</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeliverFiles;
