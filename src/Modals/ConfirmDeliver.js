import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FeedBackSubmit from "./FeedBackSubmit";
import ReviewSubmit from "./ReviewSubmit";
import designImage5 from "../images/large-nine-sixteen.png";
import ColorCode from "../Common/ColorCode";
import FeedbackFiles from "./FeedbackFiles";

const { REACT_APP_BOMO_URL } = process.env;

const ConfirmDeliver = ({ isshow, viewClose, requestdata }) => {

    const [feed, setFeed] = useState(false);
    const [issucess, setIssucess] = useState(false);
    const [deliveryname,setDeliveryname]=useState('');
    const [deliveryStage, setDeliveryStage] = useState(1);
    const [isFeed,setIsFeed]=useState(false);
    const getPortrait = JSON.parse(localStorage.getItem('portrait'));
    const getLandscape = JSON.parse(localStorage.getItem('landscape'));

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        return `${monthDay}th ${time}`;
    };

    const handleCheck = () => {
        if(deliveryStage===2 && (getPortrait || getLandscape)) {
            setIsFeed(true);
        } else {
            setIssucess(true);
        }
    };

    const showFeedback = () => {
        if(deliveryStage===1){
            setFeed(true);
            setDeliveryname('landscape');
        } else if(deliveryStage===2) {
            setFeed(true);
            setDeliveryname('portrait');
            viewClose();
        }
        // viewClose();
    };

    return (
        <div>
            <Modal show={isshow} size="xl" onHide={viewClose} className="logout-popup">
                <Modal.Body>
                    <div className="py-4 px-60 rounded">
                        <div className="delivery-status-section bg-white p-4">
                            <div className="row position-relative">
                                <div class="col-md-12 col-lg-12 ">
                                    <div class="d-flex justify-content-end completed-status">
                                        <div className="review-content"><ColorCode request={requestdata} /></div>
                                        <div class="delivery-date text-end ps-3">
                                            <div class="fw-bold h6 mb-0">Completed<span class="d-block h6">{formatDate(requestdata?.delivery_date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                        <div className="delivery-status fw-bold">
                                            {deliveryStage === 1 ? '9:16' : deliveryStage === 2 ? '16:9' : 'No Size'}
                                        </div>
                                        <div className="">
                                            {deliveryStage === 1 ? (
                                                <img src={`${REACT_APP_BOMO_URL}designe/landscape/${requestdata?.landscape}`} alt="Img1" />
                                            ) : deliveryStage === 2 ? (
                                                <img src={`${REACT_APP_BOMO_URL}designe/portrait/${requestdata?.portrait}`} alt="Img2" />
                                            ) : "No Data"}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 align-self-center text-center">
                                    <p className="mb-1 h6 fw-bold color-black"> Delivery {deliveryStage}/2 </p>
                                    <div className="delivery-status fw-bold mb-3">
                                        {requestdata?.request_name}
                                    </div>
                                    <span className="delivery-status">
                                        {deliveryStage === 1 ?
                                            <i className="fa-solid fa-circle-check cursor-pointer" onClick={() => setDeliveryStage(deliveryStage + 1)}></i>
                                            : <i className="fa-solid fa-circle-check cursor-pointer" onClick={() => handleCheck()}></i>
                                        }
                                    </span>
                                    <span className="delivery-status delivery-cancel bg-white p-1 cursor-pointer"><i className="fa-solid fa-circle-xmark cancel" onClick={showFeedback}></i></span>
                                    <div className="mt-5">
                                        {deliveryStage === 1 ? (
                                            <button className="btn btn-outline-dark px-3 py-1" onClick={() => setDeliveryStage(deliveryStage + 1)}>Next</button>
                                        ) : deliveryStage === 2 ? (
                                            <button className="btn btn-outline-dark px-3 py-1" onClick={() => setDeliveryStage(Math.max(1, deliveryStage - 1))}>Previous</button>)
                                            : "No Data Found"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <FeedBackSubmit show={feed} handleClose={() => setFeed(false)} details={requestdata} designName={deliveryname} stage={deliveryStage} />
            <ReviewSubmit show={issucess} handleClose={() => setIssucess(false)} details={requestdata}/>
            <FeedbackFiles show={isFeed} handleClose={() => setIsFeed(false)}  details={requestdata} closeall={viewClose} />
        </div>
    )
};

export default ConfirmDeliver;
