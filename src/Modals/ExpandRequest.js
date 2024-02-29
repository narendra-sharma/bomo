import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import aepdesign from "../images/aep-image.png";
import ColorCode from '../Common/ColorCode';
import { connect } from 'react-redux';
import { get_expanded_request_detail } from '../reduxdata/rootAction';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const ExpandRequest = ({ show, handleClose, requestdata, user, expanddetails }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (requestdata?._id) {
            get_expanded_request_detail(dispatch, user?.token, requestdata?._id);
        }
    }, [dispatch, user?.token, requestdata?._id]);

    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        return `${time}`;
    };

    console.log("ASDJGHQWUEHWE", expanddetails);

    return (
        <Modal show={show} onHide={handleClose} size="xl" className="expand-request view-as-customer-popup">
            <Modal.Body className="p-3 px-md-5 py-3">
                <div className="row mb-3">
                    <div className="col-md-12 col-12">
                        <div class="progress_bar">
                            <div class="step">
                                <p className="brief-content invisible">0</p>
                                <div class="deliver-status">
                                    <p className="brief-content">Brief Published</p>
                                </div>
                                <p className="brief-date">
                                    {expanddetails?.req_data?.createdAt ? format(new Date(expanddetails?.req_data?.createdAt), 'dd/MM/yyyy') : 'No Date'}
                                    <span className="d-block">{formattedTime(expanddetails?.req_data?.createdAt)}</span></p>
                            </div>

                            {expanddetails?.req_data?.brief_rejected_at === null ?
                                <div class="step">
                                    <p className="brief-content">Brief Approved</p>
                                    <div class="deliver-status delivery-check">
                                        <span><i class="fa-solid fa-circle-check"></i></span>
                                    </div>
                                    <p className="brief-date">
                                        {format(new Date(expanddetails?.req_data?.brief_approved_at), 'dd/MM/yyyy')}
                                        <span className="d-block">{formattedTime(expanddetails?.req_data?.brief_approved_at)}</span></p>
                                </div> :
                                <div class="step">
                                    <p className="brief-content">Brief Rejected</p>
                                    <div class="deliver-status delivery-cancel">
                                        <span><i class="fa-solid fa-circle-xmark"></i></span>
                                    </div>
                                    <p className="brief-date">16/03/2023 <span className="d-block">12:44</span></p>
                                </div>
                            }

                            <div class="step">
                                <p className="brief-content invisible">Brief Rejected</p>
                                <div class="deliver-status delivery-request-count">
                                    <span class="bg-white rounded-pill px-1">{expanddetails?.req_data?.designer_list?.length} applicants</span>
                                </div>
                                <p className="brief-date invisible">16/03/2023 <span className="d-block">12:44</span></p>
                            </div>

                            <div class="step">
                                <p className="brief-content">Assigned to </p>
                                <div class="deliver-status delivery-check">
                                    <span><i class="fa-solid fa-circle-check"></i></span>
                                </div>
                                <p className="brief-date">
                                    {expanddetails?.req_data?.req_mail_date ?
                                        format(new Date(expanddetails?.req_data?.req_mail_date), 'dd/MM/yyyy')
                                        : '----'}
                                    <span className="d-block">{
                                        expanddetails?.req_data?.req_mail_date ?
                                            formattedTime(expanddetails?.req_data?.req_mail_date)
                                            : '----'}</span></p>
                            </div>
                            <div class="step">
                                <p className="brief-content">Assigned to </p>
                                <div class="deliver-status delivery-check">
                                    <span><i class="fa-solid fa-circle-check"></i></span>
                                </div>
                                <p className="brief-date">16/03/2023 <span className="d-block">12:44</span></p>
                            </div>
                            <div class="step">
                                <p className="brief-content">Delivery Rejected</p>
                                <div class="deliver-status delivery-cancel">
                                    <span><i class="fa-solid fa-circle-xmark"></i></span>
                                </div>
                                <p className="brief-date">16/03/2023 <span className="d-block">12:44</span></p>
                            </div>

                            <div class="step">
                                <p className="brief-content">Delivery Approved</p>
                                <div class="deliver-status delivery-check">
                                    <span><i class="fa-solid fa-circle-check"></i></span>
                                </div>
                                <p className="brief-date">16/03/2023 <span className="d-block">12:44</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-60 py-5 mx-3 review-main-content bg-white">
                    <div className="row review-content">
                        <div className="col-md-7">
                            <div class="mb-3"><h3 class="fw-bold">{expanddetails?.req_data?.request_name}</h3></div>
                        </div>
                        <div className="col-md-5">
                            <div class="d-flex justify-content-end">
                                <h5 class="fw-bold">$125</h5>
                                <h6 class="text-end ps-5 fw-bold"> Completed
                                    <span class="d-block">Jan 20th</span></h6>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class=" d-flex align-items-center review-content ">
                                <ColorCode request={expanddetails?.req_data} />
                                <p class="short0ad dor rounded-pill">DOR</p>
                                <p class="short0ad project-assets rounded-pill">Project Assets</p>
                            </div>
                        </div>
                        <div className="col-md-10 mt-3">
                            <div class="table-responsive">
                                <table class="table table-borderless mb-0">
                                    <thead>
                                        <th>Description</th>
                                        <th>Size</th>
                                        <th>File Type </th>
                                        <th>Transparency</th>
                                        <th>References</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span className="d-block">{expanddetails?.req_data?.description}
                                                    </span>
                                                    {/* <span className="d-block">Where is this going to appear?</span> */}
                                                </p>
                                            </td>
                                            <td><p>{expanddetails?.req_data?.size}</p></td>
                                            <td><p>{expanddetails?.req_data?.file_type}</p></td>
                                            <td><p>{expanddetails?.req_data?.transparency}</p> </td>
                                            <td><p>{expanddetails?.req_data?.references}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {expanddetails?.delivery_data?.map((request, index) =>
                            <div key={index}>
                                <div className="col-md-12">
                                    <div className="delivery-status-section bg-white p-4 rounded mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12 text-center mb-4">
                                                <h3 className="color-dark">Delivery {index + 1}</h3>
                                                <p>{format(new Date(request?.createdAt), 'dd/MM/yyyy')} {formattedTime(request?.createdAt)} <span className="ps-1 active-request-status fw-bold">ON TIME</span></p>
                                            </div>

                                            <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">9:16</div>
                                                    <div className="">
                                                        <img src={designImage} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0">Download</button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">16:9</div>
                                                    <div className="">
                                                        <img src={designImage2} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0">Download</button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">.AEP</div>
                                                    <div className="">
                                                        <img src={aepdesign} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0">Download</button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-3 align-self-center">
                                                <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                    <button type="button" class="btn btn-outline-dark rounded-pill px-2 py-1 fw-bold ">Approved by Admin</button>  <i className="fa-solid fa-circle-check"></i>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {request?.feedback_message ? <div className="col-md-12">
                                    <div className="feedback-request  p-4 mt-4 rounded">

                                        <h5 className="fw-bold">
                                            Feedback {index + 1} Requested {format(new Date(request?.createdAt), 'dd/MM/yyyy')} {formattedTime(request?.createdAt)}
                                        </h5>
                                        <p>
                                            <span className="d-block">{request?.feedback_message}</span>
                                        </p>

                                    </div>
                                </div> :
                                    <div></div>}
                            </div>)}
                    </div>

                    <div className="ready-to-delivery-section border border-dark p-5 bg-gray mt-4">
                        <p><span className="fw-bold">Ready to Deliver?</span> Place each file in its corresponding folder</p>
                        <div className="row align-items-center">
                            <div className="col-md-3 d-flex flex-column">
                                <h5 className="text-center">
                                    <span className="uplaod-dimension border border-dark d-inline-block "></span> Upload 9:16 .mp4
                                </h5>
                                <div className="upload-nine-mp4">
                                    <div className="d-flex align-item-center justify-content-center mb-4">
                                        <label class="uploadFile">
                                            <span class="filename"><i className="fa fa-plus"></i></span>
                                            <input name="firstFile" type="file" className="inputfile form-control" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 d-flex flex-column">
                                <h5 className="text-center">
                                    <span className="uplaod-dimension sixteen-nine border border-dark d-inline-block"></span> Upload 16:9 .mp4
                                </h5>
                                <div className="upload-nine-mp4">
                                    <div className="d-flex align-item-center justify-content-center mb-4">
                                        <label class="uploadFile">
                                            <span class="filename"><i className="fa fa-plus"></i></span>
                                            <input name="secondFile" type="file" className="inputfile form-control" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 d-flex flex-column">
                                <h5 className="text-center">
                                    .zip and upload your .AEP
                                </h5>
                                <div className="upload-zip-file">

                                    <div className="d-flex align-item-center justify-content-center mb-4">
                                        <label class="uploadFile">
                                            <span class="filename"><i className="fa fa-plus"></i></span>
                                            <input name="zipfile" type="file" className="inputfile form-control" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div class="status-btn"><button class="btn pause-btn rounded-pill py-2 px-4" >DELIVERY NOW</button> </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        expanddetails: state.requests.expandedrequest
    };
};

export default connect(mapStateToProps)(ExpandRequest);
