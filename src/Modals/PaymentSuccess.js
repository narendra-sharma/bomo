import React from "react";
import { Modal } from "react-bootstrap";
import { format } from "date-fns";
import pay_success from '../images/pay_success.png';
const PaymentSuccess = (props) => {
  const { show, handleClose } = props;
  const user=JSON.parse(localStorage.getItem('userDetails'));
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup suceess-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <div className="d-flex align-items-center justify-content-end mb-3">
            <img src={pay_success} />
          </div>
          <h5 className="mb-0 fw-bold text-dark">{user?.name},</h5>
          <h6 className="mb-5 text-dark">you have succesfully subscribed for {user?.subscription?.quantity} pieces.</h6>
          <p className="text-mute">
            Your subscription will renew on {user && user?.next_billing_date && format(new Date(user?.next_billing_date), 'MMMM d, yyy')}.
            <br />
            Make any changes for the next period before this date
          </p>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PaymentSuccess;