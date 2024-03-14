import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png";
import ColorCode from "../Common/ColorCode";
import { saveAs } from 'file-saver';

const { REACT_APP_BOMO_URL } = process.env;

const PastDetails = ({ show, handleClose, data }) => {
    const handleDownload = async (fileUrl) => {
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g,'%2B') : fileUrl;
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

    return (
        <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll">
            <Modal.Body>
                <div className=" px-5 py-5 px-md-5 review-content ">
                    <div className="row align-items-center">
                        <div className="col-md-7 col-12">
                            <div className="mb-4">
                                <h2 className="h3 fw-bold">{data?.request_name}</h2>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <ColorCode request={data} />
                                <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${data?.brand_profile?.logo}`} alt='imga' height="33" widht="36"/>
                                <p className="brand-assets-btn rounded bg-white request-poll-active" onClick={() => handleDownload(`${data?.brand_profile?.brandassests}`)}>
                                    Brand Assets
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 delivery-date-content">
                            <div class="text-end mb-3">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div><span class="fw-bold"> Delivery Date</span>
                                        <span class="d-block">Mon 10 - 9:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3 position-relative">
                                <img src={reelImage} alt="reel imag" width="100%" />
                                <div className="project-btn">
                                    <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center" onClick={() => handleDownload(`${data?.brand_profile?.logo}`)}>
                                        Project Assets
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                    <thead>
                                        <th style={{ width: "240px" }}><p>Description</p></th>
                                        <th style={{ width: "105px" }}><p><span className="fw-bold d-block">Reference</span> </p></th>
                                        <th style={{ width: "100px" }}><p><span className="fw-bold d-block">Deliverables</span></p></th>
                                        <th style={{ width: "100px" }}><p><span className="fw-bold d-block">Format</span></p> </th>
                                        <th><p><span className="fw-bold d-block">Transparency</span></p> </th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span className="d-block">{data?.description}</span>
                                                </p>
                                            </td>
                                            <td><p><span className="fw-bold d-block">{data?.references}</span> </p></td>
                                            <td><p><span className="fw-bold d-block">{data?.size}</span></p></td>
                                            <td><p><span className="fw-bold d-block">{data?.file_type}</span></p> </td>
                                            <td><p>{data?.transparency}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
};

export default PastDetails;



