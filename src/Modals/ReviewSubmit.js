import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DeliverFiles from "./DeliverFiles";

const ReviewSubmit = ({ show, handleClose }) => {
    const [ispop, setIspop] = useState(false);
    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
                <Modal.Body className="py-5">
                    <div className="py-5 px-60 ">
                        <div className="review-submit-popup extra-grren rounded my-5 p-5">
                            <h5 className="mb-0 extra-dark-green fw-bold">User,</h5>
                            <p className="extra-dark-green"> Are you satisfied with the delivery?
                                <br />Once approved you won’t be able to ask for further reviews.</p>
                            <p className="extra-dark-green">Confirm to get your files.</p>
                            <div className="d-flex gap-3 mt-4 pt-4">
                                <div className="col-md-8">
                                    <Button variant="unset" className="w-100 rounded-pill btn-outline-dark" onClick={() => setIspop(true)}>
                                        YES
                                    </Button>
                                </div>
                                <div className="col-md-4">
                                    <Button variant="unset" className="w-100 rounded-pill btn-outline-dark" >
                                        NO
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <DeliverFiles show={ispop} onClose={() => setIspop(false)} />
        </div>
    )
}
export default ReviewSubmit;