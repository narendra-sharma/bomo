import React from "react";
import { Button, Modal } from "react-bootstrap";
import { change_request_status } from "../reduxdata/Requests/requestActions";
import { useDispatch } from "react-redux";
const AcceptRequest=(props)=> {
  const { heading, showAcceptModal, setshowAcceptModal, id, token } = props;
  const dispatch = useDispatch();
  const handleStatusUpdate = () => {
    change_request_status(dispatch, token, id, "active");
    setshowAcceptModal(false);
  };

  return (
    <Modal
      show={showAcceptModal}
      onHide={() => setshowAcceptModal(false)}
      className="logout-popup"
    >
      <Modal.Body>
        <div className="px-4 py-4">
          <h4 className="mb-0">Accept {heading}</h4>
          <p className="mt-2">do you really want to Accept the request</p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button
                variant="success"
                className="w-100 rounded-pill btn-outline-dark"
                onClick={handleStatusUpdate}
              >
                Accept
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                variant="light"
                className="w-100 rounded-pill btn-outline-dark"
                onClick={() => setshowAcceptModal(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AcceptRequest;
