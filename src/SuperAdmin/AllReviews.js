import React, { useEffect } from "react";
import { get_all_review_requests } from "../reduxdata/rootAction";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
import CustomPagination from "../Common/CustomPagination";


const AllReviews = ({ user, reviews, total }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        get_all_review_requests(dispatch, user?.token, 1, 10);
    }, []);
    console.log(reviews);
    return (
        <div class="accordion-item mb-5">
            <h3 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                    <span className="mb-4 d-inline-block position-relative">Ready to Review Request</span>
                </button>
            </h3>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body p-0">
                    <div className="row g-0 bg-white">
                        <div className="col-md-12">
                            <div className="late-request-section bg-white py-3 px-4 d-flex">

                                <div className="">
                                    <p className="mb-0 fw-bold -status">waiting <span className="fas fa-angle-left arrow" ></span> 12h - Priority</p>
                                </div>
                            </div>
                        </div>
                        {reviews?.map((request) => (
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
                                                            <span className="fw-bold">{request?.request_name}</span>{" "}
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
                                                                {request?.delivery_date ?
                                                                    format(new Date(request?.delivery_date), 'dd/MM/yyyy') :
                                                                    'No Date'}
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
                        ))}
                    </div>
                    {(total > 0) && <CustomPagination total={total} onPageChange={(newPage, newLimit) => {
                        get_all_review_requests(dispatch, user?.token, newPage, newLimit);
                    }} />}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        reviews: state.requests.allreviews,
        total: state.requests.totalallreviews
    };
};

export default connect(mapStateToProps)(AllReviews);
