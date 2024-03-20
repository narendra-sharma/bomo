import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { get_superadmin_all_activerequests } from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";

const AllActiveRequests = ({ user, allactiverequests }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        get_superadmin_all_activerequests(user?.token, dispatch);
    }, []);

    return (
        <div class="accordion-item mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h3 class="accordion-header" id="panelsStayOpen-headingOne">
                        <h3 className="fw-bold mb-3 counter-circle d-flex align-items-center gap-2">
                            <span className="rounded-circle bg-white mr-2">
                                {allactiverequests?.less_than_12_hours?.length + allactiverequests?.more_than_12_hours?.length}
                            </span>
                        </h3>
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            <span className="mb-4 d-inline-block position-relative">Active Requests</span>
                            <div className="late-request-section">
                                <div className="light-gray py-3 px-4 rounded d-flex mb-3">
                                    <p className="request-status fw-bold mb-0">
                                        {allactiverequests?.less_than_12_hours?.length}  Request
                                    </p>
                                    <div className="ms-4">
                                        <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-left arrow" ></span> 12h - Priority</p>
                                    </div>
                                </div>
                                <div className="bg-white py-3 px-4 rounded d-flex">
                                    <p className="active-request-status fw-bold mb-0">
                                        {allactiverequests?.more_than_12_hours?.length} Request
                                    </p>
                                    <div className="ms-4">
                                        <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-right arrow" ></span> 12h - Priority</p>
                                    </div>
                                </div>
                            </div>
                        </button>

                    </h3>
                </div>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body p-0">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="late-request-section light-gray py-3 px-4 rounded d-flex">
                                    <p className="request-status fw-bold mb-0">{allactiverequests?.less_than_12_hours?.length} Request</p>
                                    <div className="ms-4">
                                        <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-left arrow" ></span> 12h - Priority</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-0 light-gray">
                            {allactiverequests?.less_than_12_hours?.map((request) =>
                                <div className="col-md-6">
                                    <div className="review-content px-3  mb-3">
                                        <div className="table-responsive">
                                            <table className="table table-borderless mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">
                                                            <p className="">edit</p>{" "}
                                                        </td>
                                                        <td className="text-center" style={{width:'120px'}}>
                                                            <ColorCode request={request} />
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">{request?.user_id?.company}</span>{" "}
                                                                <span className="d-block">{request?.request_name}</span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Status</span>{" "}
                                                                <span className="d-block">{request?.status}</span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Delivery</span>{" "}
                                                                <span className="d-block">
                                                                    {!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Request by</span>{" "}
                                                                <span className="d-block">{request?.user_id?.name}</span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="row g-0 bg-white">
                            <div className="col-md-12">
                                <div className="late-request-section bg-white py-3 px-4 d-flex">
                                    <p className="request-status active-request-status fw-bold mb-0">{allactiverequests?.more_than_12_hours?.length} Request</p>
                                    <div className="ms-4">
                                        <p className="mb-0 fw-bold -status">Delivery <span className="fas fa-angle-right arrow" ></span> 12h - Priority</p>
                                    </div>
                                </div>
                            </div>
                            {allactiverequests?.more_than_12_hours?.map((request) =>
                                <div className="col-md-6">
                                    <div className="review-content px-4  mb-3">
                                        <div className="table-responsive">
                                            <table className="table table-borderless mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">
                                                            <p className="">edit</p>{" "}
                                                        </td>
                                                        <td className="text-center">
                                                            <ColorCode request={request} />
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">{request?.user_id?.company}</span>{" "}
                                                                <span className="d-block">DIOR</span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Status</span>{" "}
                                                                <span className="d-block">{request?.status}</span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Delivery</span>{" "}
                                                                <span className="d-block">
                                                                    {!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                <span className="fw-bold">Request by</span>{" "}
                                                                <span className="d-block">{request?.user_id?.name}</span>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        allactiverequests: state.requests.allactiverequests,
    };
};
export default connect(mapStateToProps)(AllActiveRequests);
