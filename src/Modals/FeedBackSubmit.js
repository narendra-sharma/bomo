import React from "react";
import {Button , Modal } from "react-bootstrap";

const FeedBackSubmit = ({show,handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
            <Modal.Body className="py-5">
                <div className="py-5 px-60 ">
                    <div className="w-50 m-auto my-">
                    <h5 className="mb-0 fw-bold">Specify what needs to be modified</h5>
                    <div className="feedback-submit-popup extra-grren rounded border border-dark my-4 p-4"> 
                        <p className="text-mute">Is the animation true to the brief? <br/>Are color changes needed?
                        <br/>Fonts and typography need adjustments?<br/>Flow, timing, clarity. The more specific the better.</p>
                    </div>
                    <div className="d-flex gap-3 justify-content-center mt-3 pt-4">
                        <div className="col-md-8">
                        <Button variant="light" className="w-100 rounded-pill btn-outline-dark" >
                            Add Feedback
                        </Button>
                        </div>
                    </div>

                    </div>
                     
                   
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default FeedBackSubmit;
