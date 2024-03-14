import React, { useEffect, useState } from "react";
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import ColorCode from "../../Common/ColorCode";
import { saveAs } from 'file-saver';
import { get_completed_request_forcusotmer_admin, get_review_request_data } from "../../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";

const { REACT_APP_BOMO_URL } = process.env;

const CompletedRequest = ({deliverrequests,user, requestData}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            localStorage.removeItem('requestData');
            dispatch(get_review_request_data(null));
        }
    }, []);

    useEffect(() => {
        if (requestData?._id) {
            get_completed_request_forcusotmer_admin(dispatch, user?.token, requestData?._id);
        }
    }, [requestData?._id]);

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
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g,'%2B') : fileUrl;
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

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 pt-md-2 pt-lg-5 pb-0">
                <div className="mx-md-0 mx-lg-4 px-60 ">
                        <div className="order-completed px-5 py-4 rounded mb-5">
                            <p className="mb-0 extra-dark-green">Order Completed
                                <span className="d-block fw-bold">
                                All good! You approved this order and files are ready to be used
                                </span>
                            </p>
                        </div> 
                    <div className="bg-white px-3 px-lg-5 py-4 review-main-content rounded pb-5">
                        <div className="row">
                            <div className="col-md-7 col-lg-6 mb-4">
                                <h3>{requestData?.request_name}</h3>
                                <div className="review-content mt-3">
                                    <div className="d-flex">
                                        <ColorCode request={requestData} />
                                        <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${requestData?.brand_details?.logo}`} alt='imga' height="33" widht="33"/>
                                        <p className="short0ad project-assets ms-2 px-4">Project Assets</p>
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
                                <div className="table-responsive">
                                    <table className="table request-status designer-request-status table-borderless mb-0">
                                        <thead>
                                            <tr>
                                                <th className="ps-0" width="300px">Description</th>
                                                <th>Size</th>
                                                <th>File Type </th>
                                                <th>Transparency</th>
                                                <th className="text-end">References</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="ps-0">
                                                    <span className="d-block">
                                                        {requestData?.description}
                                                    </span>
                                                </td>
                                                <td>
                                                    {requestData?.size?.map((value) => (
                                                        <span className="d-block">{value}</span>
                                                    ))}
                                                </td>
                                                <td>{requestData?.file_type}</td>
                                                <td>{requestData?.transparency}</td>
                                                <td className="text-end">
                                                    {requestData?.references}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <div className="col-md-12">                
                                            <div className="delivery-status-section bg-white p-4 rounded mt-3">
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
                                                                                `designe/landscape/${deliverrequests?.request_id?.landscape}`
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
                                                                                `designe/portrait/${deliverrequests?.request_id?.portrait}`
                                                                            )
                                                                        }
                                                                    >
                                                                        Download
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
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
        requestData: state.requests.reviewrequestData,
    };
};

export default connect(mapStateToProps)(CompletedRequest);
