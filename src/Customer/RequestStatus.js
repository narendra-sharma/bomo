import React from "react";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";

const RequestStatus = () => {
    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                    <div className="mx-md-2 mx-lg-5 px-60 ">
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
                                <div className="delivery-date text-end mb-3">
                                    <p className="fw-bold h6">Delivered on<span className="d-block fw-medium h6">Jan 20th 17:22</span></p>

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
                                    <div className="row justify-content-center align-item-center">
                                        <div className="col-md-4">
                                            <div className="delivery-status fw-bold mb-2">
                                               Delivery Accepted
                                            </div>
                                            <p className="status-date text-secondary">
                                               17/03/2023 14:11
                                            </p>
                                        </div>
                                        <div className="col-md-4 d-flex text-center">
                                            <div className="statusbar-section d-flex flex-column">
                                                <div className="delivery-status fw-bold">9:16</div>
                                                <div className="bar-code">
                                                <img src={designImage} alt="Image" />
                                                </div>
                                                <div className="download-btn">
                                                    <button className="rounded-pill border px-3 py-1">Download</button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex text-center">
                                            <div className="statusbar-section d-flex flex-column">
                                                <div className="delivery-status fw-bold">9:16</div>
                                                <div className="bar-code">
                                                <img src={designImage2} alt="Image" />
                                                </div>
                                                <div className="download-btn">
                                                    <button className="rounded-pill border px-3 py-1">Download</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestStatus;