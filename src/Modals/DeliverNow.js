import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deliever_request_details, designer_deliever_request, get_approve_delivery_list } from "../reduxdata/rootAction";
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
        dispatch(deliever_request_details(null));
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} className="delivery-now-popup logout-popup">
                <Modal.Body className="p-0">
                    <div class className={`px-5 py-4 border border-dark rounded ${isdrag && 'delivery-now-bg'}`} >
                        <div className="d-flex align-items-center gap-5 pt-2">
                            <div style={{ width: "58%" }}>
                                <h5 className="mb-0 fw-bold">{user?.name}</h5>
                                <h5 className="mb-0">Double check,double win</h5>
                            </div>
                            {!isdrag && <i className="fa-solid fa-exclamation-circle cancel extra-dark-green"></i>}
                            </div>
                            <p className=" mt-2 pb-5">

                                Once delivered you <b>won't be able to edit</b> any file.
                                <br />
                                Happy with your uploads? Hit deliver:)
                            </p>
                            <div className={`mt-5 mb-2 ${isdrag ? "delivery-now-btn-dark" : "delivery-now-btn"} rounded-pill`} style={{ overflow: "hidden" }}>
                                <Draggable
                                    axis="x"
                                    onStart={() => {
                                        setTimeout(() => {
                                            setIsdrag(true);
                                        }, 200)
                                    }}
                                    onDrag={handleDrag}
                                    onStop={handleDragStop}
                                    bounds={{ left: 0, right: 200 }}
                                    position={dragPosition}>
                                    <Button variant="unset" className="btn px-4 rounded-pill">
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
