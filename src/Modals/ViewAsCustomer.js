import React from "react";
import userImage from '../images/user-img.png';
import { Modal } from "react-bootstrap"
import SubscriptionStatus from "../Customer/Sahred/SubscriptionStatus";

const ViewAsCustomer = ({ view,show,handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} className="view-as-customer-popup">
            <Modal.Body>
                <div className="view-customer-content px-60">
                    <div className="row mb-3">
                        <div className="col-md-12 col-12">
                            <p className="text-center">
                                <button className="rounded-pill rounded-pill py-2 px-3 btn btn-outline-dark" onClick={() => handleClose()}>
                                    view as customer
                                </button>
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">{view?.company} <span className="fw-bold d-block">Workspace</span></h4>
                                <div className="text-right">
                                    <p className="fw-bold mb-0">Subscription renews 17 Jun 2023 at 17:33</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="customer-details mb-4">
                            <div className="review-main-content bg-white px-4 px-md-3 py-4 d-flex justify-content-between align-items-center rounded">
                                <div className="d-flex text-right justify-content-between align-items-center">
                                    <img src={userImage} alt="Bomo logo" />
                                </div>
                                <div className="">
                                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                                        <b className=" d-md-block">Num of Admins</b><span className="d-block">2</span></p>
                                </div>
                                <div className="">
                                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                                        <b className=" d-md-block">Total Users</b><span className="d-block">22</span></p>
                                </div>
                                <div className="">
                                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                                        <b className=" d-md-block">Total Brands</b><span className="d-block">3</span></p>
                                </div>
                                <div className="">
                                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                                        <b className=" d-md-block">Contact email</b><span className="d-block">{view?.email}</span></p>
                                </div>

                            </div>
                        </div>
                        <div className="customer-subscription  mb-3">
                            {/* <div className="review-content bg-white rounded px-4 px-md-3 py-4">
                                <div className="row"><div className="col-lg-6 col-6">
                                    <h6 className="position-relative ps-sm-0 ps-2 mb-0"><b>
                                        Subscription Status</b><span className="d-block active-status">ACTIVE</span></h6>
                                </div>
                                    <div className="col-lg-6  text-end">
                                        <div className="status-btn d-flex justify-content-end">
                                            <button className="btn border rounded-pill pause-btn">PAUSE </button>
                                            <button className="btn border rounded-pill cancel-btn">CANCEL</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <SubscriptionStatus user={view}/>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">12</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">3</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-dark mb-0">15</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">2</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">8</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">86</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">80</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">27</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">4.8 hours</h2>
                                </div>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total Designers</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">10</h2>
                                </div>
                                <p className="mb-0 start-date">Started 17 August 2022</p>
                            </div>
                        </div>
                        <div className="active-request-section d-flex flex-column rounded mb-4">
                            <div className="bg-white p-2 rounded">
                                <p className="fw-bold">Total paid to Bomo</p>
                                <div className="monthly-revenue-price text-center py-4">
                                    <h2 className="text-muted mb-0">$15300</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ViewAsCustomer;
