import React, { useEffect } from "react";
import userImage from "../images/user-img.png";
import { Modal } from "react-bootstrap";
import SubscriptionStatus from "../Customer/Sahred/SubscriptionStatus";
import { useDispatch, connect } from "react-redux";
import { get_single_data } from "../reduxdata/members/memberAction";

import { format } from "date-fns";
import { get_user_subscription_details } from "../reduxdata/PlansPayments/planActions";
import { switch_to_designer } from "../reduxdata/rootAction";
import { useNavigate } from "react-router-dom";
const ViewAsCustomer = ({
  view,
  token,
  show,
  handleClose,
  singleUserData,
  subscription,
  user,
}) => {
  const customerId = view?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (customerId) {
      get_single_data(dispatch, customerId, token);
      get_user_subscription_details(customerId, token, dispatch);
    }
  }, [customerId]);

  const getFormattedDate = (date) => {
    if (date) return format(new Date(date), "dd MMMM yyyy");
  };

  const handleswitchto_customer = async (userId) => {
    console.log("N2312312AVV", navigate);
    console.log("ABCDDEFFFF");
    await switch_to_designer(dispatch, userId, user?.token, navigate);
  };

  const ViewAsCust = () => {
    // handle view as customer
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      className="view-as-customer-popup"
    >
      <Modal.Body>
        <div className="view-customer-content py-3 px-60">
          <div className="row mb-3">
            <div className="col-md-12 col-12">
              <p className="text-center mb-3">
                <button
                  className="rounded-pill rounded-pill py-2 px-3 btn btn-outline-dark"
                  onClick={() => {
                    handleswitchto_customer(customerId);
                  }}
                >
                  View as customer
                </button>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {view?.company}{" "}
                  <span className="fw-bold d-block">Workspace</span>
                </h4>
                <div className="text-right">
                  {subscription?.subscription?.status == "active" && (
                    <p className="fw-bold mb-0">
                      Subscription renews{" "}
                      {getFormattedDate(
                        singleUserData?.subscription_renew_date
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="customer-details mb-4">
              <div className="review-main-content bg-white px-4 px-md-3 py-4 d-flex justify-content-between align-items-center rounded">
                <div className="d-flex text-right justify-content-between align-items-center">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: view?.colour ? view?.colour : "#000000",
                      borderRadius: 20,
                    }}
                  ></div>
                </div>
                <div className="">
                  <p className="mb-0 user-email  ms-1 ms-lg-2">
                    <b className=" d-md-block">Num of Admins</b>
                    <span className="d-block">
                      {singleUserData?.num_of_admins}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="mb-0 user-email  ms-1 ms-lg-2">
                    <b className=" d-md-block">Total Users</b>
                    <span className="d-block">
                      {singleUserData?.total_users}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="mb-0 user-email  ms-1 ms-lg-2">
                    <b className=" d-md-block">Total Brands</b>
                    <span className="d-block">
                      {singleUserData?.total_brands}
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="mb-0 user-email  ms-1 ms-lg-2">
                    <b className=" d-md-block">Contact email</b>
                    <span className="d-block">
                      {singleUserData?.contact_email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="customer-subscription  mb-3">
              {/* <div className="review-content bg-white rounded px-4 px-md-3 py-4">
                                <div className="row"><div className="col-lg-6 col-6">
                                    <h6 className="position-relative ps-sm-0 ps-2 mb-0"><b>
                                        Subscription Status</b><span className="d-block active-status">ACTIVE</span></h6>
                                </div>
                                    <div className="col-lg-6  text-end">
                                        <div className="status-btn d-flex justify-content-end">
                                            <button className="btn border rounded-pill pause-btn">PAUSE </button>
                                            <button className="btn border rounded-pill cancel-btn">CANCEL</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
              <SubscriptionStatus
                user={{ ...view, ...subscription, token: user.token }}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Active Request</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.num_of_active_requests}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Remainig This Period</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.remaining_this_period
                      ? singleUserData?.remaining_this_period
                      : "0"}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Request Booked/Month</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-dark mb-0">
                    {singleUserData?.request_booked_per_month ? singleUserData?.request_booked_per_month : '0' }
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Request in Feedback Queue</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.requests_in_feedback_queue
                      ? singleUserData?.requests_in_feedback_queue
                      : "0"}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Drafts</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.num_of_draft_requests ? singleUserData?.num_of_draft_requests : '0'}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Number of Requests Done</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.num_of_requests_done ? singleUserData?.num_of_requests_done : '0'}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Number of Requests Finished</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.num_of_requests_finished
                      ? singleUserData?.num_of_requests_finished
                      : "0"}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Number of Reviews Requested</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.Num_of_riviews_requested ? singleUserData?.Num_of_riviews_requested : '0'}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Avg Req Completion Time</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.avg_req_completion_time ? singleUserData?.avg_req_completion_time : '0'}
                  </h2>
                </div>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Months Subscribed</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    {singleUserData?.months_subscribed
                      ? singleUserData?.months_subscribed
                      : "0"}
                  </h2>
                </div>
                <p className="mb-0 start-date">
                  Started{" "}
                  {getFormattedDate(singleUserData?.month_subscribe_date)}
                </p>
              </div>
            </div>
            <div className="active-request-section d-flex flex-column rounded mb-4">
              <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                <p className="fw-bold">Total paid to Bomo</p>
                <div className="monthly-revenue-price text-center py-4">
                  <h2 className="text-muted mb-0">
                    $ {singleUserData?.total_paid_to_bomo ? singleUserData?.total_paid_to_bomo : '0'}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    singleUserData: state.member.singleUserData,
    subscription: state.plan.subscription,
  };
};
export default connect(mapStateToProps)(ViewAsCustomer);
