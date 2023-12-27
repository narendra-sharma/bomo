import React from "react";

const SubscriptionStatus = ({plan,isSetting}) => {
  const Status=()=>{
    return <>
      <b>{isSetting && 'Subscription'} Status</b>
      <span className="d-block">ACTIVE</span>
    </>
  }
  return (
    <div className={`review-content bg-white rounded px-4  ${isSetting?'px-md-4 py-4':'px-md-5 py-5'}`}>
      <div className="row">
        <div className="col-lg-6 col-6">
          {isSetting?
          <h6 className="position-relative ps-sm-0 ps-2 mb-0">
            <Status/>
          </h6>
          :<p className="status position-relative ps-sm-0 ps-2">
            <Status/>
          </p>}
        </div>
        <div className={`col-lg-6 col-6 ${isSetting && 'text-end'}`}>
          <div className="status-btn d-flex justify-content-end">
            <button className="btn border rounded-pill pause-btn ">PAUSE </button>
            <button className="btn border rounded-pill cancel-btn">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionStatus;