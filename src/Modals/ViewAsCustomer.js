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
                                    view all customer
                                </button>
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 class="mb-0">{view?.company} <span class="fw-bold d-block">Workspace</span></h4>
                                <div class="text-right">
                                    <p className="fw-bold mb-0">Subscription renews 17 Jun 2023 at 17:33</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="customer-details mb-4">
                            <div class="review-main-content bg-white px-4 px-md-3 py-4 d-flex justify-content-between align-items-center rounded">
                                <div className="d-flex text-right justify-content-between align-items-center">
                                    <img src={userImage} alt="Bomo logo" />
                                </div>
                                <div class="">
                                    <p class="mb-0 user-email  ms-1 ms-lg-2">
                                        <b class=" d-md-block">Num of Admins</b><span class="d-block">2</span></p>
                                </div>
                                <div class="">
                                    <p class="mb-0 user-email  ms-1 ms-lg-2">
                                        <b class=" d-md-block">Total Users</b><span class="d-block">22</span></p>
                                </div>
                                <div class="">
                                    <p class="mb-0 user-email  ms-1 ms-lg-2">
                                        <b class=" d-md-block">Total Brands</b><span class="d-block">3</span></p>
                                </div>
                                <div class="">
                                    <p class="mb-0 user-email  ms-1 ms-lg-2">
                                        <b class=" d-md-block">Contact email</b><span class="d-block">{view?.email}</span></p>
                                </div>

                            </div>
                        </div>
                        <div className="customer-subscription  mb-3">
                            {/* <div class="review-content bg-white rounded px-4 px-md-3 py-4">
                                <div class="row"><div class="col-lg-6 col-6">
                                    <h6 class="position-relative ps-sm-0 ps-2 mb-0"><b>
                                        Subscription Status</b><span class="d-block active-status">ACTIVE</span></h6>
                                </div>
                                    <div class="col-lg-6  text-end">
                                        <div class="status-btn d-flex justify-content-end">
                                            <button class="btn border rounded-pill pause-btn">PAUSE </button>
                                            <button class="btn border rounded-pill cancel-btn">CANCEL</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <SubscriptionStatus user={view}/>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">12</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">3</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-dark mb-0">15</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">2</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">8</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">86</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">80</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">27</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">4.8 hours</h2>
                                </div>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total Designers</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">10</h2>
                                </div>
                                <p className="mb-0 start-date">Started 17 August 2022</p>
                            </div>
                        </div>
                        <div class="active-request-section d-flex flex-column rounded mb-4">
                            <div class="bg-white p-2 rounded">
                                <p class="fw-bold">Total paid to Bomo</p>
                                <div class="monthly-revenue-price text-center py-4">
                                    <h2 class="text-muted mb-0">$15300</h2>
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
