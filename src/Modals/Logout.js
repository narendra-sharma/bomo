import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const Logout = (props) => {
  const { user, show, handleClose, logout } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="p-4">
          <h4 className="mb-0">{user.name}</h4>
          <p>do you really want to log out?</p>
          <div className="d-flex gap-2 mt-4">
            <div className="col-6">
              <Button variant="dark" className="w-100" onClick={logout}>
                Yes
              </Button>
            </div>
            <div className="col-6">
              <Button variant="light" className="w-100" onClick={handleClose}>
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