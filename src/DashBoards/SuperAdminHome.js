import React from "react";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import designImage3 from "../images/sixteen-nine2.png";
import AssignRequest from "../Customer/Requests/AssignRequest";
import { connect } from "react-redux";

const SuperAdminHome = ({totalassigns}) => {
    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content">
                    <div className="mb-5">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Approve Request</h3>
                            <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                                <small>12 Action Needed</small>
                            </div>
                        </div>
                        <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                            <div className="row">
                                <div className="col-lg-12">
                                    <small className="text-muted fw-bold">
                                        12 requests left{" "}
                                    </small>
                                </div>
                                <div className="col-lg-6">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>12h</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p className="short0ad">short ad</p>{" "}
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Cratat</span>{" "}
                                                            <span className="d-block">Dior</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>Ad ss23 Winter</p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">
                                                                Expand Request
                                                            </span>{" "}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <i className="fa-solid fa-circle-check checked-circle"></i>{" "}
                                                        <i className="fa-solid fa-circle-xmark cancel"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>12h</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p className="short0ad">short ad</p>{" "}
                                                    </td>

                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Cratat</span>{" "}
                                                            <span className="d-block">Dior</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>Ad ss23 Winter</p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">
                                                                Expand Request
                                                            </span>{" "}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <i className="fa-solid fa-circle-check checked-circle"></i>{" "}
                                                        <i className="fa-solid fa-circle-xmark cancel"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>12h</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p className="short0ad">short ad</p>{" "}
                                                    </td>

                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Cratat</span>{" "}
                                                            <span className="d-block">Dior</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>Ad ss23 Winter</p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">
                                                                Expand Request
                                                            </span>{" "}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <i className="fa-solid fa-circle-check checked-circle"></i>{" "}
                                                        <i className="fa-solid fa-circle-xmark cancel"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>12h</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p className="short0ad">short ad</p>{" "}
                                                    </td>

                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Cratat</span>{" "}
                                                            <span className="d-block">Dior</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>Ad ss23 Winter</p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">
                                                                Expand Request
                                                            </span>{" "}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <i className="fa-solid fa-circle-check checked-circle"></i>{" "}
                                                        <i className="fa-solid fa-circle-xmark cancel"></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Assign Request</h3>
                            <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                                <small>{totalassigns} Action Needed</small>
                            </div>
                        </div>
                        <AssignRequest />
                    </div>
                    <div className="mb-5">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Approve Delivery</h3>
                            <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                                <small>5 Action Needed</small>
                            </div>
                        </div>
                        <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                            <div className="row">
                                <div className="col-lg-12">
                                    <small className="text-muted fw-bold">
                                        5 requests left{" "}
                                    </small>
                                </div>
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>12h</p>
                                                    </td>
                                                    <td className="text-center">
                                                        <p className="short0ad typography">
                                                            typography
                                                        </p>{" "}
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Cratat</span>{" "}
                                                            <span className="d-block">Dior</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span className="fw-bold">Delivery</span>{" "}
                                                            <span className="d-block">17/03/2023</span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p>
                                                            <span>Expand Request</span>{" "}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                                            <div className="delivery-status fw-bold">
                                                                <p>9:16</p>
                                                            </div>
                                                            <div className="bar-code">
                                                                <img src={designImage} alt="Image" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                                            <div className="delivery-status fw-bold">
                                                                <p>16:9</p>
                                                            </div>
                                                            <div className="bar-code">
                                                                <img src={designImage2} alt="Image" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                                            <div className="delivery-status fw-bold">
                                                                <p>.aep</p>
                                                            </div>
                                                            <div className="bar-code">
                                                                <img src={designImage3} alt="Image" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <button className="btn btn-sm btn-outline-success rounded-pill">
                                                                Approve Delivery
                                                            </button>
                                                            <i className="fa-solid fa-circle-xmark cancel"></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 review-content">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Overall Stats</h3>
                        </div>
                        <div className="row">
                            <div className="monthly-revenue-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Monthly revenue</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$98500</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Total Designers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">321</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Desgigners active last month</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">101</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Total Customers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">87</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Requests Finished</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">1022</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 review-content">
                        <div className="row">
                            <div className="monthly-revenue-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Average Request completion time</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">37 hours</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Average number of reviews</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">1.2</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Average number of reviews</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">8</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Total paid to Designers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$250450</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Pending to be paid</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$18370</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 review-content">
                        <div className="row">
                            <div className="monthly-revenue-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Average Applications / request</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">87</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">On Feedback Queue</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">94</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Drafts</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">227</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Total charged to Customers </p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$571200</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded">
                                    <p className="fw-bold">Late Delivered Requests</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">31</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        totalassigns: state.requests.totalassigns,
    };
};
export default connect(mapStateToProps)(SuperAdminHome);
