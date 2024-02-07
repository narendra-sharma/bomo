import React from "react";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import designImage3 from "../images/sixteen-nine2.png";
import AssignRequest from "../Customer/Requests/AssignRequest";
import { connect } from "react-redux";
import ApproveDelivery from "../Customer/Requests/ApproveDelivery";
import ApproveRequest from "../Customer/Requests/ApproveRequest";

const SuperAdminHome = ({totalassigns,approvelist}) => {
    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content">
                    <div className="mb-5">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Approve Request</h3>
                            <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                                <small>{approvelist?.length} Action Needed</small>
                            </div>
                        </div>
                        <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                            <ApproveRequest/>
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
                                <small>{approvelist?.length} Action Needed</small>
                            </div>
                        </div>
                        <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                           <ApproveDelivery />
                        </div>
                    </div>
                    <div className="mb-3 review-content">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Overall Stats</h3>
                        </div>
                        <div className="row">
                            <div className="monthly-revenue-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Monthly revenue</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$98500</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Total Designers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">321</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Desgigners active last month</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">101</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Total Customers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">87</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
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
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Average Request completion time</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">37 hours</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Average number of reviews</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">1.2</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Average number of reviews</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">8</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Total paid to Designers</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$250450</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
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
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Average Applications / request</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">87</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">On Feedback Queue</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">94</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Drafts</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">227</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Total charged to Customers </p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">$571200</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="designers-section d-flex flex-column rounded">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
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
        approvelist: state.requests.superadminapprovelist,
    };
};
export default connect(mapStateToProps)(SuperAdminHome);
