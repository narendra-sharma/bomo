import React, { useEffect, useState } from "react";
import poolImage from "../../images/pool-request-img.png"
import { connect, useDispatch } from "react-redux";
import { get_designer_pool_requestlist, poll_request_apply } from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";
import RequestBrief from "../../Modals/RequestBrief";

const PollRequests = ({ user, pollrequests }) => {
    const dispatch = useDispatch();
    const [isvisible, setIsvisible] = useState(false);
    const [istoggle,setIstoggle] = useState(false);
    const toogleVisibility = () => {
        if (window.scrollY > 300) {
            setIsvisible(true);
        } else {
            setIsvisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };
    const handleClose = () => {
        setIstoggle(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', toogleVisibility);
        return () => {
            window.removeEventListener('scroll', toogleVisibility);
        }
    }, []);

    const handleApplyRequest = (requestdata) => {
        let applyrequest = requestdata._id;
        poll_request_apply(applyrequest, dispatch, user?.token);
    };

    useEffect(() => {
        get_designer_pool_requestlist(dispatch, user?.token);
    }, [dispatch, user?.token]);

    return (
        <>
            {pollrequests?.map((request) => (
                <div className="col-md-6 col-lg-4 col-12">
                    <div className="bg-white px-2 px-md-3 py-3 rounded">
                        <div className="d-flex justify-content-between">
                            <h6 className="fw-bold">{request?.request_name}</h6>
                            <p className="text-end"><span className="fw-bold">Expected Delivery</span>
                                <span className="d-block">Mon 10 - 9:00</span>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-md-9 col-lg-9 d-flex align-items-center">
                                <div className="d-flex">
                                    <ColorCode request={request} />
                                    <p className="short0ad dor rounded-pill">DOR</p>
                                </div>
                                <div><p onClick={() => setIstoggle(true)}>+ Show full Brief</p></div>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-9 col-lg-8 d-flex align-items-center">
                                <img src={poolImage} alt="not found" />
                            </div>
                            <div className="col-md-3 col-lg-4">
                                <div className="text-end ">
                                    <h5 className="fw-bold">$125</h5>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-7 col-lg-8 d-flex align-items-center">
                                <div className="d-flex justify-content-betwwen">
                                    <p className="text-mute"><span>Selection in</span> <span className="fw-bold">14 days</span></p>
                                    <p className="text-mute"><span>237 applications</span></p>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4">
                                <div className="status-btn">
                                    <button className="btn pause-btn rounded-pill py-1 w-100" onClick={() => handleApplyRequest(request)}>Apply</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="status-btn">
                        <button className="btn pause-btn rounded-pill mt-4 py-1 w-100" onClick={scrollToTop}>
                            Go to the Top
                        </button> </div>
                </div>
            <RequestBrief show={istoggle} handleClose={handleClose} />
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        pollrequests: state.requests.pollrequests,
    };
};
export default connect(mapStateToProps)(PollRequests);
