import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const PauseSubscription = (props) => {
  const { user, show, handleClose } = props;
  const pause = () => {
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <h4 className="mb-0">{user?.name},</h4>
          <p>do you really want to pause the subscription?</p>
          <p>
            You will be charged $125 for each inactive month.
            <br />
            This will grant you forever access to all devices.
          </p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button variant="dark" className="w-100 rounded-pill" onClick={pause}>
                Pause
              </Button>
            </div>
            <div className="col-md-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                Go Back
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


export default connect(mapStateToProps)(PauseSubscription);