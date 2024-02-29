import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { change_request_status } from "../reduxdata/Requests/requestActions";
import { useDispatch } from "react-redux";
const PaymentDetails = (props) => {
    const { heading, showAcceptModal, setshowAcceptModal, doPay } = props;
    const dispatch = useDispatch();
    return (
        <Modal
            show={showAcceptModal}
            onHide={() => setshowAcceptModal(false)}
            className="logout-popup"
        >
            <Modal.Body>
                <div className="px-4 py-4">
                    <h4 className="mb-0">{heading}</h4>
                    <p className="mt-2">Select the type of subscription you want to update</p>
                    <div className="d-flex gap-2 mt-5 pt-4">
                        <div className="col-md-6">
                            <Button
                                variant="light"
                                className="w-100 rounded-pill btn-outline-dark"
                                onClick={() => {
                                    doPay('current_month');
                                    setshowAcceptModal(false);
                                }}
                            >
                                Current Month
                            </Button>
                        </div>
                        <div className="col-md-6">
                            <Button
                                variant="light"
                                className="w-100 rounded-pill btn-outline-dark"
                                onClick={() => {
                                    doPay('next_month');
                                    setshowAcceptModal(false);
                                }}
                            >
                                Next Month
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default PaymentDetails;
