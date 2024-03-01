import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import EmptyList from "../../Common/EmptyList";
import CustomPagination from "../../Common/CustomPagination";
import { format } from "date-fns";
import ColorCode from "../../Common/ColorCode";
import { get_accepted_request } from "../../reduxdata/Requests/requestActions";
const AcceptedRequest = ({ user, acceptedRequests, total, search }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        get_accepted_request(dispatch, user?.token, 1, 10, search);
    }, [dispatch, search]);
    return (
        <div className="row mb-4">
            <h3 className="mb-3">Accepted Request</h3>
            <div className="col-md-12">
                <div className="bg-white rounded mt-4 p-4">
                    <div className="review-content pending-request">
                        {acceptedRequests.length > 0 ? (
                            acceptedRequests.map((item, index) => {
                                return (
                                    <div className="table-responsive" key={index}>
                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <ColorCode request={item} />
                                                    </td>
                                                    <td style={{ width: "170px", paddingLeft: "25px" }}>
                                                        <p>
                                                            <span className="fw-bold">
                                                                {item?.user_id?.company}
                                                            </span>{" "}
                                                            <span className="d-block">
                                                                {item?.brand_profile?.brandname}
                                                            </span>{" "}
                                                        </p>
                                                    </td>
                                                    <td style={{ width: "140px" }}>
                                                        <p>
                                                            <span className="fw-bold">Status</span>{" "}
                                                            <span className="d-block text-capitalize">
                                                                {item?.status}
                                                            </span>
                                                        </p>
                                                    </td>

                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Delivery</span>{" "}
                                                            <span className="d-block">
                                                                {!item?.delivery_date
                                                                    ? "No Date"
                                                                    : format(
                                                                        new Date(item?.delivery_date),
                                                                        "dd/MM/yyyy"
                                                                    )}
                                                            </span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Request by</span>{" "}
                                                            <span className="d-block">
                                                                {item?.user_id?.name}
                                                            </span>
                                                        </p>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })
                        ) : (
                            <EmptyList name="Accepted Request" />
                        )}
                        {total > 0 && (
                            <CustomPagination
                                total={total}
                                onPageChange={(newPage, newLimit) => {
                                    get_accepted_request(
                                        dispatch,
                                        user?.token,
                                        newPage,
                                        newLimit
                                    );
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        acceptedRequests: state.requests.acceptedRequests,
        total: state.requests.pendingTotal,
    };
};
export default connect(mapStateToProps)(AcceptedRequest);