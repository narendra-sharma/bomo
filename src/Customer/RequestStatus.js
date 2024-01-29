import React from "react";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import designImage3 from "../images/nine-sixteen-1.png";
import designImage4 from "../images/sixteen-nine2.png";

const RequestStatus = () => {
    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                    <div className="mx-md-2 mx-lg-4 mx-xl-5 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                          <p className="mb-0">Order completed 
                            <span className="d-block fw-bold">All good! You approved this order and files are ready to be used</span></p>
                        </div>
                        <div className="bg-white px-5 py-4 review-main-content rounded">
                            <h3>Transition Brand Video</h3>
                            <div className="review-content mt-3">
                                <div className="d-flex">
                                    <p className="short0ad transition transition-bg">Transition</p>
                                    <p className="short0ad dor rounded-pill ms-2">DOR</p>
                                    <p className="short0ad project-assets ms-2 px-4">Project Assets</p>
                                </div>
                            </div>
                            <div className="delivery-date text-end mb-3">
                                <div className="fw-bold h6">Delivered on<span className="d-block fw-medium h6">Jan 20th 17:22</span></div>
                            </div>
                            <div className="table-responsive">
                                <table className="table request-status table-borderless mb-0">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Size</th>
                                            <th>File Type </th>
                                            <th>Transparency</th>
                                            <th>References</th>
                                        </tr>
                                        </thead>
                                    <tbody>
                                        <tr>
                                            <td>Who is your target audience? <span className="d-block">What do you want to achieve with this animation?</span> 
                                            <span className="d-block">Where is this going to appear?</span></td>
                                            <td>9:16<span className="d-block">1:1</span></td>
                                            <td> .mp4</td>
                                            <td>No</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="delivery-status-section p-4 rounded mt-4">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 align-self-center">
                                        <div className="delivery-status fw-bold mb-2">
                                        <i className="fa-solid fa-circle-check"></i>  Delivery Accepted
                                        </div>
                                        <p className="status-date text-secondary">
                                            17/03/2023 14:11
                                        </p>
                                    </div>
                                    <div className="col-md-4 d-flex text-center justify-content-center">
                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                            <div className="delivery-status fw-bold">9:16</div>
                                            <div className="bar-code">
                                            <img src={designImage} alt="Image" />
                                            </div>
                                            <div className="download-btn">
                                                <button className="rounded-pill px-3 py-1 fw-bold">Download</button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex text-center justify-content-center">
                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                            <div className="delivery-status fw-bold">16:9</div>
                                            <div className="bar-code">
                                            <img src={designImage2} alt="Image" />
                                            </div>
                                            <div className="download-btn">
                                                <button className="rounded-pill px-3 py-1 fw-bold">Download</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="delivery-status-section active-request p-4 rounded mt-4">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 align-self-center">
                                        <div className="delivery-status fw-bold mb-2">
                                        <i className="fa-solid fa-circle-minus minus"></i>  Delivery Expected
                                        </div>
                                        <p className="status-date text-secondary">
                                            17/03/2023 14:11
                                        </p>
                                    </div>
                                    <div className="col-md-4 d-flex text-center justify-content-center">
                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                            <div className="delivery-status fw-bold">9:16</div>
                                            <div className="bar-code">
                                            <img src={designImage3} alt="Image" />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex text-center justify-content-center">
                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                            <div className="delivery-status fw-bold">16:9</div>
                                            <div className="bar-code">
                                            <img src={designImage4} alt="Image" />
                                            </div>
                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Feedback Request */}

                            <div className="feedback-request  p-4 mt-4 rounded">
                            <p className="status-date text-secondary">17/03/2023 14:11</p>
                            <h5 className="fw-bold">Feedback Requested</h5>
                            <p>Who is your target audience? 
                            <span className="d-block">What do you want to achieve with this animation? </span>
                            <span className="d-block">Where is this going to appear?</span></p>

                            </div>

                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestStatus;