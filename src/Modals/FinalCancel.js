import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const FinalCancel = (props) => {
  const { user, show, handleClose } = props;
  const cancel = () => {
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup cancel-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <h5 className="mb-3 text-dark fw-bold">This is a final reminder.</h5>
          <p>Your account will be deleted in <strong>17 days</strong></p>
          <p>
            You will lose access to all files after that, you can subscribe back anytime.
            <br />
            <br/>
            To confirm click CANCEL.
          </p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-10">
              <Button variant="danger" className="w-100 rounded-pill" onClick={cancel}>
                Cancel
              </Button>
            </div>
            <div className="col-md-2">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                X
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};


export default connect(mapStateToProps)(FinalCancel);