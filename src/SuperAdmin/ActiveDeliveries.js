import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CountdownTimer from "../Common/CountdownTimer";
import { saveAs } from 'file-saver';
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
import EmptyList from "../Common/EmptyList";

const { REACT_APP_BOMO_URL } = process.env;

const ActiveDeliveries = ({ activerequest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activerequests, setActiverequests] = useState([]);

    useEffect(() => {
        setActiverequests(activerequest);
    }, [activerequest]);

    const handleDeliever = (requestdata) => {
        localStorage.setItem('requestData', JSON.stringify(requestdata));
        navigate("/deleiver-request");
        // dispatch(deliever_request_details(requestdata));
    };

    const handleDownload = async (fileUrl) => {
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g, '%2B') : fileUrl;
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
        // const fileContent = `${REACT_APP_BOMO_URL}download?file=${fileUrl}`;
        const fileName = fileUrl?.substring(fileUrl.lastIndexOf('/') + 1);
        const getMimeType = (ext) => {
            const mimeTypes = {
                txt: 'text/plain',
                pdf: 'application/pdf',
                zip: 'application/zip',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                ai: 'application/postscript',
                svg: 'image/svg+xml',
                psd: 'image/vnd.adobe.photoshop',
            };
            return mimeTypes[ext] || 'application/octet-stream';
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
    return (
        <div className="review-main-content review-content">
            <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>My Active Requests</h3>
            </div>
            {activerequests?.length > 0 ? (
                activerequests?.map((request) => (
                    <div className="row align-items-center mb-4">
                        <div className="col-md-8">
                            <div className="bg-white px-2 px-md-4 py-5 rounded">
                                <div className="row align-items-center">
                                    <div className="col-md-7 col-12">
                                        <div className="mx-md-4 mx-sm-0 mb-4">
                                            <h2 className="h3 fw-bold">
                                                {request?.request_name}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="col-md-5 col-12">
                                        <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                            <span className="brand-poll-circle"><img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${request?.brand_profile?.logo}`} alt='imga' /></span>
                                            <span class="deadline-date status position-relative deliver-now-btn">
                                                Deadline in {" "}
                                                    <span className="fw-bold">
                                                        <CountdownTimer requestDate={request?.req_mail_date} duration={24 * 60 * 60 * 1000} />
                                                    </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center">
                                            <ColorCode request={request} />
                                            <p
                                                className="brand-assets-btn rounded cursor-pointer"
                                                onClick={() =>
                                                    handleDownload(
                                                        `${request?.brand_profile?.brandassests}`
                                                    )
                                                }
                                            >
                                                Brand Assets
                                            </p>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-4"> </div>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <p>
                                                            <span className="fw-bold d-block">
                                                                Status
                                                            </span>

                                                            {request?.status && 'Production'}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p>
                                                            <span className="fw-bold d-block">
                                                                Expected Delivery{" "}
                                                            </span>
                                                            {!request?.delivery_date
                                                                ? "No Date"
                                                                : format(
                                                                    new Date(request?.delivery_date),
                                                                    "dd/MM/yyyy"
                                                                )}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p>
                                                            <span className="fw-bold d-block">
                                                                Transparency
                                                            </span>
                                                        </p>{" "}
                                                        {request?.transparency}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>
                                                    <span className="fw-bold d-block">
                                                        Description
                                                    </span>
                                                    <span className="d-block">
                                                        {request?.description}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <p className="word-break">
                                                            <span className="fw-bold d-block">
                                                                Reference
                                                            </span>{" "}
                                                            {request?.references?.includes('http') ?
                                                                <Link className="text-decoration-none" to={`${request?.references}`} target="_blank">
                                                                    {request?.references}
                                                                </Link>
                                                                : <span className="d-block">{request?.references}</span>
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p>
                                                            <span className="fw-bold d-block">
                                                                Deliverables
                                                            </span>
                                                            {request?.size?.map((item) => <span className="d-block">{item}</span>)}

                                                        </p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p><span className="d-block fw-bold">Format</span> <span className="d-block">{request?.file_type}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="project-assets-btn mt-4 fw-bold w-100 rounded-pill px-3 py-1 text-center cursor-pointer"
                                            onClick={() => DownloadAll(request?.file)}>
                                            Project Assets
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-3 text-center">
                                    <div className="delivery-arrow">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </div>

                                <div className="col-md-8 ">
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            class="rounded-pill deliver-now-btn ms-2 btn btn-unset w-100 fw-bold text-uppercase"
                                            onClick={() => handleDeliever(request)}
                                        >
                                            Deliver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <EmptyList name="Active Request" />
            )}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        activerequest: state.requests.activerequest,
        isLoading: state.loader.isLoading,
    };
};

export default connect(mapStateToProps)(ActiveDeliveries);
