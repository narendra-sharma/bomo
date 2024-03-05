import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { designer_deliever_request } from "../reduxdata/rootAction";
import DeliverSuccess from "./DeliverSuccess";
import Draggable from "react-draggable";
import { SUBMIT_NOW } from "../reduxdata/Requests/requestTypes";


const DeliverNow = ({ show, handleClose, detail, user, currentdata, isSubmit }) => {
    // const [isDeliver, setIsDeliver] = useState(false);
    const [isdrag, setIsdrag] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDragStart = () => {
        setIsdrag(true);
    };
   
    const handleDragStop = (event, data) => {
        if (data?.x === 0) {
            setIsdrag(false);
        }  else {
           handleSubmit();
        }
    };

    const handleSubmit = () => {
        designer_deliever_request(dispatch, user?.token, detail);
        handleClose();
    };

    const SuccessClose = () => {
        navigate('/');
        dispatch({ 
            type: SUBMIT_NOW, 
            payload: false
        });
    };

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
                        <div className={`px-1 py-1 ${isdrag ? "bg-success" : "border border-dark"} rounded-pill`}>
                            <Draggable
                                axis="x"
                                onStart={handleDragStart}
                                onStop={handleDragStop}
                                bounds={{ left: 0, right: 200 }}
                                position={{ x: 0, y: 0 }}>
                                    <Button variant="success" className="w-50 rounded-pill btn-outline-dark">
                                        DELIVER NOW
                                    </Button>
                            </Draggable>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <DeliverSuccess show={isSubmit} handleClose={SuccessClose} data={currentdata} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isSubmit: state.requests.isSubmit
    };
};

export default connect(mapStateToProps)(DeliverNow);
