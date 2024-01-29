import React from "react";
import plusImage from '../images/plus-img.png';
const DelieverRequest = () => {
    return (
        <>
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                    <div className="mx-md-0 mx-lg-4 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                          <p className="mb-0 extra-dark-green"> DELIVER NOW. This request is in Production  <span className="d-block fw-bold">Delivery in 00:17:12
                        </span></p>
                        </div>
                        <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 mb-4">
                                <h3>Intro SS23 campaign</h3>
                                <div className="review-content mt-3">
                                    <div className="d-flex">
                                        <p className="short0ad">short ad </p>
                                        <p className="short0ad dor rounded-pill ms-2">DOR</p>
                                        <p className="short0ad project-assets ms-2 px-4">Project Assets</p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-5 col-lg-6 mb-3">
                                    <div className="d-flex  justify-content-end">
                                        <h3>$125</h3>
                                    <div className="delivery-date text-end ps-5">
                                       <div className="fw-bold h6">Completed<span className="d-block h6">Jan 20th</span></div>
                                    </div>

                                    </div>
                                   
                                </div>
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table request-status designer-request-status table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Size</th>
                                                    <th>File Type </th>
                                                    <th>Transparency</th>
                                                    <th className="text-end">References</th>
                                                </tr>
                                                </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Who is your target audience? <span className="d-block">What do you want to achieve with this animation?</span> 
                                                    <span className="d-block">Where is this going to appear?</span></td>
                                                    <td>9:16<span className="d-block">1:1</span></td>
                                                    <td> .mp4</td>
                                                    <td>No</td>
                                                    <td className="text-center">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="ready-to-delivery-section border border-dark p-5 bg-gray mt-4"> 
                               <p><span className="fw-bold">Ready to Deliver?</span> Place each file in its corresponding folder</p>
                                <div className="row align-items-center">
                                    <div className="col-md-3 d-flex flex-column">
                                        <h5 className="text-center mb-2"> <span className="uplaod-dimension border border-dark d-inline-block"></span>  Upload 9:16 .mp4
                                           
                                        </h5>
                                        <div className="upload-nine-mp4">
                                            <div className="d-flex align-item-center justify-content-center mb-4">
                                                <label class="uploadFile">
                                                <span class="filename"><i className="fa fa-plus"></i></span>
                                                <input name="uploadFiles" type="file" className="inputfile form-control" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-3 d-flex flex-column">
                                        <h5 className="text-center mb-2">
                                         <span className="uplaod-dimension sixteen-nine border border-dark d-inline-block"></span>  Upload 16:9 .mp4
                                         </h5>
                                        <div className="upload-nine-mp4">
                                            
                                            <div className="d-flex align-item-center justify-content-center mb-4">
                                                <label class="uploadFile">
                                                <span class="filename"><i className="fa fa-plus"></i></span>
                                                <input name="uploadFiles" type="file" className="inputfile form-control" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 d-flex flex-column">
                                       <h5 className="text-center mb-2">
                                            .zip and upload your .AEP
                                        </h5>
                                        <div className="upload-zip-file">
                                       
                                            <div className="d-flex align-item-center justify-content-center mb-4">
                                                <label class="uploadFile">
                                                <span class="filename"><i className="fa fa-plus"></i></span>
                                                <input name="uploadFiles" type="file" className="inputfile form-control" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div class="status-btn"><button class="btn pause-btn rounded-pill py-2 px-4">DELIVERY NOW</button> </div>
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

export default DelieverRequest;
