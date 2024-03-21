import React, { useState, useEffect } from "react";
import plusImage from '../images/plus-img.png';
import { connect } from 'react-redux';
import ColorCode from "../Common/ColorCode";
import DeliverNow from "../Modals/DeliverNow";
import CountdownTimer from "../Common/CountdownTimer";
import { toast } from "react-toastify";
import UploadPieces from "../Common/UploadPieces";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import { useDispatch } from "react-redux";
import { get_delivered_requests } from "../reduxdata/rootAction";
import designImage from "../images/nine-sixteen.png";
import designImage2 from "../images/sixteen-nine.png";
import aepdesign from "../images/aep-image.png";
import { format } from "date-fns";

const { REACT_APP_BOMO_URL } = process.env;

const DelieverRequest = ({ user, deliverrequests }) => {
    const dispatch = useDispatch();
    const [requestData, setRequestData] = useState();

    useEffect(() => {
        let requestdetails = JSON.parse(localStorage.getItem('requestData'));
        setRequestData(requestdetails);
    }, []);

    useEffect(() => {
        if (requestData?._id) {
            get_delivered_requests(dispatch, user?.token, requestData?._id);
        }
    }, [requestData?._id]);

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
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    };

    const formatDate = (inputdate) => {
        const date = new Date(inputdate);
        date.setDate(date.getDate()+3);
        const day = date.getDate();
        const month = date.toLocaleString('en-US',{month: 'long'});
        const year = date?.getFullYear();

        return ` ${month} ${day}${getSuffix(day)}`
    };

    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                    <div className="mx-md-0 mx-lg-4 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                            <p className="mb-0 extra-dark-green"> DELIVER NOW. This request is in Production
                                <span className="d-block fw-bold">Delivery in{" "}
                                    <CountdownTimer requestDate={requestData?.req_mail_date} duration={24 * 60 * 60 * 1000} />
                                </span>
                            </p>
                        </div>
                        <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                            <div className="row">
                                <div className="col-md-7 col-lg-6 mb-4">
                                    <h3>{requestData?.request_name}</h3>
                                    <div className="review-content mt-3">
                                        <div className="d-flex align-items-center">
                                            <ColorCode request={requestData} />
                                            <span class="brand-poll-circle">
                                                <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${requestData?.brand_profile?.logo}`} alt='imga' />
                                            </span>
                                            {/* <p className="short0ad dor rounded-pill ms-2">{requestData?.brand_profile?.brandname ? requestData?.brand_profile?.brandname : '-'}</p> */}
                                            <p className="short0ad project-assets ms-2 px-4 cursor-pointer" onClick={() => DownloadAll(requestData?.file)}>Project Assets</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 col-lg-6 mb-3">
                                    <div className="d-flex  justify-content-end">
                                        <h3>$125</h3>
                                        <div className="delivery-date text-end ps-5">
                                            <div className="fw-bold h6">Completed<span className="d-block h6">{formatDate(requestData?.delivery_date)}</span></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div className="row justify-content-between expand-request-data">
                                        <div className="col-md-4">
                                            <p >
                                                <span className="d-block fw-bold">Description</span>
                                                <span className="d-block">{requestData?.description}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="d-flex justify-content-center gap-4">
                                                <div className="">
                                                    <p>
                                                        <span className="d-block fw-bold">Size</span> {requestData?.size?.map((item) => <span className="d-block">{item}</span>)}
                                                    </p>
                                                </div>
                                                <div><p><span className="d-block fw-bold">File Type </span> {requestData?.file_type}</p></div>
                                                <div><p><span className="d-block fw-bold">Transparency </span> {requestData?.transparency}</p></div>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <p className="word-break">
                                                <span className="d-block fw-bold">References</span>
                                                {requestData?.references?.includes('http') ?
                                                    <Link className="text-decoration-none" to={`${requestData?.references}`} target="_blank">
                                                        {requestData?.references}
                                                    </Link>
                                                    : <span className="d-block">{requestData?.references}</span>
                                                }
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {deliverrequests?.data?.length > 0 ? deliverrequests?.data?.map((item, index) => (
                                <div key={index}>
                                    <div className="col-md-12">
                                        <div className="delivery-status-section bg-white p-4 rounded mt-3">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 text-center mb-4">
                                                    <h3 className="color-dark">Delivery {index + 1}</h3>
                                                    <p>{format(new Date(item?.createdAt), 'dd/MM/yyyy')} {formattedTime(item?.createdAt)} <span className="ps-1 active-request-status fw-bold">ON TIME</span></p>
                                                </div>

                                                {item?.request_id?.landscape && <div className="col-md-3 d-flex text-center justify-content-center">
                                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                                        <div className="delivery-status fw-bold">{item?.request_id?.size[0]}</div>
                                                        <div className="">
                                                            <img src={designImage} alt="Image" />
                                                        </div>
                                                        <div className="download-btn">
                                                            <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                                onClick={() => handleDownload(`designe/landscape/${item?.request_id?.landscape}`)}>
                                                                Download
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>}
                                                {item?.request_id?.portrait && <div className="col-md-3 d-flex text-center justify-content-center">
                                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                                        <div className="delivery-status fw-bold">{item?.request_id?.size[1]}</div>
                                                        <div className="">
                                                            <img src={designImage2} alt="Image" />
                                                        </div>
                                                        <div className="download-btn">
                                                            <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                                onClick={() => handleDownload(`designe/portrait/${item?.request_id?.portrait}`)}>
                                                                Download
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>}
                                                <div className="col-md-3 d-flex text-center justify-content-center">
                                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                                        <div className="delivery-status fw-bold">.{item?.request_id?.zip?.split(".").pop().toLowerCase()}</div>
                                                        <div className="">
                                                            <img src={aepdesign} alt="Image" />
                                                        </div>
                                                        <div className="download-btn">
                                                            <button className="rounded-pill px-3 py-1 fw-bold border-0"
                                                                onClick={() => handleDownload(`${item?.request_id?.zip}`)}>
                                                                Download
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-3 align-self-center">
                                                    <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                        {!item?.request_id?.is_approved_by_super_admin ?
                                                            <div> <button type="button" class="btn btn-outline-dark rounded-pill px-2 py-1 fw-bold ">Rejected by ADMIN</button>  <i className="fa-solid fa-circle-xmark cancel text-danger"></i></div>
                                                            : <h6 class="fw-bold">Rejected by ADMIN</h6>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {(item?.feedback_message) ? <div className="col-md-12">
                                        <div className="feedback-request  p-4 mt-4 rounded">

                                            <h5 className="fw-bold">
                                                Feedback {index + 1} Requested by ADMIN {format(new Date(item?.updatedAt), 'dd/MM/yyyy')} {formattedTime(item?.updatedAt)}
                                            </h5>
                                            <p>
                                                {item?.feedback_message && <span className="d-block">{item?.feedback_message}</span>}
                                            </p>

                                        </div>
                                    </div> :
                                        <div></div>}
                                </div>
                            ))
                                : ''}
                           {deliverrequests?.data?.length > 0 &&  <div className="col-md-12 mt-4">
                                <div className="delivery-status-section bg-white p-4 rounded mt-3">
                                        <div className="col-md-12 text-center mb-4">
                                            <h3 className="color-dark">Delivery {deliverrequests?.data?.length + 1}</h3>
                                            <p><span className="ps-1 active-request-status fw-bold text-danger">PENDING</span></p>
                                        </div>
                                </div>
                            </div>}
                            <UploadPieces requestData={requestData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        requestData: state.requests.delieverRequestdetails,
        isLoading: state.loader.isLoading,
        deliverrequests: state.requests.deliverrequests,
    };
};

export default connect(mapStateToProps)(DelieverRequest);
