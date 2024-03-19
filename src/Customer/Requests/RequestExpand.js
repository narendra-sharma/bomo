import React, { useEffect, useState } from "react";
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import { get_delivered_requests } from "../../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import designImage3 from "../../images/nine-sixteen-1.png";
import designImage4 from "../../images/sixteen-nine2.png";
import { Link } from "react-router-dom";

const { REACT_APP_BOMO_URL } = process.env;

const RequestExpand = ({ user, deliverrequests }) => {
    const dispatch = useDispatch();
    const [receivedData, setReceivedData] = useState();

    useEffect(() => {
        let requestdetails = JSON.parse(localStorage.getItem('requestData'));
        setReceivedData(requestdetails);
    }, []);

    useEffect(() => {
        if (receivedData?._id) {
            get_delivered_requests(dispatch, user?.token, receivedData?._id);
        }
    }, [receivedData?._id]);

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const monthDay = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${monthDay}th ${hours}:${minutes}`;
    };
    const formattedTime = (timeDate) => {
        const date = new Date(timeDate);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };
    const handleDownload = async (fileUrl) => {
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g, '%2B') : fileUrl;
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
        // const fileContent = `${REACT_APP_BOMO_URL}download?file=${fileUrl}`;
        const fileName = fileUrl?.substring(fileUrl.lastIndexOf("/") + 1);
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

    const getPrioritySuffix = (priority) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const lastDigit = priority % 10;
        const suffix = lastDigit >= 1 && lastDigit <= 3 ? suffixes[lastDigit] : suffixes[0];
        return `${priority}${suffix}`;
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
                        <div class="border border-dark px-5 py-4 rounded mb-5">
                            <p class="mb-0 dark-green fw-500">QUEUED <span class="d-block">Up next: Your request is <span class=" fw-bold">{getPrioritySuffix(receivedData?.priority)}</span> in the Feedback Queue and will be addressed after the currentone is approved.</span></p></div>
                    }
                    <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                        <div className="row">
                            <div className="col-md-7 col-lg-6 mb-4">
                                <h3>{receivedData?.request_name}</h3>
                                <div className="review-content mt-3">
                                    <div className="d-flex align-items-center">
                                        <ColorCode request={receivedData} />
                                        <span class="brand-poll-circle"> 
                                        <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${receivedData?.brand_details?.logo}`} alt='imga' /></span>
                                        <p className="short0ad project-assets ms-2 px-4 cursor-pointer" onClick={() => DownloadAll(receivedData?.file)}>Project Assets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-6 mb-3">
                                <div className="d-flex  justify-content-end">
                                    <div className="delivery-date text-end ps-5">
                                        <div className="fw-bold h6">
                                            Delivered{" "}
                                            {receivedData?.status === "production"
                                                ? "expected"
                                                : "on"}
                                            <span className="d-block h6">
                                                {formatDate(receivedData?.delivery_date)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row justify-content-between expand-request-data">
                                    <div className="col-md-4">
                                        <p>      
                                            <span className="fw-bold d-block">Description</span>
                                            <span className="d-block">
                                                {receivedData?.description}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="d-flex justify-content-center gap-4">
                                            <div className="">
                                                <p>
                                                    <span className="fw-bold d-block">Size</span>
                                                    {receivedData?.size?.map((value) => (
                                                        <span className="d-block">{value}</span>
                                                    ))}
                                                </p>
                                            </div>
                                            <div><p><span className="fw-bold d-block">File Type</span>{receivedData?.file_type}</p></div>
                                            <div><p><span className="fw-bold d-block">Transparency</span>{receivedData?.transparency}</p></div>
                                        </div>
                                    </div>
                                       

                                    <div className="col-md-3">
                                        <p className="word-break"><span className="fw-bold d-block">References</span>
                                        {receivedData?.references?.includes('https') ?
                                            <Link
                                                className="text-decoration-none"
                                                to={`${receivedData?.references}`}
                                                target="_blank"
                                            >
                                                {receivedData?.references}
                                            </Link>
                                            : <span className="d-block">
                                                {receivedData?.references}
                                            </span>
                                        }
                                        </p>
                                    </div>
                                           
                                </div>
                                        
                            </div>

                            <div>
                                <div className="col-md-12">
                                    {deliverrequests ? (
                                        deliverrequests?.data?.map((request) => (
                                            <div className="delivery-status-section bg-white p-4 rounded mt-3">
                                                {(request?.request_id?.status === "completed" && (request?.is_approved_by_customer) && (request?.is_approved_by_super_admin)) && (
                                                    <div className="row justify-content-center">
                                                        <div className="col-md-3 align-self-center">
                                                            <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-outline-dark rounded-pill px-2 py-1 fw-bold "
                                                                    >
                                                                        Delivery Accepted
                                                                    </button>{" "}
                                                                    <i className="fa-solid fa-circle-check"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 d-flex text-center justify-content-center">
                                                            <div className="statusbar-section d-flex flex-column justify-content-between">
                                                                <div className="delivery-status fw-bold">
                                                                    9:16
                                                                </div>
                                                                <div className="">
                                                                    <img src={designImage} alt="Imag" />
                                                                </div>
                                                                <div className="download-btn">
                                                                    <button
                                                                        className="rounded-pill px-3 py-1 fw-bold border-0"
                                                                        onClick={() =>
                                                                            handleDownload(
                                                                                `designe/landscape/${request?.landscape}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Download
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 d-flex text-center justify-content-center">
                                                            <div className="statusbar-section d-flex flex-column justify-content-between">
                                                                <div className="delivery-status fw-bold">
                                                                    16:9
                                                                </div>
                                                                <div className="">
                                                                    <img src={designImage2} alt="Imag" />
                                                                </div>
                                                                <div className="download-btn">
                                                                    <button
                                                                        className="rounded-pill px-3 py-1 fw-bold border-0"
                                                                        onClick={() =>
                                                                            handleDownload(
                                                                                `designe/portrait/${request?.portrait}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Download
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(((!request?.is_approved_by_customer) || (!request?.is_approved_by_super_admin)) && ((request?.landscape_feedback_message) || (request?.portrait_feedback_message)) && !(receivedData?.status === "production")) && (
                                                    <div className="row justify-content-center">
                                                        <div className="col-md-3 align-self-center">
                                                            <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                                {((request?.request_id?.landscape_feedback_message) || (request?.request_id?.portrait_feedback_message)) && (
                                                                    <div>
                                                                        <i className="fa-solid fa-circle-xmark cancel text-danger"></i>
                                                                        <span> Delivery Rejected</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 d-flex text-center justify-content-center">
                                                            <div className="statusbar-section d-flex flex-column justify-content-between">
                                                                <div className="delivery-status fw-bold">
                                                                    9:16
                                                                </div>
                                                                <div className="">
                                                                    <img src={designImage} alt="Imag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 d-flex text-center justify-content-center">
                                                            <div className="statusbar-section d-flex flex-column justify-content-between">
                                                                <div className="delivery-status fw-bold">
                                                                    16:9
                                                                </div>
                                                                <div className="">
                                                                    <img src={designImage2} alt="Imag" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {(((request?.landscape_feedback_message) || (request?.portrait_feedback_message)) && !(receivedData?.status === "production")) && (
                                                            <div className="col-md-12">
                                                                <div className="feedback-request  p-4 mt-4 rounded">
                                                                    <h5 className="fw-bold">
                                                                        Feedback Requested{" "}
                                                                        {request?.createdAt
                                                                            ? format(
                                                                                new Date(request?.createdAt),
                                                                                "dd/MM/yyyy"
                                                                            )
                                                                            : "No Date"}{" "}
                                                                        {formattedTime(request?.createdAt)}
                                                                    </h5>
                                                                    <p>
                                                                        {request?.landscape_feedback_message && <span className="d-block">{request?.landscape_feedback_message}</span>}
                                                                        {request?.portrait_feedback_message && <span className="d-block">{request?.portrait_feedback_message}</span>}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div></div>
                                    )}
                                    {((!receivedData?.status === 'completed')) &&
                                        <div className="delivery-status-section active-request p-5 rounded mt-4">
                                            <div className="row justify-content-center">
                                                <div className="col-md-4 justify-content-center align-self-center">
                                                    <div className="delivery-status fw-bold mb-2">
                                                        <i className="fa-solid fa-circle-minus minus"></i> Delivery{" "}
                                                        Expected
                                                    </div>
                                                    {receivedData?.delivery_date ? <p className="status-date text-secondary mb-0">
                                                        {format(
                                                            new Date(receivedData?.delivery_date),
                                                            "dd/MM/yyyy"
                                                        )}{" "}
                                                        {formattedTime(receivedData?.delivery_date)}
                                                    </p> : <p></p>}
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
                    </div>
                    {(receivedData?.status === "production") && (
                        <div className="delivery-status-section active-request p-5 rounded mt-4">
                            <div className="row justify-content-center">
                                <div className="col-md-4 justify-content-center align-self-center">
                                    <div className="delivery-status fw-bold mb-2">
                                        <i className="fa-solid fa-circle-minus minus"></i> Delivery{" "}
                                        {receivedData?.status === "production" ? "expected" : "on"}
                                    </div>
                                    <p className="status-date text-secondary mb-0">
                                        {format(
                                            new Date(receivedData?.delivery_date),
                                            "dd/MM/yyyy"
                                        )}{" "}
                                        {formattedTime(receivedData?.delivery_date)}
                                    </p>
                                </div>
                                <div className="col-md-4 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-between">
                                        <div className="delivery-status fw-bold">{receivedData?.size[0]}</div>
                                        <div className="">
                                            <img src={designImage3} alt="Imag" />
                                        </div>
                                    </div>
                                </div>
                                {receivedData?.size[1] && <div className="col-md-4 d-flex text-center justify-content-center">
                                    <div className="statusbar-section d-flex flex-column justify-content-evenly">
                                        <div className="delivery-status fw-bold">{receivedData?.size[1]}</div>
                                        <div className="">
                                            <img src={designImage4} alt="Imag" />
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        deliverrequests: state.requests.deliverrequests,
    };
};

export default connect(mapStateToProps)(RequestExpand);
