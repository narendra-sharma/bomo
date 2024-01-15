import React from "react";
import { connect } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "react-bootstrap";

const ActiveRequests = ({ isLoading }) => {
    return (
        <>{isLoading && <LoadingSpinner />}

            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content review-content ">
                    <div className="mx-md-5 mx-sm-0 mb-4"><h3 >My Active Requests</h3></div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="bg-white px-2 px-md-4 py-5 rounded">
                                        <div className="row">
                                            <div className="col-md-7 col-12">
                                                <div className="mx-md-4 mx-sm-0 mb-4">
                                                    <h2 className="h3 fw-bold">Intro SS23 campaign</h2>
                                                </div>
                                            </div>

                                            <div className="col-md-5 col-12">
                                                <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                                <p class="short0ad dor rounded-pill">DOR</p>
                                                <span class="deadline-date status position-relative deliver-now-btn">Deadline in <span class="fw-bold">01:12:33</span></span>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-12">
                                               <div className="d-flex align-items-center">
                                                    <p class="short0ad">Short Ad</p>
                                                    <p className="brand-assets">Brand Assets</p>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table request-status table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                               <td> </td>
                                                              
                                                                <td><p><span className="fw-bold d-block">Status</span></p>
                                                                Production</td>
                                                                <td><p><span className="fw-bold d-block">Expected Delivery </span>
                                                                Mon 11 - 9:00</p></td>
                                                                <td><p><span className="fw-bold d-block">Alpha Background</span></p> No</td>
                                                             
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p><span className="fw-bold d-block">Description</span>
                                                                    Who is your target audience? <span className="d-block">
                                                                    What do you want to achieve with this animation?</span> 
                                                                <span className="d-block">Where is this going to appear?</span></p>
                                                                </td>
                                                                <td><p><span className="fw-bold d-block">Reference</span></p></td>
                                                                <td><p><span className="fw-bold d-block">Deliverables</span>9:16<br/>1:1</p></td>
                                                                <td><p><span className="fw-bold d-block">Format</span></p> No</td>
                                                                <td>-</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                      </div>
                                   </div> 
                                </div>
                                 <div className="col-md-4">

                                 </div>
                          
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(ActiveRequests);
