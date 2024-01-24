import React from "react";
import { Modal } from "react-bootstrap";


const RequestBrief = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Body>
                    <div className="designer-active-request bg-white px-5 px-md-4 py-5 rounded">
                        <div className="mb-4">
                            <div className="ms-4 mb-3">
                                <h5>Brief Request</h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RequestBrief;


