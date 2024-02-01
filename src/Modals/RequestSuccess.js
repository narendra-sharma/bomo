import React from 'react'
import { Modal } from 'react-bootstrap';
import pay_success from '../images/pay_success.png';

const RequestSuccess = ({view,viewClose,datadetail,requestdata}) => {
    return (
        <Modal show={view} onHide={viewClose}>
            <Modal.Body>
                <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">{datadetail?.name},you succesfully created</h5>
                    <h6 className="mb-5 text-dark">{requestdata?.requestName}</h6>
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

export default RequestSuccess;
