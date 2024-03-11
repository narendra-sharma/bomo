import React from "react";
import { Modal } from "react-bootstrap";
import { get_edit_request_data } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";

const FeedbackSuccess = ({show,handleClose}) => {
    const dispatch = useDispatch();

    const handleNavigate = () => {
        localStorage.removeItem('landscape');
        localStorage.removeItem('portrait');
        dispatch(get_edit_request_data(null));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
            <Modal.Body>
            <div className="py-5 px-60 rounded">
                        <div className="review-main-content review-delvery-popup p-5 rounded text-center extra-dark-green">
                          <span className="fw-bold">Transition Brand Video </span>
                                <span className="d-block">Feedback sent</span>
                            <div className="my-5 pt-3 pb-4">
                                <button className="review-btn fw-bold rounded-pill" onClick={() => {handleNavigate();}}>
                                    Home
                                </button>
                            </div>
                        </div>
                    </div>
            </Modal.Body>
        </Modal>
    )
};

export default FeedbackSuccess;
