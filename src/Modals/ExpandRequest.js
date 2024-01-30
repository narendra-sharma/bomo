import React from 'react'
import { Modal } from 'react-bootstrap';

const ExpandRequest = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="xl" className="view-as-customer-popup">
            <Modal.Body>
                <div className="row mb-3">
                    <div className="col-md-12 col-12">
                        <p className="text-center">
                            Expand Request
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default ExpandRequest;
