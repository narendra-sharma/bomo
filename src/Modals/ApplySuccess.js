import React from "react";
import { Modal } from "react-bootstrap";
import pay_success from '../images/pay_success.png';
import { connect } from "react-redux";

const ApplySuccess = ({ show, handleClose, user, data }) => {
    return (
        <Modal show={show} onHide={handleClose} className="logout-popup">
            <Modal.Body>
                <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <span className="fw-bold">{user?.name},</span>
                    <br />
                    <span>you have applied to <span className="fw-bold">{data?.request_name}</span></span>
                    <p className="text-mute">
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
