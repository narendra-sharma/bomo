import React from "react";
import { Button, Modal } from "react-bootstrap";
import { cancel_subscription } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const CancelSubscription = (props) => {
  const { user, show, handleClose, final, pause } = props;
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const cancel = () => {
    if (userRole == "Super admin") {
      cancel_subscription(user?.token, user?.subscription?._id, dispatch);
    } else {
      final();
    }
    handleClose();
  }
  const paused = () => {
    pause();
    handleClose();
  }
  const getDifferece = () => {
    const now = new Date();
    const nextBillingDate = new Date(user?.subscription?.next_billing_date);
    const timeDifference = nextBillingDate.getTime() - now.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup cancel-popup">
      <Modal.Header className="border-0" closeButton></Modal.Header>
      <Modal.Body closeButton>
        <div className="px-4 py-4">
          <h5 className="mb-0 color-black fw-bold">{user?.name},</h5>
          <p>do you really want to cancel the subscription?</p>
          {userRole !== 'Super admin' && <p>
            If you do, you will lose access to the platform and all previous requests. Subscription ends in <strong>{getDifferece()} days</strong>.
          </p>}
          {(user?.subscription?.status !== 'paused') && (userRole !== 'Super admin') && <p>
            Do you mean to pause instead? This will prevent all your previous requests to be deleted.
          </p>}
          {(userRole !== 'Super admin') ? <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button variant="danger" className="w-100 rounded-pill" onClick={cancel}>
                I want to cancel
              </Button>
            </div>
            {user?.subscription?.status !== 'paused' && <div className="col-md-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={paused}>
                Pause
              </Button>
            </div>}
          </div> :
            <div className="d-flex gap-2 mt-5 pt-4">
              <div className="col-md-6">
                <Button variant="danger" className="w-100 rounded-pill" onClick={cancel}>
                  Yes
                </Button>
              </div>
              <div className="col-md-6 col-6">
                <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                  No
                </Button>
              </div>
            </div>}
        </div>
      </Modal.Body>
    </Modal>
  )
}


export default CancelSubscription;