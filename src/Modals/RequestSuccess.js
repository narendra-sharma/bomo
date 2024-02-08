import React from 'react'
import { Modal } from 'react-bootstrap';
import pay_success from '../images/pay_success.png';

const RequestSuccess = ({view,viewClose,datadetail,requestdata}) => {
    return (
        <Modal show={view} onHide={viewClose} className="logout-popup">
            <Modal.Body>
                <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <h5 className="mb-0 fw-bold ">{datadetail?.name}, you succesfully created</h5>
                    <h5 className="mb-2">{requestdata?.requestName}</h5>
                    <p className="">
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
