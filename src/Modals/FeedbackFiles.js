import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png";
import ConfirmFeedback from "./ConfirmFeedback";
import { connect } from "react-redux";

const FeedbackFiles = ({ show, handleClose,requestData }) => {

    const getPortrait = JSON.parse(localStorage.getItem('portrait'));
    const getLandscape = JSON.parse(localStorage.getItem('landscape'));
    const [isShow,setIsShow]=useState(false);
    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
                <Modal.Body>
                    <div>
                        <span>Delivery {requestData?.size?.length}/{requestData?.size?.length}</span>
                        <p>{requestData?.request_name}</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex flex-column align-items-center">
                                <span>{requestData?.size[0]}</span>
                                <span>{getLandscape ? <i className="fa-solid fa-circle-xmark cancel text-danger"></i>
                                    : <i className="fa-solid fa-check-circle"></i>}
                                </span>
                                <img src={reelImage} alt="imag" />
                            </div>
                            {requestData?.size?.length>1 && <div className="d-flex flex-column align-items-center">
                                <span>{requestData?.size[1]}</span>
                                <span>{getPortrait ? <i className="fa-solid fa-circle-xmark cancel text-danger"></i>
                                    : <i className="fa-solid fa-check-circle"></i>}
                                </span>
                                <img src={reelImage} alt="imag" />
                            </div>}
                        </div>
                        <div className="d-flex gap-3 justify-content-center mt-3 pt-4">
                            <div className="col-md-3">
                                <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={() => {setIsShow(true);handleClose();}}>
                                    Send Feedback
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ConfirmFeedback show={isShow} handleClose={() => setIsShow(false)}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        requestData: state.requests.reviewrequestData,
    };
};
export default connect(mapStateToProps)(FeedbackFiles);
