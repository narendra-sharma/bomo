import React from "react";
import { Modal } from "react-bootstrap";
import ManageBrand from "../Customer/BrandProfiles/ManageBrand";

const EditBrand = ({ show, handleClose,brand }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManageBrand brand={brand} editform={show} close={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditBrand;
