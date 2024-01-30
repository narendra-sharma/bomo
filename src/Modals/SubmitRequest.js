import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newRequest } from '../reduxdata/rootAction';
import { useState } from 'react';
import { useEffect } from 'react';
import RequestSuccess from './RequestSuccess';

const SubmitRequest = ({ show, handleClose, data, userdetail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleRequest = async () => {
        await newRequest(data, dispatch, userdetail?.token, navigate);
        setShowSuccess(true);
    };

    useEffect(() => {
        let timeoutId;
    
        if (showSuccess) {
          timeoutId = setTimeout(() => {
            setShowSuccess(false);
            handleClose();
          }, 4000);
        }
    
        return () => {
          clearTimeout(timeoutId);
        };
      }, [showSuccess, handleClose]);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="px-4 py-4">
                        <h4 className="mb-0">{data?.requestName}</h4>
                        <p className="mt-2">All the fields are filled correctly</p>
                        <p className="mt-2">Is the info provided accurate?</p>
                        <p className="">All the working files working needed are there ?</p>
                        <p className="mt-2">Once submitted you can't edit the request</p>
                        <div className="d-flex gap-2 mt-5 pt-4">
                            <div className="col-md-6">
                                <Button
                                    variant="success"
                                    className="w-100 rounded-pill btn-outline-dark"
                                    onClick={() => handleRequest()}
                                >
                                    SUBMIT
                                </Button>
                            </div>
                            <div className="col-md-6">
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

export default SubmitRequest;