import React from "react";
import { Link } from "react-router-dom";
import poolImage from "../images/pool-request-img.png";
import { Button } from "react-bootstrap";
import PollRequests from "../Customer/Requests/PollRequests";
const DesignerHome = () => {
    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content review-content ">
                    <div className="mx-md-5 mx-sm-0 mb-4"><h3 >My Active Requests</h3></div>
                    <div className="designer-active-request bg-white px-2 px-md-4 py-5 rounded">
                        <div className="mb-4">
                            <div className="ms-4 mb-3">
                                <span className="deadline-date status position-relative ps-3">Deadline in <span className="fw-bold">01:12:33</span></span>
                            </div>
                            <div className="table-responsive rounded">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p></td>
                                            <td><p>DIOR</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">DELIVERY NOW</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="ms-4 mb-2">
                                <span className="deadline-date status position-relative ps-3">Deadline in <span className="fw-bold">01:12:33</span></span>
                            </div>
                            <div className="table-responsive rounded">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="text-center"><p className="short0ad bg-white">short ad</p> </td>
                                            <td><p>DIOR</p></td>
                                            <td><p><span className="fw-bold">Intro SS23 campaign</span></p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                            <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                            <td className="text-end"><p><span className="extra-dark-green">+ show full brief</span> </p></td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold">DELIVERY NOW</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="mx-md-5 mx-sm-0 mb-4 d-flex"><h3 >Requests Poll</h3>
                            <span>84 active requests</span>
                        </div>

                        <div className="poll-request-section">
                            <div className="row">
                                <PollRequests />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignerHome;
