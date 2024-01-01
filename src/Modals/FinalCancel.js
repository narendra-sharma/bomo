import React from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { cancel_subscription } from "../reduxdata/rootAction";
const FinalCancel = (props) => {
  const { user, show, handleClose } = props;
  const dispatch=useDispatch();
  const cancel = async() => {
    await cancel_subscription(user?.token,user?.subscription?._id,dispatch);
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
      <Modal.Body>
        <div className="px-4 py-4">
          <h5 className="mb-3 text-dark fw-bold">This is a final reminder.</h5>
          <p>Your account will be deleted in <strong>{getDifferece()} days</strong></p>
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