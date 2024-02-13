import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DeliverFiles from "./DeliverFiles";
import { connect, useDispatch } from "react-redux";
import { review_delivery_request_customer_admin } from "../reduxdata/rootAction";
import { SUBMIT_NOW } from "../reduxdata/Requests/requestTypes";

const ReviewSubmit = ({ show, handleClose, details, user, isSubmit}) => {
    const dispatch = useDispatch();
    const [isreview,setIsreview] = useState(false);

    const handleReview = async (e,status) => {
        e.preventDefault();
        const reviewdata = {
            _id: details._id,
            reviewstatus: status,
        };
       await review_delivery_request_customer_admin(dispatch,user?.token,reviewdata);
       setIsreview(true);       
       handleClose();
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
                <Modal.Body className="py-5">
                    <div className="py-5 px-60 ">
                        <div className="review-submit-popup extra-grren rounded my-5 p-5">
                            <h5 className="mb-0 extra-dark-green fw-bold">User,</h5>
                            <p className="extra-dark-green"> Are you satisfied with the delivery?
                                <br />Once approved you won’t be able to ask for further reviews.</p>
                            <p className="extra-dark-green">Confirm to get your files.</p>
                            <div className="d-flex gap-3 mt-4 pt-4">
                                <div className="col-md-8">
                                    <Button variant="unset" className="w-100 rounded-pill btn-outline-dark" onClick={(e) => handleReview(e,'completed')}>
                                        YES
                                    </Button>
                                </div>
                                <div className="col-md-4">
                                    <Button variant="unset" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                                        NO
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
           {isreview && <DeliverFiles show={isSubmit} onClose={() => { dispatch({type: SUBMIT_NOW, payload: false })}} requestdata={details}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isSubmit: state.requests.isSubmit
    };
};
export default connect(mapStateToProps)(ReviewSubmit);

