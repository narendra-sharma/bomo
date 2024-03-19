import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { get_late_requests_superadmin } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import ColorCode from "../Common/ColorCode";
import EmptyList from "../Common/EmptyList";

const LateRequests = ({ user, lateRequests }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        get_late_requests_superadmin(dispatch, user?.token);
    }, []);

    const formatDate = (inputdate) => {
        const date = new Date(inputdate);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${weekdays[date.getUTCDay()]} ${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}`
    };

    return (
        <div>
            <div className="row mb-4">
                <h3 className="mb-3">Late Requests</h3>
                <div className="col-md-12">
                    <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                        <p className="request-status fw-bold mb-0">{lateRequests?.active_late_request_data?.length} Request</p>
                        <div className="ms-4">
                            <p className="mb-0 fw-bold">From ACTIVE REQUESTS</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="review-content late-request bg-red py-3 px-4 rounded mt-4">
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                                {lateRequests?.active_late_request_data?.length > 0 ?
                                    lateRequests?.active_late_request_data?.map((item) => (
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="">
                                                        <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark">
                                                            View as Customer
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <ColorCode request={item} />{" "}
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="fw-bold">Cratat</span>{" "}
                                                        <span className="d-block">{item?.request_name}</span>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="fw-bold">Status</span>{" "}
                                                        <span className="d-block">To Review</span>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="fw-bold">Delivery</span>{" "}
                                                        <span className="d-block">{formatDate(item?.delivery_date)}</span>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="fw-bold">Request by</span>{" "}
                                                        <span className="d-block">Pepín Noob</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )) : (
                                        <EmptyList name="Active Requests" />
                                    )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                        <p className="request-status fw-bold mb-0">{lateRequests?.feedback_late_request_data?.length} Request</p>
                        <div className="ms-4">
                            <p className="mb-0 fw-bold">From FEEDBACK REQUESTS</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="review-content late-request bg-red py-3 px-4 rounded mt-4">
                        <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="">
                                                <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark">
                                                    View as Customer
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <p className="short0ad">short ad</p>{" "}
                                        </td>
                                        <td>
                                            <p>DIOR</p>
                                        </td>
                                        <td>
                                            <p>
                                                <span className="fw-bold">Status</span>{" "}
                                                <span className="d-block">To Review</span>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <span className="fw-bold">Delivery</span>{" "}
                                                <span className="d-block">Monday 17/03</span>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <span className="fw-bold">Request by</span>{" "}
                                                <span className="d-block">Pepín Noob</span>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        lateRequests: state.requests.lateRequests
    }
};

export default connect(mapStateToProps)(LateRequests);
