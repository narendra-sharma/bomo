import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newRequest } from '../reduxdata/rootAction';
import { useState } from 'react';
import { useEffect } from 'react';
import RequestSuccess from './RequestSuccess';
import { SUBMIT_NOW } from '../reduxdata/Requests/requestTypes';

const SubmitRequest = ({ show, handleClose, data, userdetail, issubmit }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRequest = () => {
      if(data){
        newRequest(data, dispatch, userdetail?.token, navigate);
        handleClose();
      }
    };

    useEffect(() => {
        let isSubmitvalue = issubmit;
        if(isSubmitvalue) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                dispatch({
                    type: SUBMIT_NOW,
                    payload: false 
                  })
            },3000);
        }
      }, [issubmit,dispatch]);

    return (
        <div>
            <Modal show={show} onHide={handleClose} className="logout-popup">
                <Modal.Body>
                    <div className="px-4 py-4">
                        <h5 className="mb-0">{data?.requestName},</h5>
                        <p >All the fields are filled correctly</p>
                        <p className="mt-2">Is the info provided accurate?<span className="d-block">
                        All the working files working needed are there ?</span></p>
                        <p >Once submitted you can't edit the request</p>
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
            <RequestSuccess view={showSuccess} viewClose={() => setShowSuccess(false)} datadetail={userdetail} requestdata={data} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        issubmit:state.requests.isSubmit
    }
}
export default connect(mapStateToProps)(SubmitRequest);