import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const EditBillData = ({show,handleClose,heading,onConfirm}) => {
    return (
        <Modal show={show} onHide={handleClose} className="logout-popup modal-border">
      <Modal.Body>
        <div className="px-4 py-4">
        <h4 className="mb-0">{heading}.</h4>
          <p>Do you really want to {heading}?</p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={onConfirm}>
                Yes
              </Button>
            </div>
            <div className="col-md-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    )
};

export default EditBillData;