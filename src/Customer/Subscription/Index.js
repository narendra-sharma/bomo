import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SubscriptionSteps from "./SubscriptionSteps";
import PaymentHistory from "../../Common/PaymentHistory";
import SubscriptionStatus from "../Sahred/SubscriptionStatus";
import { isSubscription } from "../../reduxdata/rootAction";
import NewRequestShared from "../Sahred/NewRequestShared";
import { format } from "date-fns";
const Subscription = ({ user }) => {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const getSubscription = async () => {
    await isSubscription(user).then(r => {
      setIsSubscribe(r);
    });
  }
  useEffect(() => {
    getSubscription();
  }, []);
  const getDifferece = () => {
    const now = new Date();
    const nextBillingDate = new Date(user?.subscription?.next_billing_date);
    const timeDifference = nextBillingDate.getTime() - now.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }
  return (
    <>
      <div className=" ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          {isSubscribe && <>
            <div className="mx-md-3 mx-lg-5 mb-4 row">
              <div className="offset-lg-3 col-lg-4 col-md-5">
                <p className="mb-md-0 mb-3">{user?.subscription.status==='inactive'?'Your subscription will end in ':user?.subscription.status==='paused'? 'Your paused plan auto renews in ':'Your subscription plan auto renews in '} <span className="fw-bold">{getDifferece()} days</span> <span className="d-block">You have <span className="fw-bold">{user?.quantity} requests</span> left until {user && format(new Date(user?.next_billing_date), 'MMM dd')}</span></p></div>
              <div className="col-md-7 col-lg-5">
                <NewRequestShared />
              </div>
            </div>
            <div className="review-main-content mb-5">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>Subscription</h3>
              </div>
              <SubscriptionStatus user={user} />
            </div>
          </>}
          <SubscriptionSteps user={user} />
          <PaymentHistory />
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Subscription);
