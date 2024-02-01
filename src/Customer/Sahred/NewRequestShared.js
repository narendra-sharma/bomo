import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isSubscription } from "../../reduxdata/rootAction";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const NewRequestShared = ({ user }) => {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');
  const [isSubscribe,setIsSubscribe]=useState(false);
    const getSubscription=async()=>{
      await isSubscription(user).then(r=>{
         setIsSubscribe(r);
      });
    }
    useEffect(()=>{
      getSubscription();
    },[]);
    const getGraceTime = () => {
      const now = new Date();
      const nextBillingDate = new Date(user?.subscription?.next_billing_date);
      const timeDifference = nextBillingDate.getTime() - now.getTime();
      const daysDifference = (now===nextBillingDate)?Math.ceil(timeDifference / (1000 * 60 * 60 * 24)):0;
      return daysDifference;
    }
  return (
    ((isSubscribe) && (user?.subscription?.status!=='paused') && user?.quantity) && <div className="d-flex justify-content-md-end">
      <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
        <Link to="/new-request" className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
        <div className="request-date ms-2"><p className="mb-0"><span>{currentTime}</span><span className="d-block">{format(now, 'EEE dd MMM, yyyy')} </span></p></div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};


export default connect(mapStateToProps)(NewRequestShared);
