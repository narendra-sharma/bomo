import React from "react";

const Subscription = () => {
    return(
        <>
           <div className="col-md-9 col-lg-10 ml-md-auto py-4 ms-md-auto">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                    <div className="mx-md-3 mx-lg-5 mb-4 row">
                        <div className="offset-lg-3 col-lg-4">
                            <p className="mb-0">Your plan auto renews in 17 days<span className="d-block">You have 5 requests left until NOV 17</span></p></div>
                        <div className="col-md-5">
                            <div className="d-flex justify-content-md-end">
                                <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                                    <div className="new-request rounded-pill px-4 py-2 fw-bold">New Request</div>
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
                        <div className="review-content bg-white px-4 px-md-5 py-5">
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="status position-relative"><b>Status</b><span className="d-block">ACTIVE</span></p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="status-btn d-flex justify-content-end">
                                        <button className="btn border rounded-pill pause-btn ">PAUSE </button>
                                        <button className="btn border rounded-pill cancel-btn">CANCEL</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="review-main-content modify-subscription text-center bg-white py-5">
                        <h2>Modify your <span className="subscription-heading">Subscription</span> </h2>
                        <h4>Your current plan includes 12 pieces per month. Need to change it?</h4>
                        <div className="pt-5 pb-4">
                            <div className="subscription-count">25</div>
                            <div className="subscription-total">
                                <strong>New total </strong><span>$ 5350</span> 
                            </div>
                            <p className="text-gray">Before $2750</p>
                        </div>
                        <div className="mb-5">
                            <button type="button" className="btn update-btn rounded-pill px-5 fw-bold">Update</button>
                        </div>
                        <p>Subscriptions are billed monthly at the start of the period.</p>
                    
                    </div>
               </div>
            </div>
        </>
    )
}
export default Subscription;