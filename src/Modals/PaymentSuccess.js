import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
const PaymentSuccess = (props) => {
  const { user, show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <h4 className="mb-0">{user?.name},</h4>
          <p>you have succesfully subscribed for 25 pieces.</p>
          <p>
            Your subscription will renew on April 7, 2023.
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