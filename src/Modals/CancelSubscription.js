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
  const getDifferece=()=>{
    const now = new Date();
    const nextBillingDate = new Date(user?.next_billing_date);
    const timeDifference = nextBillingDate.getTime() - now.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
   }
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup cancel-popup">
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body closeButton>
        <div className="px-4 py-4">
        <h5 className="mb-0 text-dark fw-bold">{user?.name},</h5>
          <p>do you really want to cancel the subscription?</p>
          <p>
            If you do, you will lose access to the platform and all previous requests. cription ends in <strong>{getDifferece()} days</strong>.
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