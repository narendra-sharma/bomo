import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import FeedBackSubmit from "./FeedBackSubmit";
import ReviewSubmit from "./ReviewSubmit";

const ConfirmDeliver = ({ isshow, viewClose }) => {
    const [feed, setFeed] = useState(false);
    const [issucess, setIssucess] = useState(false);
    return (
        <div>
            <Modal show={isshow} size="xl" onHide={viewClose} className="logout-popup">
                <Modal.Body>
                    <div>
                        <h1>Transition Band Video</h1>
                        <i className="fa-solid fa-check-circle text-success" onClick={() => setIssucess(true)}></i>
                        <i className="fa-solid fa-circle-xmark cancel" onClick={() => setFeed(true)}></i>
                    </div>
                </Modal.Body>
            </Modal>
            <FeedBackSubmit show={feed} handleClose={() => setFeed(false)}/>
            <ReviewSubmit show={issucess} handleClose={() => setIssucess(false)}/>
        </div>
    )
};

export default ConfirmDeliver;
