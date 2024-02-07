import React from "react";
import { Modal } from "react-bootstrap";
import designImage5 from "../images/large-nine-sixteen.png";


const ConfirmDeliver = ({isshow,viewClose}) => {
    return (
        <Modal show={isshow} size="xl" onHide={viewClose} className="logout-popup">
        <Modal.Body>
           <div className="py-5 px-60 rounded">
            <div className="delivery-status-section bg-white p-4">
                <div className="row position-relative">
                    <div class="col-md-12 col-lg-12 ">
                        <div class="d-flex justify-content-end completed-status">
                            <div className="review-content"><p class="short0ad transition ms-2 px-4">transition</p></div>
                               <div class="delivery-date text-end ps-3">
                                 <div class="fw-bold h6 mb-0">Completed<span class="d-block h6">Jan 20th</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                
                    <div className="col-md-5 d-flex text-center justify-content-center">
                        <div className="statusbar-section d-flex flex-column justify-content-between">
                            <div className="delivery-status fw-bold">9:16</div>
                            <div className="">
                            <img src={designImage5} alt="Image" />
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-5 align-self-center text-center">
                        <p className="mb-1 h6 fw-bold color-black"> Delivery 1/2 </p>
                        <div className="delivery-status fw-bold mb-3">
                            Transition Brand Video
                        </div>
                        <span className="delivery-status"><i className="fa-solid fa-circle-check"></i> </span>  
                        <span className="delivery-status delivery-cancel bg-white p-1"><i className="fa-solid fa-circle-xmark cancel"></i></span>
                        <div className="mt-3">
                            <button className="btn btn-outline-dark px-3 py-1">Next</button>
                        </div>
                    </div>

                   
                </div>
            </div>
            </div>
        </Modal.Body>
    </Modal>
    )
};

export default ConfirmDeliver;
