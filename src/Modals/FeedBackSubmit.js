import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import FeedbackFiles from "./FeedbackFiles";
import ReactPlayer from "react-player";

const { REACT_APP_BOMO_URL } = process.env;

const FeedBackSubmit = ({ show, handleClose, details, user, designName, stage }) => {
    const [formdata, setFormdata] = useState({
        feedback: ''
    });
    const [errors, setErrors] = useState({
        feedback: ''
    });
    const [isFeed, setIsFeed] = useState(false);
    // const [ishover,setIshover] = useState(false);
    // const [isPlay, setIsPlay] = useState(false);
    // const [isVideo,setIsVideo]= useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: value === '' ? 'Specify what needs to be modified' : null });
        setFormdata({ ...formdata, [name]: value });
    };

    // const handleRequest = () => {
    //     localStorage.setItem('requestData', JSON.stringify(data));
    //     navigate('/request-expand');
    // };

    // const handleFeedback = (e,status) => {
    //     e.preventDefault();
    //     const checkerrors = {};
    //     Object.keys(formdata).forEach((name) => {
    //         if (formdata[name] === '') {
    //             checkerrors[name] = 'Specify what needs to be modified'
    //         }
    //     });
    //     setErrors({...errors, checkerrors});
    //     if (Object.keys(checkerrors).length>0) {
    //         return;
    //     }
    //     const specifyData = {
    //         _id: details._id,
    //         reviewstatus: status,
    //         message: formdata.feedback
    //     };
    //     review_delivery_request_customer_admin(dispatch, user?.token, specifyData);
    //     handleRequest();
    // };

    const AddFeedback = (e) => {
        e.preventDefault();
        const checkerrors = {};
        Object.keys(formdata).forEach((name) => {
            if (formdata[name] === '') {
                checkerrors[name] = 'Specify what needs to be modified'
            }
        });
        setErrors({ ...errors, checkerrors });
        if (Object.keys(checkerrors).length > 0) {
            return;
        }

        if (designName === 'landscape') {
            const feedbackmessage = formdata.feedback;
            localStorage.setItem('landscape', JSON.stringify(feedbackmessage));
            if (details?.size?.length === 1) {
                setIsFeed(true);
            }
            handleClose();
        }

        if (designName === 'portrait') {
            const feedbackmessage = formdata.feedback;
            localStorage.setItem('portrait', JSON.stringify(feedbackmessage));
            if (stage === 2) {
                setIsFeed(true);
            }
            handleClose();
        }
    };

    // const togglePlay = (videostage) => {
    //     const video = document.getElementById(videostage===1 ? 'videoLandscape' : videostage===2 && 'videoPortrait');
    //     if (video.paused && videostage===1) {
    //         video.play();
    //         setIsPlay(true);
    //     } else if (video.paused && videostage===2) {
    //         video.play();
    //         setIsVideo(true);
    //     } else {
    //         video.pause();
    //         if(videostage===1){
    //             setIsPlay(false);
    //         }else if (videostage===2){
    //             setIsVideo(false);
    //         }
    //     }
    // };

    useEffect(() => {
        return () => { setFormdata({ feedback: '' }); setErrors({ feedback: null }); };
    }, [show]);

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
                <Modal.Body className="py-5">
                    {/* <div className="col-md-5 d-flex text-center justify-content-center">
                        <div className="statusbar-section d-flex flex-column justify-content-between">
                            <div className="delivery-status fw-bold">
                                {stage === 1 ?
                                    details?.size?.slice(0, 1).map((item) => item)
                                    : stage === 2 ?
                                        details?.size?.slice(1, 2).map((item) => item)
                                        : 'No Size'}
                            </div>
                            <div className="" onMouseEnter={() => setIshover(true)} onMouseLeave={() => setIshover(false)}>
                                <video
                                    id={`${stage===1 ? 'videoLandscape' : stage===2 && 'videoPortrait'}`}
                                    src={`${REACT_APP_BOMO_URL} ${stage===1 ? ` designe/landscape/${details?.landscape}` :  stage===2 && `designe/portrait/${details?.portrait}`}`}
                                    height={320}
                                    width={450}
                                    controls={`${stage===1 ? isPlay : stage===2 && isVideo}`}
                                    autoPlay={`${stage===1 ? isPlay : stage===2 && isVideo}`}
                                    controlsList="nodownload" />
                                {ishover &&
                                    <button onClick={() => togglePlay(stage)}>{(stage===1 ? isPlay : stage===2 && isVideo) ? "Pause" : "Play"}</button>
                                }
                            </div>
                        </div>
                    </div> */}
                    <div className="py-5 px-60 ">
                        <div className="w-50 m-auto my-5">
                            <h5 className="mb-0 fw-bold">Specify what needs to be modified</h5>
                            <textarea name="feedback" className="form-control feedback-submit-popup extra-grren rounded border border-dark my-4 p-4 w-100"
                                placeholder="Is the animation true to the brief? 
                              Are color changes needed?
                              Fonts and typography need adjustments?
                              Flow, timing, clarity. The more specific the better." value={formdata.feedback} onChange={handleInputChange}>
                            </textarea>
                            {errors.feedback && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.feedback}</p>}
                            <div className="d-flex gap-3 justify-content-center mt-3 pt-4">
                                <div className="col-md-8">
                                    <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={(e) => { AddFeedback(e); }}>
                                        Add Feedback
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <FeedbackFiles show={isFeed} handleClose={() => setIsFeed(false)} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};
export default connect(mapStateToProps)(FeedBackSubmit);
