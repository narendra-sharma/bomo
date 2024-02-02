import React from 'react'
import { Modal } from 'react-bootstrap';
import pay_success from '../images/pay_success.png';

const DeliverSuccess = ({show,handleClose}) => {
    return (
        <Modal show={show}>
            <Modal.Body>
            <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">,you succesfully created</h5>
                    <h6 className="mb-5 text-dark"></h6>
                    <p className="text-mute">
                        We are reviewing the assests,
                        <br />
                       we'll only let you if any layer is missing
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default DeliverSuccess;