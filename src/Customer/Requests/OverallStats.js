import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_overall_stats } from "../../reduxdata/rootAction";
import { useDispatch } from "react-redux";

const OverallStats = ({user,overallstats}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        get_overall_stats(dispatch,user?.token);
    },[dispatch,user?.token]);
    return (
        <div>
            <div className="mb-3 review-content">
                <div className=" d-flex align-items-center mb-3">
                    <h3 className="mb-0 mx-2 mx-md-4">Overall Stats</h3>
                </div>
                <div className="row">
                    <div className="monthly-revenue-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Monthly revenue</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">${overallstats?.monthly_revenue}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Total Designers</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.total_designers}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Desginers active last month</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.designers_active_last_month}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Total Customers</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.total_customers}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Requests Finished</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.requests_finished}</h2>
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
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.avg_req_completion_time} hours</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Average number of reviews</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.avg_no_of_reviews}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Average requests / month</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.avg_req_per_month}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Total paid to Designers</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">${overallstats?.total_paid_to_designer}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Pending to be paid</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">${overallstats?.pending_to_be_paid}</h2>
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
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">
                                    {overallstats?.avg_application_or_req}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">On Feedback Queue</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.on_feedback_queue}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Drafts</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.drafts}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Total charged to Customers </p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">${overallstats?.total_charge_to_customer}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="designers-section d-flex flex-column rounded">
                        <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                            <p className="fw-bold">Late Delivered Requests</p>
                            <div className="monthly-revenue-price text-center pt-1 pb-4">
                                <h2 className="text-muted mb-0">{overallstats?.late_delivery_req}</h2>
                            </div>
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
      overallstats: state.auth.overallstats
    };
  };
  
  export default connect(mapStateToProps)(OverallStats);
