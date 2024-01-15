import React from "react";
import { Link } from "react-router-dom";
import poolImage from "../images/pool-request-img.png";
import { Button } from "react-bootstrap";
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
                                <div className="col-md-6 col-lg-4 col-12">
                                    <div className="bg-white px-2 px-md-3 py-3 rounded">
                                        <div className="d-flex justify-content-between">
                                           <h6 className="fw-bold">Intro SS23 campaign</h6> 
                                           <p className="text-end"><span className="fw-bold">Expected Delivery</span>
                                             <span className="d-block">Mon 10 - 9:00</span>
                                            </p>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 col-lg-9 d-flex align-items-center">
                                                <div className="d-flex">
                                                    <p className="short0ad short-bg">Short ad</p>
                                                    <p className="short0ad dor rounded-pill">DOR</p>
                                                </div>
                                                <div><p>+ Show full Brief</p></div>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-md-9 col-lg-8 d-flex align-items-center">
                                                <img src={poolImage} alt ="image"/>
                                            </div>
                                            <div className="col-md-3 col-lg-4">
                                                <div className="text-end ">
                                                    <h5 className="fw-bold">$125</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-7 col-lg-8 d-flex align-items-center">
                                             <div className="d-flex justify-content-betwwen">
                                                <p className="text-mute"><span>Selection in</span> <span className="fw-bold">14 days</span></p>
                                                <p className="text-mute"><span>237 applications</span></p>
                                             </div>
                                            </div>
                                            <div className="col-md-5 col-lg-4">
                                                <div className="status-btn">
                                                    <button className="btn pause-btn rounded-pill py-1 w-100">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 col-12">
                                    <div className="bg-white px-2 px-md-3 py-3 rounded">
                                        <div className="d-flex justify-content-between">
                                           <h6 className="fw-bold">Intro SS23 campaign</h6> 
                                           <p className="text-end"><span className="fw-bold">Expected Delivery</span>
                                             <span className="d-block">Mon 10 - 9:00</span>
                                            </p>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 col-lg-9 d-flex align-items-center">
                                                <div className="d-flex">
                                                    <p className="short0ad short-bg">Short ad</p>
                                                    <p className="short0ad dor rounded-pill">DOR</p>
                                                </div>
                                                <div><p>+ Show full Brief</p></div>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-md-9 col-lg-8 d-flex align-items-center">
                                                <img src={poolImage} alt ="image"/>
                                            </div>
                                            <div className="col-md-3 col-lg-4">
                                                <div className="text-end ">
                                                    <h5 className="fw-bold">$125</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-7 col-lg-8 d-flex align-items-center">
                                             <div className="d-flex justify-content-betwwen">
                                                <p className="text-mute"><span>Selection in</span> <span className="fw-bold">14 days</span></p>
                                                <p className="text-mute"><span>237 applications</span></p>
                                             </div>
                                            </div>
                                            <div className="col-md-5 col-lg-4">
                                                <div className="status-btn">
                                                    <button className="btn pause-btn rounded-pill py-1 w-100">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 col-12">
                                    <div className="bg-white px-2 px-md-3 py-3 rounded">
                                        <div className="d-flex justify-content-between">
                                           <h6 className="fw-bold">Intro SS23 campaign</h6> 
                                           <p className="text-end"><span className="fw-bold">Expected Delivery</span>
                                             <span className="d-block">Mon 10 - 9:00</span>
                                            </p>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 col-lg-9 d-flex align-items-center">
                                                <div className="d-flex">
                                                    <p className="short0ad short-bg">Short ad</p>
                                                    <p className="short0ad dor rounded-pill">DOR</p>
                                                </div>
                                                <div><p>+ Show full Brief</p></div>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-md-9 col-lg-8 d-flex align-items-center">
                                                <img src={poolImage} alt ="image"/>
                                            </div>
                                            <div className="col-md-3 col-lg-4">
                                                <div className="text-end ">
                                                    <h5 className="fw-bold">$125</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-7 col-lg-8 d-flex align-items-center">
                                             <div className="d-flex justify-content-betwwen">
                                                <p className="text-mute"><span>Selection in</span> <span className="fw-bold">14 days</span></p>
                                                <p className="text-mute"><span>237 applications</span></p>
                                             </div>
                                            </div>
                                            <div className="col-md-5 col-lg-4">
                                                <div className="status-btn">
                                                    <button className="btn pause-btn rounded-pill py-1 w-100">Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignerHome;
