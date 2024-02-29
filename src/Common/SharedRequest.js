import React from "react";
import NewRequestShared from "../Customer/Sahred/NewRequestShared";
import { connect } from "react-redux";
import { format } from "date-fns";

const SharedRequest = () => {
    
    const user = JSON.parse(localStorage.getItem('userDetails'));

    const getDifferece = () => {
        const now = new Date();
        const nextBillingDate = new Date(user?.subscription?.next_billing_date);
        const timeDifference = nextBillingDate.getTime() - now.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
      }
    
      const getGraceTime = () => {
        const now = new Date();
        const nextBillingDate = new Date(user?.subscription?.next_billing_date);
        const timeDifference = nextBillingDate.getTime() - now.getTime();
        const daysDifference = (now === nextBillingDate) ? Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) : 0;
        return daysDifference;
      }
    
      const getNextBillingDate = () => {
        let date;
        if (user && user?.next_billing_date) {
          const nextBillingDate = new Date(user?.next_billing_date);
          date = nextBillingDate;
        }
        return format(new Date(date), 'MMM dd');
      }

    return (
        <div className="mx-md-3 mx-lg-5 mb-4 row align-items-center">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 col-md-5 review-content">
              {user?.subscription?.status !== 'active' && (getGraceTime() > 0) && <p className="mb-md-0 mb-3">You have still grace period of <span className="fw-bold">{getGraceTime()} days</span> for remaining requests. </p>}
              <p className="mb-md-0 mb-3 text-mute text-center">{user?.subscription.status === 'inactive' ? 'Your subscription will end in ' : user?.subscription.status === 'paused' ? 'Your paused plan auto renews in ' : 'Your subscription plan auto renews in '} <span className="fw-bold">{getDifferece()} days</span> <span className="d-block">You have <span className="fw-bold">{user?.quantity} requests</span> left until {getNextBillingDate()}</span></p>
            </div>
            <div className="col-md-7 col-lg-4">
              <NewRequestShared />
            </div>
          </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userrole: state.auth.role,
      profiledetails: state.auth.profiledetails
    };
  };
  export default connect(mapStateToProps)(SharedRequest);