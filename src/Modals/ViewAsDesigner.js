import React, { useState, useEffect } from "react";
import userImage from '../images/user-img.png';
import { Modal } from "react-bootstrap"
import { format } from "date-fns";
import { Link } from "react-router-dom";
import reelImage from "../images/reel-image.png";
import { get_single_designer_details, switch_to_designer } from "../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import ApproveDesigner from "./ApproveDesigner";

const ViewAsDesigner = ({ view, show, handleClose, user, designerdata }) => {
    const [isactive, setIsactive] = useState(designerdata?.designer_detail?.isDesignerApproved);
    const [isview, setIsview] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (view?._id) {
            get_single_designer_details(dispatch, view._id, user?.token);
        }
    }, [view]);

    const handleswitchto_designer = async (userId) => {
        await switch_to_designer(dispatch, userId, user?.token);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl" className="view-as-customer-popup">
                <Modal.Body>
                    <div className="view-customer-content py-4 view-design-content px-60">
                        <div className="row mb-3">
                            <div className="col-md-12 col-12">
                                <p className="text-center mb-3">
                                    <button className="rounded-pill rounded-pill py-2 px-3 btn btn-outline-dark" onClick={() => handleswitchto_designer(designerdata?.designer_detail?._id)}>
                                        View as designer
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="row mx-auto justify-content-center">
                            <div className="active-request-section d-flex flex-column rounded mb-4">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Active Requests</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.active_requests}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Total Paid</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">${designerdata?.total_paid}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Pending to be Paid</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-dark mb-0">${designerdata?.pending_to_be_paid}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Number of Requests Failed</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.number_of_requests_failed}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="active-request-section d-flex flex-column rounded mb-4 col-md-2">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Number of Applications</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.number_of_applications}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4 col-md-2">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Number of Assigned Requests</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.number_of_assigned_requests}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4 col-md-2">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Number of Requests Delievered</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-dark mb-0">{designerdata?.number_of_requests_delivered}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4 col-md-2">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">% Reviews Requested</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.percentage_reviews_requested}%</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="active-request-section d-flex flex-column rounded mb-4 col-md-2">
                                <div className="bg-white p-2 rounded d-flex flex-column h-100 justify-content-between">
                                    <p className="fw-bold">Average Req Completion Time</p>
                                    <div className="monthly-revenue-price text-center py-4">
                                        <h2 className="text-muted mb-0">{designerdata?.avg_req_completion_time} hours</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-4 col-12">
                                <div className="review-main-content bg-white px-4 py-4 d-flex justify-content-between align-items-center rounded">
                                    <div className="col-md-7">
                                        <div className="d-flex align-items-center">
                                            <div className="">
                                                <img src={userImage} alt="Bomo logo" />
                                            </div>
                                            <div className="">
                                                <p className="mb-0 user-email ms-1 ms-lg-3">
                                                    <b className=" d-md-block">Name</b><span className="d-block">{designerdata?.name}</span></p>
                                            </div>
                                            <div className="">
                                                <p className="mb-0 user-email ms-1 ms-lg-3">
                                                    <b className=" d-md-block">Email</b><span className="d-block">{designerdata?.email}</span></p>
                                            </div>
                                            <div className="">
                                                <p className="mb-0 user-email ms-1 ms-lg-3">
                                                    <b className=" d-md-block">Country</b>
                                                    <span className="d-block">
                                                        {designerdata?.designer_detail?.address?.country ?
                                                            designerdata?.designer_detail?.address?.country
                                                            : '-'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="inputname" className="form-label">
                                            Status
                                        </label>
                                        <div>
                                            <label className="switch m-0">
                                                <input type="checkbox"
                                                    id="togBtn" name="togBtn"
                                                    checked={designerdata?.designer_detail?.isDesignerApproved}
                                                    onClick={() => { setIsactive(!isactive); setIsview(true); }} />
                                                <div className="slider round">
                                                    {designerdata?.designer_detail?.isDesignerApproved ? <span>Active</span> :
                                                        <span>In-active</span>}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="mb-0 user-email ms-1 ms-lg-3 text-end">
                                            <b className=" d-md-block">Signup Date</b><span className="d-block">{designerdata?.signup_date ? format(new Date(designerdata?.signup_date), 'dd/MM/yyyy') : 'No Date'}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row review-main-content g-0 bg-white px-4 px-md-3 py-4 align-items-center rounded mb-2">
                            <div className="col-md-7 col-lg-7">
                                <p className="fw-bold">REEL</p>
                                <img src={reelImage} />
                            </div>
                            <div className="col-md-5 col-lg-5">
                                <div className="row reel-data review-content">
                                    <div className="col-md-3 col-lg-3">
                                        <p className="text-dark fw-bold">Bio</p>
                                    </div>
                                    <div className="col-md-9 col-lg-9">
                                        <p className="text-mute">{designerdata?.designer_detail?.bio}</p>
                                    </div>
                                    <div className="col-md-3 col-lg-3">
                                        <p className="text-dark">Website</p>
                                    </div>
                                    <div className="col-md-9 col-lg-9">
                                        <p className=""><Link className="text-decoration-none" to={`${designerdata?.designer_detail?.website}`} target="_blank">{designerdata?.designer_detail?.website ? designerdata?.designer_detail?.website : ''}</Link> </p>
                                    </div>
                                    <div className="col-md-3 col-lg-3">
                                        <p className="text-dark">Instagram</p>
                                    </div>
                                    <div className="col-md-9 col-lg-9">
                                        <p className=""><Link className="text-decoration-none" to={`${designerdata?.designer_detail?.instagram}`} target="_blank">{designerdata?.designer_detail?.instagram ? designerdata?.designer_detail?.instagram : ''}</Link></p>
                                    </div>
                                    <div className="col-md-3 col-lg-3">
                                        <p className="text-dark">Behance</p>
                                    </div>
                                    <div className="col-md-9 col-lg-9">
                                        <p className=""><Link className="text-decoration-none" to={`${designerdata?.designer_detail?.behance}`} target="_blank">{designerdata?.designer_detail?.behance ? designerdata?.designer_detail?.behance : ''}</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ApproveDesigner isview={isview} viewClose={() => setIsview(false)} details={designerdata} designerstatus={isactive} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        designerdata: state.auth.singledesignerdata,
    };
};
export default connect(mapStateToProps)(ViewAsDesigner);
