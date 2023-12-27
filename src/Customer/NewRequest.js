import React from "react";
import { Link } from "react-router-dom";

const NewRequest = () => {
    return (
        <>
           <div className="ml-md-auto pt-4 ms-md-auto rightside-wrapper">
               <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                 <div className="review-main-content text-center mb-4">
                    <h3>New Request</h3>
                    <p className="text-secondary">Sunday 16 Dec, 2023<span className="d-block">Barcelona, 21:43</span>  </p>
                 </div>
                 <div className="mt-5 new-request-form">
                    <form>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                        <label className="ms-3 mb-1">Request Name</label>
                                        <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="form-group">
                                        <label className="ms-3 mb-1">Brand Profile</label>
                                        <select type="select" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <label className="ms-3 mb-1">Description</label>
                                            <textarea className="form-control w-100" placeholder="
                                            Describe the Brief for this piece. Include as much info as possible.
                                            Tone and Style
                                            Target Audience
                                            Goal of the Piece
                                            Display Platform
                                            Duration"  ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 review-content">
                                <div className="mb-4">
                                    <label className="ms-3 mb-1">Request Type</label>
                                    <div className="form-control py-3">
                                        <div className="d-flex justify-content-between request-type mb-2">
                                            <div className="request-list"><p className="short0ad logo">Logo</p></div>
                                            <div className="request-list">
                                            <p className="short0ad ">short ad</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad web-animation">web animation</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad icon bg-transparent">icon</p>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between request-type mb-2">
                                            <div className="request-list"><p className="short0ad typography">tyography</p></div>
                                            <div className="request-list">
                                            <p className="short0ad brand-element">Brand Element</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad intro bg-transparent">intro</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad icon bg-transparent">ourto</p>
                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-between request-type ">
                                            <div className="request-list"><p className="short0ad transition">transition</p></div>
                                            <div className="request-list">
                                            <p className="short0ad ui-animation">Ui animation</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad loop bg-transparent">loop</p>
                                            </div>
                                            <div className="request-list">
                                            <p className="short0ad project-assets">custom</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="ms-3 mb-1">File Type</label>
                                            <select type="select" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="ms-3 mb-1">(Size Up to 2)</label>
                                            <select type="select" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="ms-3 mb-1">Refernces</label>
                                            <input type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label className="ms-3 mb-1">Transparency</label>
                                            <select type="select" className="form-control"/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 review-content">
                                <label className="ms-3 mb-1">Upload Files</label>
                                <input type="text" className="form-control"/>
                                <p className="mt-3">You have created <b>5 pieces </b>this month. <br/>You can create 4 more pieces. Subscription renews on Nov 17</p>

                            </div> 
                            <div className="col-md-12 mt-5 pt-5 text-center status-btn ">
                                <button type="submit" className="btn border rounded-pill pause-btn w-25 py-2">Submit</button>
                            </div>  
                            <Link to="/request-status" className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>                
                        </div>
                    </form>
                 </div>
                
              </div>
              <div className="bg-gray-dark py-5">  
                <div className="d-flex justify-content-center align-items-center">
                    <p className="text-dark"><b>Not ready yet? </b><span className="d-block">Draft it and finish later</span></p>
                    <button type="btn" className ="py-1 px-4  border bg-white ms-3 rounded-pill"> Save as a <span className="fw-bold">Draft</span></button>              </div>

                </div>
             
            </div>
        </>
    )
}

export default NewRequest;