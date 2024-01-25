import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png"; 


const RequestBrief = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll">
                <Modal.Body>
                    <div className=" px-5 py-5 px-md-5 review-content ">
                        <div className="row align-items-center">
                            <div className="col-md-7 col-12">
                                <div className="mb-4">
                                    <h2 className="h3 fw-bold">Intro SS23 campaign</h2>
                                </div>
                            </div>
                            <div className="col-md-5 col-12">
                                <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                    <span class="deadline-date status position-relative deliver-now-btn">Deadline in <span class="fw-bold">01:12:33</span></span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-flex align-items-center mb-3">
                                    <p className="short0ad rounded-pill">short</p>
                                    <p class="short0ad dor rounded-pill">DOR</p>
                                    <p className="brand-assets-btn rounded bg-white" >Brand Assets</p>
                                </div>
                                <div className="mb-3 position-relative">
                                   <img src={reelImage} alt="reel image" width="100%"/>
                                   <div className="project-btn"> 
                                   
                                   <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center">Project Assets</div>
                                   </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <thead>
                                            <th><p>Description</p></th>
                                            <th><p><span className="fw-bold d-block">Reference</span> </p></th>
                                            <th><p><span className="fw-bold d-block">Deliverables</span></p></th>
                                            <th><p><span className="fw-bold d-block">Format</span></p> </th>
                                            <th><p><span className="fw-bold d-block">Alpha Background</span></p> </th> 
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p>
                                                        Who is your target audience?
                                                        <span className="d-block">  What do you want to achieve with this animation?</span>
                                                        <span className="d-block">Where is this going to appear?</span></p>
                                                </td>
                                                <td><p><span className="fw-bold d-block">-</span> </p></td>
                                                <td><p><span className="fw-bold d-block">9:16</span>1:1</p></td>
                                                <td><p><span className="fw-bold d-block">.mp4</span></p> </td>
                                                <td><p>NO</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                <button type="button" class="rounded deliver-now-btn btn btn-unset w-100 fw-bold text-uppercase py-2">DELIVERY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RequestBrief;


