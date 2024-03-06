import React from "react";
import { Link, useLocation } from "react-router-dom";
import ColorCode from "../../Common/ColorCode";
import fileImage from "../../images/file-thumbnail.png";
import { saveAs } from 'file-saver';

const { REACT_APP_BOMO_URL } = process.env;

const Details = () => {
    const location = useLocation();
    const requestData = location?.state;

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
                ai: 'application/postscript',
                svg: 'image/svg+xml',
                psd: 'image/vnd.adobe.photoshop',
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
                <div className="px-60 py-5 mx-3 review-main-content bg-white">
                    <div className="row review-content">
                        <div className="col-md-7">
                            <div class="mb-3"><h3 class="fw-bold">{requestData?.request_name}</h3></div>
                        </div>
                        <div className="col-md-5">
                            <div class="d-flex justify-content-end">
                                {/* <h5 class="fw-bold">$125</h5> */}
                                <h6 class="text-end ps-5 fw-bold"> Delivered expected
                                    <span class="d-block"> {formatDate(requestData?.delivery_date)}</span></h6>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class=" d-flex align-items-center review-content ">
                                <ColorCode request={requestData} />
                                <p class="short0ad dor rounded-pill">{requestData?.brandname ? requestData?.brandname : '-'}</p>
                                <p class="short0ad project-assets rounded-pill">Project Assets</p>
                            </div>
                        </div>
                        <div className="col-md-10 mt-3">
                            <div class="table-responsive">
                                <table class="table table-borderless mb-0">
                                    <thead>
                                        <th>Description</th>
                                        <th>Size</th>
                                        <th>File Type </th>
                                        <th>Transparency</th>
                                        <th>References</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span className="d-block">
                                                        {requestData?.description}
                                                    </span>
                                                    {/* <span className="d-block">Where is this going to appear?</span> */}
                                                </p>
                                            </td>
                                            <td>  {requestData?.size?.map((value) => (
                                                <span className="d-block">{value}</span>
                                            ))}
                                            </td>
                                            <td><p>{requestData?.file_type}</p></td>
                                            <td><p>{requestData?.transparency}</p> </td>
                                            <td>
                                                <Link className="text-decoration-none" to={`${requestData?.references}`} target="_blank">{requestData?.references}</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="delivery-status-section active-request p-5 rounded mt-4">
                        <div className="row justify-content-center">
                            <h2 class="fw-bold">Uploaded Files</h2>
                            <div className="row mt-4">
                                {requestData?.file?.map((path, index) => (
                                    <div className="col-md-2 mb-2" onClick={() => handleDownload(path)}>
                                        <h4 className="mb-2">File {index + 1}</h4>
                                        <img src={fileImage} alt="Imag" height="120" width="120" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Details;
