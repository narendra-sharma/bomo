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

const { REACT_APP_BOMO_URL } = process.env;

const DelieverRequest = () => {
    const [requestData, setRequestData] = useState();

    useEffect(() => {
        let requestdetails = JSON.parse(localStorage.getItem('requestData'));
        setRequestData(requestdetails);
    }, []);


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
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                    <div className="mx-md-0 mx-lg-4 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                            <p className="mb-0 extra-dark-green"> DELIVER NOW. This request is in Production
                                <span className="d-block fw-bold">Delivery in
                                    <CountdownTimer requestDate={requestData?.req_mail_date} duration={20 * 60 * 60 * 1000} />
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
                                            <div className="fw-bold h6">Completed<span className="d-block h6">Jan 20th</span></div>
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
    };
};

export default connect(mapStateToProps)(DelieverRequest);
