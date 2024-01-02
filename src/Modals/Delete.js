import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const Delete = (props) => {
  const { heading,name,show, handleClose, DeleteBrand } = props;
  return (
    <Modal show={show} onHide={handleClose} className="logout-popup">
      <Modal.Body>
        <div className="px-4 py-4">
        <h4 className="mb-0">Delete {heading}</h4>
          <p>do you really want to delete {heading} <b>{name}</b>?</p>
          <div className="d-flex gap-2 mt-5 pt-4">
            <div className="col-md-6">
              <Button variant="dark" className="w-100 rounded-pill" onClick={DeleteBrand}>
                Yes
              </Button>
            </div>
            <div className="col-md-6">
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


export default connect(mapStateToProps, null)(Delete);