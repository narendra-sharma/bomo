import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import FeedbackSuccess from "./FeedbackSuccess";
import { review_delivery_request_customer_admin } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";

const ConfirmFeedback = ({ user, show, handleClose,requestData }) => {
    const dispatch = useDispatch();
    const getPortrait = JSON.parse(localStorage.getItem('portrait'));
    const getLandscape = JSON.parse(localStorage.getItem('landscape'));
    const [ispop, setIspop] = useState(false);

    const handleFeedback = async (status) => {
        const specifyData = {
            _id: requestData?._id,
            reviewstatus: status,
        };
        if (getPortrait) {
            specifyData.portraitfeedback = getPortrait;
        } else {
            specifyData.portraitfeedback = null;
        }

        if (getLandscape) {
            specifyData.landscapefeedback = getLandscape;
        } else {
            specifyData.landscapefeedback = null;
        }

        await review_delivery_request_customer_admin(dispatch, user?.token, specifyData);
        setIspop(true);
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
                <Modal.Body>
                    <div className="py-5 px-60 ">
                        <div className="review-submit-popup extra-grren rounded my-5 p-5">
                            <h5 className="mb-0 extra-dark-green fw-bold">{user?.name},</h5>
                            <p className="extra-dark-green"> Are you sure feedback is accurate?
                                <br />Once submitted,feedback takes 24b hours.</p>
                            <p className="extra-dark-green">Remember, you can have X orders in review at the same time.</p>
                            <div className="d-flex gap-3 mt-4 pt-4">
                                <div className="col-md-8">
                                    <Button variant="unset" className="w-100 rounded-pill btn-outline-dark" onClick={() => handleFeedback('rejected')}>
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
            <FeedbackSuccess show={ispop} handleClose={() => setIspop(false)} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        requestData: state.requests.editrequestData,
    };
};
export default connect(mapStateToProps)(ConfirmFeedback);