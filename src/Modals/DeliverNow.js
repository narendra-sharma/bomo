import React, { useState,useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { designer_deliever_request } from "../reduxdata/rootAction";
import DeliverSuccess from "./DeliverSuccess";


const DeliverNow = ({ show, handleClose, detail, user, currentdata }) => {
    const [isDeliver, setIsDeliver] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        designer_deliever_request(dispatch, user?.token, detail, navigate);
        handleClose();
        setIsDeliver(true);
    };
    useEffect(() => {
        if(isDeliver) {
            setTimeout(() => {
                setIsDeliver(false);
            },5000);
        };
      }, [isDeliver]);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="px-4 py-4">
                        <div className="d-flex align-items-center justify-content-end mb-3">
                        </div>
                        <h5 className="mb-0 fw-bold text-dark">{user?.name}</h5>
                        <p className="text-mute">
                            Double check,double win
                            <br />
                            Once delivered you <b>won't be able to edit</b> any file.
                            <br />
                            Happy with your uploads? Hit deliver:)
                        </p>
                        <Button variant="success" className="w-100 rounded-pill btn-outline-dark" onClick={handleSubmit}>
                            DELIVER NOW
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <DeliverSuccess show={isDeliver} handleClose={() => setIsDeliver(false)} data={currentdata}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(DeliverNow);