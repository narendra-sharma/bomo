import React from "react";
import { Modal } from "react-bootstrap";
import pay_success from '../images/pay_success.png';
import { connect } from "react-redux";

const ApplySuccess = ({ show, handleClose, user, data }) => {
    return (
        <Modal show={show} onHide={handleClose} className="logout-popup">
            <Modal.Body className="border border-dark rounded">
                <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <h5 className="fw-bold mb-3"><span className="d-block">{user?.name},</span>
                   <span className="fw-medium">you have applied to </span> <span className="fw-bold">{data?.request_name}</span></h5>
                    <p>
                        You will be notified via email if selected.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(ApplySuccess);
