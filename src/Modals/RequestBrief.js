import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png"; 
import ColorCode from "../Common/ColorCode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deliever_request_details } from "../reduxdata/rootAction";


const RequestBrief = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeliever = (requestdata) => {
        navigate('/deleiver-request');
        dispatch(deliever_request_details(requestdata));
    };
    const formatTime = (timeRemaining) => {
        const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
        const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll">
                <Modal.Body>
                    <div className=" px-5 py-5 px-md-5 review-content ">
                        <div className="row align-items-center">
                            <div className="col-md-7 col-12">
                                <div className="mb-4">
                                    <h2 className="h3 fw-bold">{data?.request_name}</h2>
                                </div>
                            </div>
                            <div className="col-md-5 col-12">
                                <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                    <span class="deadline-date status position-relative deliver-now-btn">Deadline in <span class="fw-bold">{formatTime(data?.timeRemaining20Hrs)}</span></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-center mb-3">
                                    <ColorCode request={data}/>
                                    <p class="short0ad dor rounded-pill">{data?.brand_profile?.brandname}</p>
                                    <p className="brand-assets-btn rounded bg-white request-poll-active" >Brand Assets</p>
                                </div>
                            </div>
                            <div className="col-md-6 delivery-date-content">
                                <div class="text-end mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><span class="fw-bold"> Delivery Date</span>
                                           <span class="d-block">Mon 10 - 9:00</span>
                                        </div>
                                        <div><h5 class="fw-bold mb-0">$125</h5></div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3 position-relative">
                                   <img src={reelImage} alt="reel imag" width="100%"/>
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
                                                        <span className="d-block">{data?.description}</span>
                                                    </p>
                                                </td>
                                                <td><p><span className="fw-bold d-block">{data?.references}</span> </p></td>
                                                <td><p><span className="fw-bold d-block">{data?.size}</span></p></td>
                                                <td><p><span className="fw-bold d-block">{data?.file_type}</span></p> </td>
                                                <td><p>{data?.transparency}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                <button type="button" class="rounded deliver-now-btn btn btn-unset w-100 fw-bold text-uppercase py-2" onClick={() => handleDeliever(data)}>DELIVERY NOW</button>
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


