import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_plans } from "../../reduxdata/rootAction";
import { Link } from "react-router-dom";
import SubscriptionSteps from "./SubscriptionSteps";
import PaymentHistory from "./PaymentHistory";
import SubscriptionStatus from "../Sahred/SubscriptionStatus";
const Subscription = () => {
  const [plan, setPlan] = useState(null);
  return (
    <>
      <div className=" ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          {plan && <>
            <div className="mx-md-3 mx-lg-5 mb-4 row">
              <div className="offset-lg-3 col-lg-4">
                <p className="mb-md-0 mb-3">Your plan auto renews in 17 days<span className="d-block">You have 5 requests left until NOV 17</span></p></div>
              <div className="col-md-5">
                <div className="d-flex justify-content-md-end">
                  <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                    <Link className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
                    <div className="request-date ms-2"><p className="mb-0"><span>21:43</span>
                      <span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-main-content mb-5">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>Subscription</h3>
              </div>
              <SubscriptionStatus plan={plan}/>
            </div>
          </>}
          <SubscriptionSteps plan={plan} />
          <PaymentHistory />
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    plans: state.plan.plans,
  };
};

const mapDispatchToProps = () => {
  return {
    get_plans,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);