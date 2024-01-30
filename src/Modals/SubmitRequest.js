import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newRequest } from '../reduxdata/rootAction';

const SubmitRequest = ({show,handleClose,data,token}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = () => {
     newRequest(data, dispatch, token, navigate);
    };
    return (
        <Modal onShow={show} onHide={handleClose}>
            <Modal.Body>
            <div className="px-4 py-4">
          <h4 className="mb-0">Accept</h4>
          <p className="mt-2">All the fields are filled correctly</p>
          <p className="mt-2">Is the info provided accurate?</p>
          <p className="">All the working files working needed are there ?</p>
          <p className="mt-2">Once submitted you can't edit the request</p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button
                variant="success"
                className="w-100 rounded-pill btn-outline-dark"
                onClick={() => handleSubmit()}
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
    )
};

export default SubmitRequest;