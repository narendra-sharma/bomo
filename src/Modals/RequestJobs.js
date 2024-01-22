import React from "react";
import { Button, Modal } from "react-bootstrap";

const RequestJobs = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body>
                <div className="col-12">
                    <div className="designer-active-request bg-white px-2 px-md-4 py-5 rounded">
                        <div className="mb-4">
                            <div className="ms-4 mb-3">
                                <h5>Requests For Acceptance</h5>
                            </div>
                            <div className="table-responsive rounded mt-4">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td><p>DIOR</p></td>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Expected Delivery Time</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Accept</Button>
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Decline</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive rounded">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td><p>DIOR</p></td>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Expected Delivery Time</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td><p><span className="fw-bold">Price</span> <span className="d-block">$300</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td><p><span className="fw-bold">Size</span> <span className="d-block">16:9</span></p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Accept</Button>
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Decline</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive rounded">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td><p>DIOR</p></td>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Expected Delivery Time</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td><p><span className="fw-bold">Price</span> <span className="d-block">$300</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td><p><span className="fw-bold">Size</span> <span className="d-block">16:9</span></p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Accept</Button>
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Decline</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive rounded">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td><p>DIOR</p></td>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Expected Delivery Time</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td><p><span className="fw-bold">Price</span> <span className="d-block">$300</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td><p><span className="fw-bold">Size</span> <span className="d-block">16:9</span></p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Accept</Button>
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">Decline</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <Button variant="secondary" className="rounded-pill px-4" onClick={() => handleClose()}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RequestJobs;

