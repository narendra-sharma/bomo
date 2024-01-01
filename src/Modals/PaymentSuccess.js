import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { format } from "date-fns";
const PaymentSuccess = (props) => {
  const { user, show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup suceess-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <h5 className="mb-0 fw-bold text-dark">{user?.name},</h5>
          <h6 className="mb-5 text-dark">you have succesfully subscribed for {user?.subscription?.new_quantity} pieces.</h6>
          <p className="text-muted">
            Your subscription will renew on {user && format(new Date(user?.next_billing_date), 'MMMM d, yyy')}.
            <br />
            Make any changes for the next period before this date
          </p>
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


export default connect(mapStateToProps, null)(PaymentSuccess);