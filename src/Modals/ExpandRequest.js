import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import designImage3 from "../images/nine-sixteen-1.png";
import designImage4 from "../images/sixteen-nine2.png";
import aepdesign from "../images/aep-image.png";
import ColorCode from '../Common/ColorCode';
import { connect } from 'react-redux';
import { get_expanded_request_detail } from '../reduxdata/rootAction';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import UploadPieces from '../Common/UploadPieces';
import ApproveStatus from '../Customer/Requests/ApproveStatus';
import AssignStatus from '../Customer/Requests/AssignStatus';
import { Link } from 'react-router-dom';

const { REACT_APP_BOMO_URL } = process.env;

const ExpandRequest = ({ show, handleClose, user, expanddetails, requestdetails, reqtype }) => {
    const dispatch = useDispatch();
    const [isGreen, setIsGreen] = useState([]);
    const [primaryItem,setPrimaryItem] = useState([]);

    const toggleColor = (item,index) => {
        setIsGreen(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
        setPrimaryItem(prevItems =>  {
            const findItems = prevItems?.some(d => d?._id === item?._id);
            if(findItems){
               return prevItems.filter(d =>  d?._id !== item?._id);
            } else {
                return [...prevItems, item];
            }
        });
    };

    useEffect(() => {
        if (requestdetails?._id) {
            get_expanded_request_detail(dispatch, user?.token, requestdetails?._id);
        }
        return () => {
            setIsGreen([null]); setPrimaryItem([null]);
        }
    }, [dispatch, user?.token, requestdetails?._id]);

    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleDownload = async (fileUrl) => {
        console.log(fileUrl);
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g, '%2B') : fileUrl;
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
        console.log("File Content URL:", fileContent);
        const fileName = fileUrl?.substring(fileUrl?.lastIndexOf("/") + 1);
        const getMimeType = (ext) => {
            const mimeTypes = {
                txt: "text/plain",
                pdf: "application/pdf",
                zip: "application/zip",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                gif: "image/gif",
                mp4: "video/mp4",
                mov: "video/quicktime"
            };
            return mimeTypes[ext] || "application/octet-stream";
        };

        const response = await fetch(fileContent);
        const blobFile = await response.blob();
        const fileExtension = fileName?.split(".").pop().toLowerCase();
        const mimeType = getMimeType(fileExtension);
        const blobwithtype = new Blob([blobFile], { type: mimeType });
        console.log(blobwithtype);
        saveAs(blobwithtype, fileName);
    };

    const DownloadAll = (filesUrl) => {
        filesUrl.forEach(async (url) => {
            const filepath = url.includes('+') ? url.replace(/\+/g, '%2B') : url;
            const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
            console.log("File Content URL:", fileContent);
            const fileName = url?.substring(url?.lastIndexOf("/") + 1);
            const getMimeType = (ext) => {
                const mimeTypes = {
                    txt: "text/plain",
                    pdf: "application/pdf",
                    zip: "application/zip",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    gif: "image/gif",
                };
                return mimeTypes[ext] || "application/octet-stream";
            };

            const response = await fetch(fileContent);
            const blobFile = await response.blob();
            const fileExtension = fileName?.split(".").pop().toLowerCase();
            const mimeType = getMimeType(fileExtension);
            const blobwithtype = new Blob([blobFile], { type: mimeType });
            saveAs(blobwithtype, fileName);
        })
    };

    const getSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const formatDate = (inputdate) => {
        const date = new Date(inputdate);
        date.setDate(date.getDate() + 3);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date?.getFullYear();

        return ` ${month} ${day}${getSuffix(day)}`
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl" className="expand-request view-as-customer-popup">
            <Modal.Body className="p-3 px-md-5 py-3">
                <div className="row mb-3">
                    <div className="col-md-12 col-12">
                        {reqtype === 'approve' ?
                            <ApproveStatus expanddetails={expanddetails} />
                            : reqtype === 'assign' ?
                                <AssignStatus expanddetails={expanddetails} />
                                :
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

                                    <div class={`${(!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at) ? 'step' : ''}`}>
                                        {((!expanddetails?.req_data?.brief_approved_at && !expanddetails?.req_data?.brief_rejected_at)) &&
                                            <div>
                                                <p className="brief-content">Brief Pending</p>
                                                <div class="deliver-status delivery-cancel">
                                                    <span> <i className="fa-solid fa-exclamation-circle cancel"></i></span>
                                                </div>
                                                <p className="brief-date"><span className="d-block"></span></p>
                                            </div>}
                                    </div>

                                    <div class={`${expanddetails?.req_data?.brief_rejected_at ? "step" : ''}`}>
                                        {expanddetails?.req_data?.brief_rejected_at &&
                                            expanddetails?.req_data?.brief_rejected_at?.map((item) => <div>
                                                <p className="brief-content">Brief Rejected</p>
                                                <div class="deliver-status delivery-cancel">
                                                    <span><i class="fa-solid fa-circle-xmark"></i></span>
                                                </div>
                                                <p className="brief-date">
                                                    {format(new Date(item), 'dd/MM/yyyy')}
                                                    <span className="d-block">{formattedTime(item)}</span></p>
                                            </div>)}
                                    </div>

                                    <div class={`${expanddetails?.req_data?.brief_approved_at ? 'step' : ''}`}>
                                        {expanddetails?.req_data?.brief_approved_at &&
                                            <div>
                                                <p className="brief-content">Brief Approved</p>
                                                <div class="deliver-status delivery-check">
                                                    <span><i class="fa-solid fa-circle-check"></i></span>
                                                </div>
                                                <p className="brief-date">
                                                    {format(new Date(expanddetails?.req_data?.brief_approved_at), 'dd/MM/yyyy')}
                                                    <span className="d-block">{formattedTime(expanddetails?.req_data?.brief_approved_at)}</span>
                                                </p>
                                            </div>}
                                    </div>

                                    <div class="step">
                                        <p className="brief-content invisible">Brief Rejected</p>
                                        <div class="deliver-status delivery-request-count">
                                            <span class="bg-white rounded-pill px-1">{expanddetails?.req_data?.designer_list?.length} applicants</span>
                                        </div>
                                        <p className="brief-date invisible">16/03/2023 <span className="d-block">12:44</span></p>
                                    </div>

                                    <div class="step">{primaryItem?.map((item) => item?.name)}
                                        <p className="brief-content">Assigned to
                                            {expanddetails?.req_data?.primary_designer?.map((item, index) =>
                                                <span className="badge badge-success mr-1" key={index}>
                                                    <i  className={`fa-solid fa-circle ${isGreen[index] ? 'text-white' : 'text-success'}`} 
                                                    onClick={() => toggleColor(item,index)}></i></span>
                                            )}
                                        </p>
                                        <div class="deliver-status delivery-check">
                                            <span><i class="fa-solid fa-circle-check"></i></span>
                                        </div>
                                        <p className="brief-date">
                                            {expanddetails?.req_data?.req_mail_date ?
                                                <p className="brief-date">
                                                    {(format(new Date(expanddetails?.req_data?.req_mail_date), 'dd/MM/yyyy'))}
                                                    <span className="d-block">
                                                        {formattedTime(expanddetails?.req_data?.req_mail_date)}
                                                    </span>
                                                </p>
                                                : '-'}
                                        </p>
                                    </div>
                                    {expanddetails?.req_data?.req_mail_date && <div class="step">
                                        <p className="brief-content">Assigned to </p>
                                        <div class="deliver-status delivery-check">
                                            <span><i class="fa-solid fa-circle-check"></i></span>
                                        </div>
                                        <p className="brief-date">{format(new Date(expanddetails?.req_data?.req_mail_date), 'dd/MM/yyyy')}
                                            <span className="d-block">{formattedTime(expanddetails?.req_data?.req_mail_date)}</span></p>
                                    </div>}

                                    <div class="step">
                                        {((!expanddetails?.req_data?.is_approved_by_customer)) && (
                                            <div>
                                                <p className="brief-content">Delivery Rejected</p>
                                                <div class="deliver-status delivery-cancel">
                                                    <span><i class="fa-solid fa-circle-xmark"></i></span>
                                                </div>
                                                <p className="brief-date">{expanddetails?.req_data?.design_rejected_at_by_customer ?
                                                    format(new Date(expanddetails?.req_data?.design_rejected_at_by_customer), 'dd/MM/yyyy')
                                                    : '-'}
                                                    <span className="d-block">{expanddetails?.req_data?.design_rejected_at_by_customer ?
                                                        formattedTime(expanddetails?.req_data?.design_rejected_at_by_customer)
                                                        : ''}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {expanddetails?.req_data?.is_approved_by_customer && <div class="step">
                                        <p className="brief-content">Delivery Approved</p>
                                        <div class="deliver-status delivery-check">
                                            <span><i class="fa-solid fa-circle-check"></i></span>
                                        </div>
                                        <p className="brief-date">16/03/2023 <span className="d-block">12:44</span></p>
                                    </div>}
                                </div>
                        }
                    </div>
                </div>
                <div className="px-60 py-5 review-main-content bg-white mb-4">
                    <div className="row review-content">
                        <div className="col-md-7">
                            <div class="mb-3"><h3 class="fw-bold">{expanddetails?.req_data?.request_name}</h3></div>
                        </div>
                        <div className="col-md-5">
                            <div class="d-flex justify-content-end">
                                <h5 class="fw-bold">$125</h5>
                                <h6 class="text-end ps-5 fw-bold"> Completed
                                    <span class="d-block">{formatDate(expanddetails?.req_data?.delivery_date)}</span></h6>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class=" d-flex align-items-center review-content ">
                                <ColorCode request={expanddetails?.req_data} />
                                <span className="brand-poll-circle"><img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${expanddetails?.req_data?.brand_profile?.logo}`} alt='imga' /></span>
                                <p class="short0ad project-assets rounded-pill cursor-pointer" onClick={() => DownloadAll(expanddetails?.req_data?.file)}>Project Assets</p>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div class="row">
                                <div className="col-md-5">
                                    <p>
                                        <span className="d-block fw-bold">Description</span>
                                        <span className="d-block">{expanddetails?.req_data?.description}
                                        </span>
                                        {/* <span className="d-block">Where is this going to appear?</span> */}
                                    </p>
                                </div>
                                <div className="col-md-1">
                                    <div className="float-right">

                                        <p>
                                            <span className="fw-bold d-block">Size</span>
                                            {expanddetails?.req_data?.size?.map((item) => (
                                                <span className="d-block">{item} </span>
                                            ))}</p>
                                    </div>
                                </div>
                                <div className="col-md-1"><p><span className="fw-bold d-block">File Type</span> {expanddetails?.req_data?.file_type}</p></div>
                                <div className="col-md-2"><p><span className="fw-bold d-block">Transparency</span> {expanddetails?.req_data?.transparency}</p> </div>
                                <div className="col-md-3">
                                    <div className=""><p className="word-break"><span className="fw-bold d-block">References</span>
                                        {expanddetails?.req_data?.references?.includes('https') ?
                                            <Link
                                                className="text-decoration-none"
                                                to={`${expanddetails?.req_data?.references}`}
                                                target="_blank"
                                            >
                                                {expanddetails?.req_data?.references}
                                            </Link>
                                            : <span className="d-block">
                                                {expanddetails?.req_data?.references}
                                            </span>
                                        }
                                    </p>
                                    </div>
                                </div>

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

                                            {request?.landscape && <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">{expanddetails?.req_data?.size[0]}</div>
                                                    <div className="">
                                                        <img src={designImage} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                            onClick={() => handleDownload(`designe/landscape/${request?.landscape}`)}>
                                                            Download
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>}
                                            {request?.portrait && <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">{expanddetails?.req_data?.size[1]}</div>
                                                    <div className="">
                                                        <img src={designImage2} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                            onClick={() => handleDownload(`designe/portrait/${request?.portrait}`)}>
                                                            Download
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>}
                                            <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">.{expanddetails?.req_data?.zip?.split(".").pop().toLowerCase()}</div>
                                                    <div className="">
                                                        <img src={aepdesign} alt="Image" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                            onClick={() => handleDownload(`${request?.zip}`)}>
                                                            Download
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-3 align-self-center">
                                                <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                    {request?.is_approved_by_super_admin ?
                                                        <div> <button type="button" class="btn btn-outline-dark rounded-pill px-2 py-1 fw-bold ">Approved by Admin</button>  <i className="fa-solid fa-circle-check"></i></div>
                                                        : <h6 class="fw-bold">Needs approval by ADMIN</h6>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {(request?.landscape_feedback_message || request?.portrait_feedback_message) ? <div className="col-md-12">
                                    <div className="feedback-request  p-4 mt-4 rounded">

                                        <h5 className="fw-bold">
                                            Feedback {index + 1} Requested {format(new Date(request?.design_rejected_at_by_customer), 'dd/MM/yyyy')} {formattedTime(request?.design_rejected_at_by_customer)}
                                        </h5>
                                        <p>
                                            {request?.landscape_feedback_message && <span className="d-block">{request?.landscape_feedback_message}</span>}
                                            {request?.portrait_feedback_message && <span className="d-block">{request?.portrait_feedback_message}</span>}
                                        </p>

                                    </div>
                                </div> :
                                    <div></div>}
                            </div>)}
                    </div>

                    {(expanddetails?.req_data?.is_approved_by_super_admin) &&
                        <UploadPieces />
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        expanddetails: state.requests.expandedrequest,
        requestdetails: state.requests.delieverRequestdetails
    };
};

export default connect(mapStateToProps)(ExpandRequest);
