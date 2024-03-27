import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FeedBackSubmit from "./FeedBackSubmit";
import ReviewSubmit from "./ReviewSubmit";
import designImage5 from "../images/large-nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import ColorCode from "../Common/ColorCode";
import FeedbackFiles from "./FeedbackFiles";
import ReactPlayer from "react-player";

const { REACT_APP_BOMO_URL } = process.env;

const ConfirmDeliver = ({ isshow, viewClose, requestdata }) => {
    const [feed, setFeed] = useState(false);
    const [issucess, setIssucess] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [ishover,setIshover] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isVideo,setIsVideo]= useState(false);
    const [deliveryname, setDeliveryname] = useState('');
    const [deliveryStage, setDeliveryStage] = useState(1);
    const [isFeed, setIsFeed] = useState(false);
    const getPortrait = JSON.parse(localStorage.getItem('portrait'));
    const getLandscape = JSON.parse(localStorage.getItem('landscape'));

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        return `${monthDay}th ${time}`;
    };

    const handleSingle = () => {
        if (requestdata?.size?.length === 1) {
            setIssucess(true);
        } else if (requestdata?.size?.length > 1) {
            setDeliveryStage(deliveryStage + 1)
        }
    };

    const handleCheck = () => {
        if (deliveryStage === 2 && (getPortrait || getLandscape)) {
            setIsFeed(true);
            viewClose();
        } else {
            setIssucess(true);
        }
    };

    const handleStage = () => {
        if (deliveryStage === 1) {
            setDeliveryStage(deliveryStage + 1);
        } else if (deliveryStage === 2) {
            setDeliveryStage(deliveryStage - 1);
        }
    };

    const showFeedback = () => {
        if (deliveryStage === 1 && requestdata?.size?.length === 1) {
            setFeed(true);
            setDeliveryname('landscape');
            viewClose();
        } else if (deliveryStage === 1 && requestdata?.size?.length === 2) {
            setFeed(true);
            setDeliveryname('landscape');
        } else if (deliveryStage === 2) {
            setFeed(true);
            setDeliveryname('portrait');
            viewClose();
        }
        // viewClose();
    };

    const handleClose = () => {
        setDeliveryStage(1);
        viewClose();
    };

    const togglePlay = (stage) => {
        const video = document.getElementById(stage===1 ? 'videoLandscape' : stage===2 && 'videoPortrait');
        if (video.paused && stage===1) {
            video.play();
            setIsPlay(true);
        } else if (video.paused && stage===2) {
            video.play();
            setIsVideo(true);
        } else {
            video.pause();
            if(stage===1){
                setIsPlay(false);
            }else if (stage===2){
                setIsVideo(false);
            }
        }
    };

    return (
        <div>
            <Modal show={isshow} size="xl" onHide={handleClose} className="logout-popup">
                <Modal.Body>
                    <div className="py-4 px-60 rounded">
                        <div className="delivery-status-section bg-white p-4">
                            <div className="row position-relative">
                                <div class="col-md-12 col-lg-12 ">
                                    <div class="d-flex justify-content-end completed-status">
                                        <div className="review-content"><ColorCode request={requestdata} /></div>
                                        <div class="delivery-date text-end ps-3">
                                            <div class="fw-bold h6 mb-0">Completed<span class="d-block h6">{formatDate(requestdata?.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                        <div className="delivery-status fw-bold">
                                            {deliveryStage === 1 ?
                                                requestdata?.size?.slice(0, 1).map((item) => item)
                                                : deliveryStage === 2 ?
                                                    requestdata?.size?.slice(1, 2).map((item) => item)
                                                    : 'No Size'}
                                        </div>
                                        <div className="">
                                            {deliveryStage === 1 && (requestdata?.file_type === 'Mp4' || requestdata?.file_type === 'Mov') ?
                                                <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                                                    <video
                                                        id="videoLandscape"
                                                        src={`${REACT_APP_BOMO_URL}designe/landscape/${requestdata?.landscape}`}
                                                        height={320}
                                                        width={450}
                                                        controls={isPlay}
                                                        autoPlay={isPlay} 
                                                        controlsList="nodownload" />
                                                    {hovered &&
                                                        <button onClick={() => togglePlay(deliveryStage)}>{isPlay ? "Pause" : "Play"}</button>
                                                    }
                                                </div>
                                                : deliveryStage === 1 && requestdata?.file_type === 'gif' ?
                                                    <img src={`${REACT_APP_BOMO_URL}designe/landscape/${requestdata?.landscape}`} alt="Img1" width="450" height="320" />
                                                    : deliveryStage === 2 && (requestdata?.file_type === 'Mp4' || requestdata?.file_type === 'Mov') ?
                                                        <div onMouseEnter={() => setIshover(true)} onMouseLeave={() => setIshover(false)}>
                                                            <video
                                                                 id="videoPortrait"
                                                                src={`${REACT_APP_BOMO_URL}designe/portrait/${requestdata?.portrait}`}
                                                                height={320}
                                                                width={450}
                                                                controls={isVideo}
                                                                autoPlay={isVideo}
                                                                controlsList="nodownload" />
                                                            {ishover &&
                                                                <button onClick={() => togglePlay(deliveryStage)}>{isVideo ? "Pause" : "Play"}</button>
                                                            }
                                                        </div>
                                                        : deliveryStage === 2 && requestdata?.file_type === 'gif' ? (
                                                            <img src={`${REACT_APP_BOMO_URL}designe/portrait/${requestdata?.portrait}`} alt="Img2" width="450" height="320" />
                                                        ) : "No Data"
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 align-self-center text-center">
                                    <p className="mb-1 h6 fw-bold color-black"> Delivery {deliveryStage}/{requestdata?.size?.length} </p>
                                    <div className="delivery-status fw-bold mb-3">
                                        {requestdata?.request_name}
                                    </div>
                                    <span className="delivery-status">
                                        {deliveryStage === 1 ?
                                            <i className="fa-solid fa-circle-check cursor-pointer" onClick={() => handleSingle()}></i>
                                            : <i className="fa-solid fa-circle-check cursor-pointer" onClick={() => handleCheck()}></i>
                                        }
                                    </span>
                                    <span className="delivery-status delivery-cancel bg-white ms-3 cursor-pointer"><i className="fa-solid fa-circle-xmark cancel" onClick={showFeedback}></i></span>
                                    {requestdata?.size?.length > 1 && <div className="mt-5">
                                        <button className="btn btn-outline-dark px-3 py-1" onClick={() => handleStage()}>
                                            {deliveryStage === 1 ? 'Next' : deliveryStage === 2 && 'Previous'}
                                        </button>
                                        {/* {deliveryStage === 1 ? (
                                            <button className="btn btn-outline-dark px-3 py-1" onClick={() => setDeliveryStage(deliveryStage + 1)}>Next</button>
                                        ) : deliveryStage === 2 ? (
                                            <button className="btn btn-outline-dark px-3 py-1" onClick={() => setDeliveryStage(Math.max(1, deliveryStage - 1))}>Previous</button>)
                                            : "No Data Found"} */}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <FeedBackSubmit show={feed} handleClose={() => setFeed(false)} details={requestdata} designName={deliveryname} stage={deliveryStage} />
            <ReviewSubmit show={issucess} handleClose={() => setIssucess(false)} details={requestdata} />
            <FeedbackFiles show={isFeed} handleClose={() => setIsFeed(false)} details={requestdata} />
        </div>
    )
};

export default ConfirmDeliver;