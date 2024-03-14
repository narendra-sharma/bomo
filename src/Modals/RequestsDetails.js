import React, { useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import briefImage from "../images/brief-request-img.png";
import ColorCode from "../Common/ColorCode";
import { useDispatch, connect } from 'react-redux';
import { desginer_accept_assignrequest, poll_request_apply } from "../reduxdata/rootAction";
import { saveAs } from "file-saver";
import CountdownTimer from "../Common/CountdownTimer";

const { REACT_APP_BOMO_URL } = process.env;

const RequestDetails = ({ show, handleClose, data, user, filePath, reqaccept }) => {
    const dispatch = useDispatch();
    const handleApplyRequest = (requestdata) => {
        let applyrequest = requestdata._id;
        poll_request_apply(applyrequest, dispatch, user?.token);
        handleClose();
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

    const handleacceptRequest = useCallback((requestdetail, status) => {
        const request_id = requestdetail._id;

        desginer_accept_assignrequest(dispatch, user?.token, request_id, user?.email, user?._id, status);
        handleClose();
    }, [dispatch, user?.token, user?.email, user?._id]);

    return (
        <Modal show={show} onHide={handleClose} size="lg" className="brief-request-popup">
            <Modal.Body>
                <div className=" px-4 py-5 review-content ">
                    <div className="row align-items-center">
                        <div className="col-md-7 col-12 mb-4 designer-active-request">
                            <span class="deadline-date status position-relative ps-3">Selection in <span class="fw-bold"><span> <CountdownTimer requestDate={data?.accepted_date} duration={14 * 60 * 60 * 1000} reqtype="pool" />hour</span></span></span>
                        </div>
                        <div className="col-md-5 col-12 mb-4">
                            <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                <p>{data?.designer_list?.length} applications</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-12">
                            <div className="mb-4">
                                <h2 className="h3 fw-bold text-black">{data?.request_name}</h2>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <ColorCode request={data} />
                                <p class="short0ad dor rounded-pill">{data?.brand_profile?.brandname ? data?.brand_profile?.brandname : '-'}</p>
                                {/* <p className="brand-assets-btn rounded bg-white request-poll-active" onClick={() => handleDownload(`${data?.brand_profile?.brandassests}`)}>Brand Assets</p> */}
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
                                <img src={briefImage} alt="brief image" />
                                {/* <div className="project-btn">
                                    <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center" onClick={() => handleDownload(`${data?.brand_profile?.logo}`)}>
                                        Project Assets
                                    </div>
                                </div> */}
                            </div>
                            <div className="table-responsive expand-request">
                                <table className="table table-borderless mb-0">
                                    <thead>
                                        <tr>
                                            <th className="ps-0" width="275px"><p>Description</p></th>
                                            <th style={{ width: "95px" }}><p><span className="fw-bold d-block">Reference</span> </p></th>
                                            <th ><p><span className="fw-bold d-block">Deliverables</span></p></th>
                                            <th ><p><span className="fw-bold d-block">Format</span></p> </th>
                                            <th className="pr-0" width="122px"><p><span className="fw-bold d-block">Transparency</span></p> </th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="ps-0"  width="275px">
                                                <p>
                                                    <span className="d-block">{data?.description}</span>
                                                </p>
                                            </td>
                                            <td><p><span className="d-block">{data?.references}</span> </p></td>
                                            <td><p> {data?.size?.map((item => <span className="d-block">{item}</span>))}</p></td>
                                            <td><p><span className="d-block">{data?.file_type}</span></p> </td>
                                            <td className="pr-0"><p>{data?.transparency}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {reqaccept ?
                                <div className="mt-4 row justify-content-between">
                                    <div className="col-md-6 status-btn">
                                        <Button className="btn pause-btn rounded py-2 w-100" onClick={() => handleacceptRequest(data, 'accepted')}>ACCEPT</Button>
                                    </div>
                                    <div className="col-md-6 status-btn">
                                        <Button className="btn pause-btn rounded py-2 w-100" onClick={() => handleacceptRequest(data, 'rejected')}>DECLINE</Button>
                                    </div>
                                </div>
                                :
                                <div className="mt-4 row justify-content-between">
                                    <div className="col-md-9 status-btn">
                                        <button className="btn pause-btn rounded py-2 w-100"
                                            onClick={() => handleApplyRequest(data)}
                                            disabled={data?.applied}>{data?.applied ? 'APPLIED' : 'APPLY'}</button>
                                    </div>
                                    <div className="col-md-3"><h5 class="fw-bold mb-0 text-end">$125</h5></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        filePath: state.requests.filePath
    };
};
export default connect(mapStateToProps)(RequestDetails);



