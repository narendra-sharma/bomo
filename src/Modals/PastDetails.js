import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png";
import ColorCode from "../Common/ColorCode";
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";

const { REACT_APP_BOMO_URL } = process.env;

const PastDetails = ({ show, handleClose, data }) => {
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
        <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll logout-popup">
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
                                <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${data?.brand_profile?.logo}`} alt='imga' height="33" widht="36" />
                                <p className="brand-assets-btn rounded bg-white request-poll-active cursor-pointer" onClick={() => handleDownload(`${data?.brand_profile?.brandassests}`)}>
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
                                    <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center cursor-pointer" onClick={() => DownloadAll(data?.file)}>
                                        Project Assets
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                              
                                <div class="col-md-4">
                                    <p>
                                      <span className="d-block fw-bold">Description</span>  
                                        <span className="d-block">{data?.description}</span>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <p className="word-break">
                                       <span className="d-block fw-bold">Reference</span> 
                                        {data?.references?.includes('http') ?
                                            <Link className="text-decoration-none" to={`${data?.references}`} target="_blank">
                                                {data?.references}
                                            </Link>
                                            : <span className="fw-bold d-block">{data?.references}</span>
                                        }
                                   </p>  
                                </div>
                                <div className="col-md-2">
                                    <p>
                                        <span className="d-block fw-bold">Deliverables</span> 
                                        <span className="fw-bold d-block">{data?.size}</span>
                                    </p>
                                    </div>
                                <div className="col-md-1"> <p>
                                <span className="d-block fw-bold">Format</span>
                                    
                                    <span className="d-block">{data?.file_type}</span></p> </div>
                                <div className="col-md-2">
                                    <div className="float-right"><p>
                                    <span className="d-block fw-bold">Transparency</span> {data?.transparency}</p></div>
                                </div>
                                       
                            </div>
                                    
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
};

export default PastDetails;



