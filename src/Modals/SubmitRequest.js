import React,{ useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newRequest } from '../reduxdata/rootAction';
import RequestSuccess from './RequestSuccess';
import { SUBMIT_NOW } from '../reduxdata/Requests/requestTypes';

const SubmitRequest = ({ show, handleClose, data, userdetail, isSubmit, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRequest = async () => {
        if (data) {
            await newRequest(data, dispatch, userdetail?.token);
            handleClose();
        }
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
            <div>
                <Modal show={show} onHide={handleClose} className="logout-popup">
                    <Modal.Body>
                        <div className="px-4 py-4">
                            <h5 className="mb-0">{user?.name},</h5>
                            <p >All the fields are filled correctly</p>
                            <p className="mt-2">Is the info provided accurate?<span className="d-block">
                            Are all the working files needed there?</span></p>
                            <p>Once submitted you can't edit the request</p>
                            <div className="d-flex gap-2 mt-5 pt-4">
                                <div className="col-md-8">
                                    <Button
                                        variant="light"
                                        className="w-100 rounded-pill btn-outline-dark"
                                        onClick={() => handleRequest()}
                                    >
                                        SUBMIT
                                    </Button>
                                </div>
                                <div className="col-md-4">
                                    <Button
                                        variant="light"
                                        className="w-100 rounded-pill btn-outline-dark"
                                        onClick={() => handleClose()}
                                    >
                                        Go Back
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <RequestSuccess view={isSubmit} viewClose={SuccessClose} datadetail={userdetail} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isSubmit: state.requests.isSubmit
    }
}
export default connect(mapStateToProps)(SubmitRequest);