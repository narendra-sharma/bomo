import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const Logout = (props) => {
  const { user, show, handleClose, logout } = props;
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup">
      <Modal.Body>
        <div className="px-4 py-4">
          <h4 className="mb-0">{user?.name}</h4>
          <p>do you really want to log out?</p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6 col-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={logout}>
                Yes
              </Button>
            </div>
            <div className="col-md-6 col-6">
              <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={handleClose}>
                No
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


export default connect(mapStateToProps, null)(Logout);