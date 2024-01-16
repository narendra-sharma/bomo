import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { get_admin_assign_requestlist } from "../../reduxdata/rootAction";
import EmptyList from "../../Common/EmptyList";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";
import CustomPagination from "../../Common/CustomPagination";

const AssignRequest = ({ user, assignrequests, totalassigns }) => {
    const dispatch = useDispatch();
    const usertoken = user.token;
    console.log(assignrequests);

    useEffect(() => {
        get_admin_assign_requestlist(dispatch, usertoken, 1, 10);
    }, [dispatch, usertoken]);

    return (
        <>
            {assignrequests.length > 0 ? assignrequests.map((request) => (
                <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3 design-list-section">
                    <div className="row">
                        <div className="col-lg-12">
                            <small className="text-muted fw-bold">
                                2 requests left{" "}
                            </small>
                        </div>
                        <div className="col-lg-5 g-0">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>12h</p>
                                            </td>
                                            <td className="text-center">
                                                <ColorCode request={request} />
                                            </td>
                                            <td>
                                                <p>
                                                    <span className="fw-bold">Delivery</span>{" "}
                                                    <span className="d-block">{!request?.delivery_date
                                                        ? "No Date"
                                                        : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    <span className="fw-bold">Cratat</span>{" "}
                                                    <span className="d-block">Dior</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    <span>Expand Request</span>{" "}
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    Assign Request{" "}
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <p className="text-center mb-1">Top 10 Talent</p>
                            <ul className="talented-designer  rounded list-unstyled">
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Designerito
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Joosieteee
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Reservetest
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 g-0">
                            <ul className="talented-designer designer-list rounded list-unstyled">
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Designerito
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Joosieteee
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Reservetest
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            Motiongeud
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-1 align-self-center">
                            <button className="btn btn-sm btn-outline-dark rounded-pill">
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )) : <EmptyList name="Assign Request" />}
            {totalassigns > 0 && (
                <CustomPagination
                    total={totalassigns}
                    onPageChange={(newPage, newLimit) => {
                        get_admin_assign_requestlist(dispatch, usertoken, newPage, newLimit);
                    }}
                />
            )}
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        assignrequests: state.requests.assignrequests,
        totalassigns: state.requests.totalassigns,
    };
};
export default connect(mapStateToProps)(AssignRequest);
