import React from "react";
import userImage from '../images/user-img.png';

const Setting = () => {
    return(
        <>
           <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                    <div className="mx-md-3 mx-lg-5 mb-4 row">
                        <div className="d-flex justify-content-md-end">
                            <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                                <a href="#" className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</a>
                                <div className="request-date ms-2"><p className="mb-0"><span>21:43</span>
                                <span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                            </div>
                        </div> 
                    </div>
                    <div className="review-main-content mb-5">
                        <div className="mx-md-5 mx-sm-0 mb-4">
                            <h3>Settings</h3>
                        </div>
                        <div className="d-flex justify-content-between align-item-center mb-5 rounded ps-5 px-4 py-4 subscribers">
                                <h5><strong>Subscribed for 12 pieces /month</strong></h5>
                                <div><a href="#" className="text-dark text-decoration-none">Modify my Subscription</a></div>
                            
                        </div>
                    </div>
                    <div className="">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="review-main-content bg-white px-4 py-4 d-flex justify-content-between align-items-center rounded">
                                    <div className="d-flex text-right justify-content-between align-items-center">
                                        <img src={userImage} alt="Bomo logo" />
                                            <p className="mb-0 user-email  ms-1 ms-lg-2">
                                                <b className=" d-md-block">Name</b>
                                                <span className="d-block">Bossets</span></p>
                                    </div>
                                    <div className="d-flex text-right justify-content-between align-items-center">
                
                                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                                            <b className="d-md-block">Role</b>
                                            <span className="d-block">Admin</span></p>
                                   </div>
                                   <div><a href="#" className="text-secondary mb-0 px-3 text-decoration-none">edit</a></div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="review-main-content bg-white px-4 py-4 rounded">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><h6 className="mb-0">
                                            Password<span className="d-block">*********</span>
                                        </h6></div>
                                        <div><a href="#" className="text-secondary mb-0 px-3 text-decoration-none">edit</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="review-content bg-white rounded px-4 px-md-4 py-4">
                                   <div className="row">
                                        <div className="col-lg-6 col-6">
                                            <h6 className="position-relative ps-sm-0 ps-2 mb-0"><b>Subscription Status</b><span className="d-block">ACTIVE</span></h6>
                                        </div>
                                        <div className="col-lg-6 col-6 text-end">
                                            <div className="status-btn d-flex justify-content-end">
                                                <button className="btn border rounded-pill pause-btn ">PAUSE </button>
                                                <button className="btn border rounded-pill cancel-btn">CANCEL</button>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>

                    </div>
                    <div className="review-main-content mt-5">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 d-flex flex-column">
                                <div className="mb-3">
                                    <h3>Billing Information</h3>
                                </div>
                                <div className="bg-white billing-form py-5  rounded">
                                    <div className="text-end">
                                      <a href="#" className="text-secondary mb-0 px-3 text-decoration-none">edit</a>
                                    </div>
                                    
                                   <form className="form px-60">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Name:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Surname:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Company:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Address:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                City:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Postal Code:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                              Country:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                              VAT number:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                    </div>
                                   
                              
                               
                                   </form>
                            
                      
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 d-flex flex-column">
                                <div className="mb-3">
                                    <h3>Payment info</h3>
                                </div>

                                <div className="bg-white billing-form payment-info py-5  rounded">
                                    <div className="text-end">
                                      <a href="#" className="text-secondary mb-0 px-3 text-decoration-none">edit</a>
                                    </div>
                                    <div>
                                   <form className="form px-60">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                              <label>
                                                Card Name:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                Card Number:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                              <label>
                                                CVV:</label>
                                                <input type="text" placeholder="" name="name"  className="form_control" />
                                        
                                            </div>
                                        </div>
                                        
                                      
                                    </div>
                               
                                </form>
                            
                            </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="delete-account status-btn text-end mt-3">
                        <button className="text-decoration-none btn border rounded-pill cancel-btn px-5 py-2">Delete account</button>

                    </div>
                </div>
           </div>
          
        </>
    )
}
export default Setting;