import React, { useEffect, useState } from "react";
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import ColorCode from "../../Common/ColorCode";
import { saveAs } from 'file-saver';
import { get_completed_request_forcusotmer_admin, get_review_request_data } from "../../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const { REACT_APP_BOMO_URL } = process.env;

const CompletedRequest = ({ deliverrequests, user }) => {
    const dispatch = useDispatch();
    const [receivedData, setReceivedData] = useState();

    useEffect(() => {
        let requestdetails = JSON.parse(localStorage.getItem('requestData'));
        setReceivedData(requestdetails);
    }, []);


    // useEffect(() => {
    //     return () => {
    //         dispatch(get_review_request_data(null));
    //     }
    // }, []);

    useEffect(() => {
        if (receivedData?._id) {
            get_completed_request_forcusotmer_admin(dispatch, user?.token, receivedData?._id);
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

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                <div className="mx-md-0 mx-lg-4 px-60 ">
                    <div className="order-completed px-5 py-4 rounded mb-5">
                        <p className="mb-0">Order Completed
                            <span className="d-block fw-bold">
                                All good! You approved this order and files are ready to be used
                            </span>
                        </p>
                    </div>
                    <div className="bg-white px-3 px-lg-5 py-5 review-main-content rounded pb-5">
                        <div className="row">
                            <div className="col-md-7 col-lg-6 mb-4">
                                <h3>{receivedData?.request_name}</h3>
                                <div className="review-content mt-3">
                                    <div className="d-flex align-items-center">
                                        <ColorCode request={receivedData} />
                                        <span class="brand-poll-circle">
                                            <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${receivedData?.brand_profile?.logo}`} alt='imga' />
                                        </span>
                                        <p className="short0ad project-assets ms-2 px-4 cursor-pointer" onClick={() => DownloadAll(receivedData?.file)}>Project Assets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-6 mb-3">
                                <div className="d-flex  justify-content-end">
                                    <div className="delivery-date text-end ps-5">
                                        <div className="fw-bold h6">
                                            Delivered{" "}
                                            on
                                            <span className="d-block h6">
                                                {formatDate(deliverrequests?.request_id?.design_approved_at_by_customer)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row order-completed-table">
                                    
                                                <div className="col-md-4">
                                                    <p className="word-break">
                                                        <span className="fw-bold"> Description </span>
                                                          <span className="d-block">
                                                        {receivedData?.description}
                                                      </span>
                                                    </p>
                                                  
                                                </div>
                                                <div class="col-md-5">
                                                    <div className="d-flex gap-4 justify-content-center">
                                                        <div>
                                                            <p className="word-break">
                                                                <span className="fw-bold">
                                                                Size</span>
                                                                <span className="d-block">
                                                                        {receivedData?.size?.map((value) => (
                                                                    <span className="d-block">{value}</span>
                                                                ))}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                <span className="fw-bold">
                                                                File Type</span>
                                                            <span className="d-block">{receivedData?.file_type}
                                                             </span>
                                                           </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                            <span className="fw-bold"> Transparency  </span>
                                                            <span className="d-block">{receivedData?.transparency}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                
                                                <div className="col-md-3">
                                                    <div className="">
                                                        <p className="word-break">
                                                            <span className="fw-bold ">
                                                            
                                                        References</span>
                                                            <span className="d-block">
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
                                                            </span>
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                            
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="col-md-12">
                                    <div className="delivery-status-section light-gray p-4 rounded ">
                                        <div className="row ">
                                            <div className="col-md-3 align-self-center">
                                                <div className="delivery-status fw-bold d-flex text-center align-items-center justify-content-center">
                                                    <div>
                                                    <i className="fa-solid fa-circle-check"></i>
                                                        <button
                                                            type="button"
                                                            class="border-0 h5 m-0 p-0 bg-transparent px-2 py-1 fw-bold "
                                                        >
                                                            Delivery Accepted
                                                        </button>{" "}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">
                                                        {receivedData?.size[0]}
                                                    </div>
                                                    <div className="">
                                                        <img src={designImage2} alt="Imag" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button
                                                            className="rounded-pill px-4 py-0 fw-bold border-dark"
                                                            onClick={() =>
                                                                handleDownload(
                                                                    `designe/landscape/${deliverrequests?.request_id?.landscape}`
                                                                )
                                                            }
                                                        >
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {receivedData?.size[1] && <div className="col-md-3 d-flex text-center justify-content-center">
                                                <div className="statusbar-section d-flex flex-column justify-content-between">
                                                    <div className="delivery-status fw-bold">
                                                        {receivedData?.size[1]}
                                                    </div>
                                                    <div className="">
                                                        <img src={designImage} alt="Imag" />
                                                    </div>
                                                    <div className="download-btn">
                                                        <button
                                                            className="rounded-pill px-4 py-0 fw-bold border-dark"
                                                            onClick={() =>
                                                                handleDownload(
                                                                    `designe/portrait/${deliverrequests?.request_id?.portrait}`
                                                                )
                                                            }
                                                        >
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        deliverrequests: state.requests.completeddetails,
        requesdivata: state.requests.reviewrequestData,
    };
};

export default connect(mapStateToProps)(CompletedRequest);
