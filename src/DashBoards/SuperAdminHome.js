import React, { useEffect } from "react";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import designImage3 from "../images/sixteen-nine2.png";
import AssignRequest from "../Customer/Requests/AssignRequest";
import { connect } from "react-redux";
import ApproveDelivery from "../Customer/Requests/ApproveDelivery";
import ApproveRequest from "../Customer/Requests/ApproveRequest";
import OverallStats from "../Customer/Requests/OverallStats";
import ActiveDeliveries from "../SuperAdmin/ActiveDeliveries";
import { get_designer_active_requestslist } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";

const SuperAdminHome = ({ user, totalassigns, approvelist, total, activerequest }) => {
    const declinetype = "decline/nondecline";
    const dispatch = useDispatch();

    useEffect(() => {
        get_designer_active_requestslist(dispatch, user?.token, declinetype);
    }, [dispatch]);

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content">
                    {activerequest?.length > 0 &&
                        <div className="mb-5">
                            <ActiveDeliveries />
                        </div>
                    }
                    <div className="mb-5">
                        <div className=" d-flex align-items-center mb-3">
                            <h3 className="mb-0 mx-2 mx-md-4">Approve Request</h3>
                            <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                                <small>{total} Action Needed</small>
                            </div>
                        </div>
                        <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                            <ApproveRequest />
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
                    <OverallStats />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        totalassigns: state.requests.totalassigns,
        approvelist: state.requests.superadminapprovelist,
        total: state.requests.pendingTotal,
        activerequest: state.requests.activerequest,
    };
};
export default connect(mapStateToProps)(SuperAdminHome);
