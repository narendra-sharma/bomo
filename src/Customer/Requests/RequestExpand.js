import React, { useEffect, useState } from "react";
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import aepdesign from "../../images/aep-image.png";
import { useLocation } from "react-router-dom";
import { get_delivered_requests } from "../../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";
import { saveAs } from 'file-saver';
import designImage3 from "../../images/nine-sixteen-1.png";
import designImage4 from "../../images/sixteen-nine2.png";

const { REACT_APP_BOMO_URL } = process.env;

const RequestExpand = ({ user, deliverrequests }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const receivedData = location?.state;

    useEffect(() => {
        get_delivered_requests(dispatch, user?.token, receivedData?._id);
    }, [user?.token, dispatch, receivedData?._id]);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

        return `${monthDay}th ${time}`;
    };
    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    const handleDownload = async (fileUrl) => {
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${fileUrl}`;
        const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        const getMimeType = (ext) => {
            const mimeTypes = {
                txt: 'text/plain',
                pdf: 'application/pdf',
                zip: 'application/zip',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
            };
            return mimeTypes[ext] || 'application/octet-stream';
        };

        const response = await fetch(fileContent);
        const blobFile = await response.blob();
        const fileExtension = fileName.split(".").pop().toLowerCase();
        const mimeType = getMimeType(fileExtension);
        const blobwithtype = new Blob([blobFile], { type: mimeType });
        saveAs(blobwithtype, fileName);
    };

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                <div className="mx-md-0 mx-lg-4 px-60 ">
                    {receivedData?.status ?
                        <div className="order-completed px-5 py-4 rounded mb-5">
                            <p className="mb-0 extra-dark-green">{receivedData?.status === 'completed' ? 'Order completed' : receivedData?.status === 'production' ? 'Order in Production' : 'Delivered'}
                                <span className="d-block fw-bold">
                                    {receivedData?.status === 'completed' ? 'All good! You approved this order and files are ready to be used'
                                        : receivedData?.status === 'production' ? `Delivery Scheduled for ${formatDate(receivedData?.delivery_date)}`
                                            : 'Waiting for your review. Approve it to download the files or request feedback to modify the delivery'}
                                </span>
                            </p>
                        </div> :
                        <div className="delivery-status-section active-request p-5 rounded mt-4">
                            <h1>Queued</h1>
                        </div>
                    }
                    <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                        <div className="row">
                            <div className="col-md-7 col-lg-6 mb-4">
                                <h3>{receivedData?.request_name}</h3>
                                <div className="review-content mt-3">
                                    <div className="d-flex">
                                        <ColorCode request={receivedData} />
                                        <p className="short0ad dor rounded-pill ms-2">{receivedData?.brandname ? receivedData?.brandname : '-'}</p>
                                        <p className="short0ad project-assets ms-2 px-4">Project Assets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-6 mb-3">
                                <div className="d-flex  justify-content-end">
                                    <div className="delivery-date text-end ps-5">
                                        <div className="fw-bold h6">Delivered {receivedData?.status === 'production' ? 'expected' : 'on'}<span className="d-block h6">{formatDate(receivedData?.delivery_date)}</span></div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table request-status designer-request-status table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Size</th>
                                                <th>File Type </th>
                                                <th>Transparency</th>
                                                <th className="text-end">References</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span className="d-block">{receivedData?.description}</span></td>
                                                <td>
                                                    {receivedData?.size?.map((value) => <span className="d-block">{value}</span>)}
                                                </td>
                                                <td>{receivedData?.file_type}</td>
                                                <td>{receivedData?.transparency}</td>
                                                <td className="text-center">{receivedData?.references}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <div className="col-md-12">
                                    {deliverrequests ? deliverrequests?.data?.map((request) => (
                                        <div className="delivery-status-section bg-white p-4 rounded mt-3">

                                            {request?.request_id?.feedback_message &&
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3 align-self-center">
                                                        <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                            {request?.request_id?.feedback_message && <div>
                                                                <i className="fa-solid fa-circle-xmark cancel text-danger"></i>
                                                                <span> Delivery Rejected</span>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 d-flex text-center justify-content-center">
                                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                                            <div className="delivery-status fw-bold">9:16</div>
                                                            <div className="">
                                                                <img src={designImage} alt="Imag" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 d-flex text-center justify-content-center">
                                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                                            <div className="delivery-status fw-bold">16:9</div>
                                                            <div className="">
                                                                <img src={designImage2} alt="Imag" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {request?.request_id?.feedback_message &&
                                                        <div className="col-md-12">
                                                            <div className="feedback-request  p-4 mt-4 rounded">
                                                                <h5 className="fw-bold">Feedback Requested {request?.createdAt ? format(new Date(request?.createdAt), 'dd/MM/yyyy') : 'No Date'} {formattedTime(request?.createdAt)}</h5>
                                                                <p>
                                                                    <span className="d-block">
                                                                        {request?.request_id?.feedback_message}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>}

                                            {request?.request_id?.status === 'completed' &&
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3 align-self-center">
                                                        <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                            <div>
                                                                <button type="button" class="btn btn-outline-dark rounded-pill px-2 py-1 fw-bold ">Delivery Accepted</button>  <i className="fa-solid fa-circle-check"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 d-flex text-center justify-content-center">
                                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                                            <div className="delivery-status fw-bold">9:16</div>
                                                            <div className="">
                                                                <img src={designImage} alt="Imag" />
                                                            </div>
                                                            <div className="download-btn">
                                                                <button className="rounded-pill px-3 py-1 fw-bold border-0" onClick={() => handleDownload(`designe/landscape/${request?.landscape}`)}>
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 d-flex text-center justify-content-center">
                                                        <div className="statusbar-section d-flex flex-column justify-content-between">
                                                            <div className="delivery-status fw-bold">16:9</div>
                                                            <div className="">
                                                                <img src={designImage2} alt="Imag" />
                                                            </div>
                                                            <div className="download-btn">
                                                                <button className="rounded-pill px-3 py-1 fw-bold border-0" onClick={() => handleDownload(`designe/portrait/${request?.portrait}`)}>
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>)) : <div></div>}
                                </div>
                            </div>

                        </div>
                    </div>
                    {receivedData?.status === 'production' &&
                        // <div className="col-md-12">
                        //     <span>Deliver Expected</span>
                        // </div>
                        <div className="delivery-status-section active-request p-5 rounded mt-4">
                            <div className="row justify-content-center">
                                <div className="col-md-4 justify-content-center align-self-center">
                                    <div className="delivery-status fw-bold mb-2">
                                        <i className="fa-solid fa-circle-minus minus"></i>  Delivery {receivedData?.status === 'production' ? 'expected' : 'on'}
                                    </div>
                                    <p className="status-date text-secondary mb-0">
                                        {format(new Date(receivedData?.delivery_date), 'dd/MM/yyyy')} {formattedTime(receivedData?.delivery_date)}
                                    </p>
                                </div>
                                <div className="col-md-4 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                        <div className="delivery-status fw-bold">9:16</div>
                                        <div className="">
                                            <img src={designImage3} alt="Image" />
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-4 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-evenly">
                                        <div className="delivery-status fw-bold">16:9</div>
                                        <div className="">
                                            <img src={designImage4} alt="Image" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        deliverrequests: state.requests.deliverrequests,
    };
};

export default connect(mapStateToProps)(RequestExpand);
