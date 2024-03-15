import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png";
import ColorCode from "../Common/ColorCode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deliever_request_details } from "../reduxdata/rootAction";
import CountdownTimer from "../Common/CountdownTimer";
import { saveAs } from 'file-saver';

const { REACT_APP_BOMO_URL } = process.env;

const RequestBrief = ({ show, handleClose, data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeliever = (requestdata) => {
        navigate('/deleiver-request');
        dispatch(deliever_request_details(requestdata));
    };

    const handleDownload = async (fileUrl) => {
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g, '%2B') : fileUrl;
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
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
        filesUrl?.forEach(async (url) => {
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
        <>
            <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll logout-popup">
                <Modal.Body>
                    <div className="px-5 py-5 review-content ">
                        <div className="row align-items-center">
                            <div className="col-md-7 col-12">
                                <div className="mb-4">
                                    <h2 className="h3 fw-bold">{data?.request_name}</h2>
                                </div>
                            </div>
                            <div className="col-md-5 col-12">
                                <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                    <span class="deadline-date status position-relative deliver-now-btn">Deadline in <span class="fw-bold"><CountdownTimer requestDate={data?.req_mail_date} duration={20 * 60 * 60 * 1000} /> </span></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-center mb-3">
                                    <ColorCode request={data} />
                                    <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${data?.brand_profile?.logo}`} alt='imga' height="33" widht="36" />
                                    <p className="brand-assets-btn rounded bg-white request-poll-active cursor-pointer" onClick={() => handleDownload(`${data?.brand_profile?.brandassests}`)}>
                                        Brand Assets
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 delivery-date-content">
                                <div class="text-end mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><span class="fw-bold"> Delivery Date</span>
                                            <span class="d-block">Mon 10 - 9:00</span>
                                        </div>
                                        <div><h5 class="fw-bold mb-0">$125</h5></div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="mb-3 position-relative">
                                    <img src={reelImage} alt="reel imag" width="100%" />
                                    <div className="project-btn">
                                        <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center cursor-pointer" onClick={() => DownloadAll(data?.file)}>
                                            Project Assets
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td class="ps-0" width="230px" style={{ paddingRight: "30px" }}>
                                                    <p>
                                                        <span className="d-block fw-bold">Description</span>
                                                        <span className="d-block">{data?.description}</span>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <span className="fw-bold d-block">Reference</span>
                                                        {data?.references?.includes('http') ?
                                                            <Link className="text-decoration-none" to={`${data?.references}`} target="_blank">
                                                                {data?.references}
                                                            </Link>
                                                            : <span className="d-block">{data?.references}</span>
                                                        }
                                                    </p>
                                                </td>
                                                <td><p><span className="fw-bold d-block">Deliverables</span> {data?.size?.map((item) => <span className="fw-bold d-block">{item}</span>)}</p></td>
                                                <td><p><span className="fw-bold d-block">Format</span> <span className="fw-bold d-block">{data?.file_type}</span></p> </td>
                                                <td><p><span className="fw-bold d-block">Transparency</span> {data?.transparency}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                    <button type="button" class="rounded deliver-now-btn btn btn-unset w-100 fw-bold text-uppercase py-2" onClick={() => handleDeliever(data)}>DELIVERY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default RequestBrief;


