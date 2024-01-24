import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { get_designer_active_requestslist } from "../reduxdata/rootAction";
import { format } from "date-fns";
import ColorCode from "../Common/ColorCode";

const ActiveRequests = ({ isLoading, user, activerequest }) => {
    const dispatch = useDispatch();
    const [activerequests, setActiverequests] = useState([]);

    useEffect(() => {
        get_designer_active_requestslist(dispatch, user?.token);
    }, [dispatch]);

    useEffect(() => {
        setActiverequests(activerequest)
    }, [activerequest]);

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
                    const utcDate = new Date(request.designer_accept_date.split('.')[0]);
                    const localDate = new Date(utcDate.toLocaleString());
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
        <>{isLoading && <LoadingSpinner />}

            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper cutomer-home-page  px-60 py-md-2 py-lg-5">
                    <div className="review-main-content review-content">
                        <div className="mx-md-5 mx-sm-0 mb-4"><h3 >My Active Requests</h3></div>
                        {activerequests.map((request) => (
                            <div className="row align-items-center mb-4">
                                <div className="col-md-8">
                                    <div className="bg-white px-2 px-md-4 py-5 rounded">
                                        <div className="row align-items-center">
                                            <div className="col-md-7 col-12">
                                                <div className="mx-md-4 mx-sm-0 mb-4">
                                                    <h2 className="h3 fw-bold">{request?.request_name}</h2>
                                                </div>
                                            </div>

                                            <div className="col-md-5 col-12">
                                                <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                                    <p class="short0ad dor rounded-pill">{request?.brand_profile?.brandname}</p>
                                                    <span class="deadline-date status position-relative deliver-now-btn">Deadline in <span class="fw-bold">{formatTime(request.timeRemaining20Hrs)}</span></span>
                                                </div>

                                            </div>
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center">
                                                    <ColorCode request={request} />
                                                    <p className="brand-assets-btn rounded">Brand Assets</p>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table request-status table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <td> </td>
                                                                <td><p><span className="fw-bold d-block">Status</span></p>
                                                                    {request?.status}</td>
                                                                <td><p><span className="fw-bold d-block">Expected Delivery </span>
                                                                    {!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</p></td>
                                                                <td><p><span className="fw-bold d-block">Alpha Background</span></p> No</td>

                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><span className="fw-bold d-block">Description</span>
                                                                        {request?.description} <span className="d-block">
                                                                            What do you want to achieve with this animation?</span>
                                                                        <span className="d-block">Where is this going to appear?</span></p>
                                                                </td>
                                                                <td><p><span className="fw-bold d-block">Reference</span> {request?.references}</p></td>
                                                                <td><p><span className="fw-bold d-block">Deliverables</span>{request?.size}<br /></p></td>
                                                                <td><p><span className="fw-bold d-block">Format</span></p> {request?.file_type}</td>
                                                                <td>-</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="project-assets-btn mt-4 fw-bold w-100 rounded-pill px-3 py-1 text-center">
                                                    Project Assets
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-3 text-center">
                                            <div className="delivery-arrow">
                                                <i class="fas fa-chevron-right"></i>
                                            </div>
                                        </div>

                                        <div className="col-md-8 ">
                                            <div className="text-end">
                                                <button type="button" class="rounded-pill deliver-now-btn ms-2 btn btn-unset w-100 fw-bold text-uppercase">Deliver</button>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}

                        <div className="mt-5 text-center">
                            <p>No more active Requests. See what’s new and apply</p>
                            <button className="btn btn-white mt-2 rounded-pill ">Browse <span className="fw-bold">the poll</span></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        activerequest: state.requests.activerequest,
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(ActiveRequests);
