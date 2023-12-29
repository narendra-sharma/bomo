import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const CancelSubscription = (props) => {
  const { user, show, handleClose, final, pause } = props;
  const cancel = () => {
    final();
    handleClose();
  }
  const paused=()=>{
    pause();
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup cancel-popup">
      <Modal.Body>
        <div className="px-4 py-4">
        <h5 className="mb-0 text-dark fw-bold">{user?.name},</h5>
          <p>do you really want to pause the subscription?</p>
          <p>
            If you do, you will lose access to the platform and all previous requests. Your subscription ends in <strong>17 days.</strong>
           </p>
           <p>
            Do you mean to pause instead? This will prevent all your previous requests to be deleted.
          </p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button variant="danger" className="w-100 rounded-pill" onClick={cancel}>
                I want to cancel
              </Button>
            </div>
            <div className="col-md-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={paused}>
                Pause
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


export default connect(mapStateToProps)(CancelSubscription);