import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { deliever_request_details, get_approve_delivery_list, superadmin_approve_delivery } from '../../reduxdata/rootAction';
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import designImage3 from "../../images/sixteen-nine2.png";
import ColorCode from '../../Common/ColorCode';
import { format } from 'date-fns';
import ExpandRequest from '../../Modals/ExpandRequest';
import RejectRequest from '../../Modals/RejectRequest';
import { saveAs } from 'file-saver';

const { REACT_APP_BOMO_URL } = process.env;

const ApproveDelivery = ({ user, approvelist }) => {
    const [show, setShow] = useState(false);
    const [isapprove, setIsapprove] = useState({});
    const [isreject, setIsreject] = useState(false);
    const [reqdata, setReqdata] = useState({});
    const dispatch = useDispatch();

    const handleApprove = async (e, data, status) => {
        e.preventDefault();
        const requestId = data?._id;
        if ((status === 'accepted') && data) {
            const approvedata = {
                _id: requestId,
                deliverystatus: status
            };
            await superadmin_approve_delivery(dispatch, user?.token, approvedata);
            setIsapprove((prev) => ({ ...prev, [requestId]: 'accepted' }));
            setTimeout(() => {
                get_approve_delivery_list(user?.token, dispatch);
            },3000);
        } else if ((status === 'rejected') && data) {
            setIsreject(true);
            setReqdata(data);
        }
    };

    const handleExpand = () => {
        setShow(false);
        localStorage.removeItem('requestData');
        dispatch(deliever_request_details(null));
    };

    useEffect(() => {
        get_approve_delivery_list(user?.token, dispatch);
    }, [dispatch, user?.token]);

    const handleDownload = async (fileUrl) => {
        console.log(fileUrl);
        const filepath = fileUrl.includes('+') ? fileUrl.replace(/\+/g, '%2B') : fileUrl;
        const fileContent = `${REACT_APP_BOMO_URL}download?file=${filepath}`;
        console.log("File Content URL:", fileContent);
        const fileName = fileUrl?.substring(fileUrl?.lastIndexOf("/") + 1);
        const getMimeType = (ext) => {
            const mimeTypes = {
                txt: "text/plain",
                pdf: "application/pdf",
                zip: "application/zip",
                jpg: "image/jpeg",
                jpeg: "image/jpeg",
                png: "image/png",
                gif: "image/gif",
                mp4: "video/mp4",
                mov: "video/quicktime"
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
        <div className="row">
            <div className="col-lg-12">
                <small className="text-muted fw-bold">
                    {approvelist?.length} requests left{" "}
                </small>
            </div>
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        {approvelist?.map((request) => (
                            <tbody>
                                <tr>
                                    <td>
                                        <p>12h</p>
                                    </td>
                                    <td className="text-center">
                                        <ColorCode request={request} />
                                    </td>
                                    <td>
                                        <p>
                                            <span className="fw-bold">{request?.user_id?.company}</span>{" "}
                                            <span className="d-block">{request?.request_name}</span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className="fw-bold">Delivery</span>{" "}
                                            <span className="d-block">{!request?.delivery_date
                                                ? "No Date"
                                                : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className="cursor-pointer" onClick={() => { 
                                                setShow(true); 
                                                dispatch(deliever_request_details(request)); 
                                                localStorage.setItem('requestData', JSON.stringify(request));
                                                }}>Expand Request</span>{" "}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between cursor-pointer">
                                            <div className="delivery-status fw-bold">
                                                <p>{request?.size[0]}</p>
                                            </div>
                                            <div className="bar-code" onClick={() => handleDownload(`designe/landscape/${request?.landscape}`)}>
                                                <img src={designImage} alt="Image" />
                                            </div>
                                        </div>
                                    </td>
                                    {request?.size[1] && <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between cursor-pointer">
                                            <div className="delivery-status fw-bold">
                                                <p>{request?.size[1]}</p>
                                            </div>
                                            <div className="bar-code" onClick={() => handleDownload(`designe/portrait/${request?.portrait}`)}>
                                                <img src={designImage2} alt="Image" />
                                            </div>
                                        </div>
                                    </td>}
                                    <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between cursor-pointer">
                                            <div className="delivery-status fw-bold">
                                                <p>.{request?.zip?.split(".").pop().toLowerCase()}</p>
                                            </div>
                                            <div className="bar-code" onClick={() => handleDownload(`${request?.zip}`)}>
                                                <img src={designImage3} alt="Imag" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-outline-success rounded-pill" onClick={(e) => handleApprove(e, request, 'accepted')}>
                                                {isapprove[request?._id] === 'accepted' ? 'Approved' : 'Approve Delivery'}
                                            </button>
                                            {isapprove[request?._id] === 'accepted' ?
                                                <i className="fa-solid fa-check-circle text-success"></i> :
                                                <i className="fa-solid fa-circle-xmark cancel" onClick={(e) => handleApprove(e, request, 'rejected')}></i>}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <ExpandRequest show={show} handleClose={() => { handleExpand();}} />
            <RejectRequest show={isreject} handleClose={() => setIsreject(false)} detail={reqdata} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        approvelist: state.requests.superadminapprovelist,
    };
};
export default connect(mapStateToProps)(ApproveDelivery);