import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { designer_deliever_request, get_approve_delivery_list } from "../reduxdata/rootAction";
import DeliverSuccess from "./DeliverSuccess";
import Draggable from "react-draggable";
import { SUBMIT_NOW } from "../reduxdata/Requests/requestTypes";


const DeliverNow = ({ show, handleClose, detail, user, currentdata, isSubmit }) => {
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isdrag, setIsdrag] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    const handleDrag = (_, data) => {
        setDragPosition({ x: data.x, y: 0 });
    };

    const handleDragStop = () => {
        if (dragPosition?.x === 0) {
            setIsdrag(false);
        } else {
            if (dragPosition.x >= 200) {
                handleSubmit();
            } else {
                setIsdrag(false);
            }
        }
    };

    const handleSubmit = async () => {
        await designer_deliever_request(dispatch, user?.token, detail);
        if (user?.role === 'superadmin') {
            await get_approve_delivery_list(user?.token, dispatch);
        };
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
            <Modal show={show} onHide={handleClose} className="logout-popup">
                <Modal.Body>
                    <div className="px-4 py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0 fw-bold text-dark">{user?.name}</h5>
                            {!isdrag &&  <i className="fa-solid fa-exclamation-circle cancel"></i>}
                        </div>
                        <p className="text-mute">
                            Double check,double win
                            <br />
                            Once delivered you <b>won't be able to edit</b> any file.
                            <br />
                            Happy with your uploads? Hit deliver:)
                        </p>
                        <div className={`px-1 py-1 ${isdrag ? "bg-success" : "border border-dark"} rounded-pill`} style={{ overflow: "hidden" }}>
                            <Draggable
                                axis="x"
                                onStart={() => {
                                    setTimeout(() => {
                                        setIsdrag(true);
                                    },200)
                                }}
                                onDrag={handleDrag}
                                onStop={handleDragStop}
                                bounds={{ left: 0, right: 200 }}
                                position={dragPosition}>
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
