import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PollRequests from "../Customer/Requests/PollRequests";
import RequestJobs from "../Modals/RequestJobs";
import { connect, useDispatch } from "react-redux";
import { get_designer_active_requestslist } from "../reduxdata/rootAction";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
const DesignerHome = ({user, activerequest}) => {
    const dispatch = useDispatch();
    const [activerequests,setActiverequests] = useState([]);

    useEffect(()=> {
        get_designer_active_requestslist(dispatch,user?.token);
    },[dispatch]);

    useEffect(()=> {
        setActiverequests(activerequest)
    },[activerequest])

    const [showList, setShowList] = useState(true);
    const handleClose = () => {
        setShowList(false);
    };

    const calculateTimeRemaining = (acceptanceTime, duration) => {
        const currentTime = new Date().getTime();
        const deadline = new Date(acceptanceTime).getTime() + duration;
        const timeRemaining = deadline - currentTime;
        return timeRemaining > 0 ? timeRemaining : null;
    };

    const formatTime = (timeRemaining) => {
        const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
        const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const updateTimers = () => {
            setActiverequests((prevData) =>
                prevData.map((request) => {
                    const utcDate = new Date(request.designer_accept_date);
                    const localDate =  new Date(utcDate.toLocaleString());
                       return {
                        ...request,
                        timeRemaining20Hrs: calculateTimeRemaining(localDate, 20 * 60 * 60 * 1000),
                       }
                })
            );
        };
        const timerId = setInterval(updateTimers, 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content review-content ">
                    <div className="mx-md-5 mx-sm-0 mb-4"><h3 >My Active Requests</h3></div>
                    <div className="designer-active-request bg-white px-2 px-md-4 py-5 rounded">
                        {activerequests.map((request) => (
                            <div className="mb-4">
                                <div className="ms-4 mb-3">
                                    <span className="deadline-date status position-relative ps-3">Deadline in <span className="fw-bold">{formatTime(request.timeRemaining20Hrs)}</span></span>
                                </div>
                                <div className="table-responsive rounded">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="text-center"><ColorCode request={request} /></td>
                                                <td><p >{request?.brand_profile?.brandname}</p></td>
                                                <td><p><span className="fw-bold">{request?.request_name}</span></p></td>
                                                <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span></p></td>
                                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                                <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                                <td className="text-end ps-0">
                                                    <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">DELIVERY NOW</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <div className="mx-md-5 mx-sm-0 mb-4 d-flex"><h3 >Requests Poll</h3>
                            <span>84 active requests</span>
                        </div>

                        <div className="poll-request-section">
                            <div className="row">
                                <PollRequests />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RequestJobs show={showList} handleClose={handleClose} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        activerequest: state.requests.activerequest,
    };
};

export default connect(mapStateToProps)(DesignerHome);
