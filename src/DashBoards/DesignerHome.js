import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PollRequests from "../Customer/Requests/PollRequests";
import { connect, useDispatch } from "react-redux";
import { deliever_request_details, get_designer_active_requestslist } from "../reduxdata/rootAction";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import RequestBrief from "../Modals/RequestBrief";
import EmptyList from "../Common/EmptyList";
import CountdownTimer from "../Common/CountdownTimer";
const DesignerHome = ({user, activerequest, pollrequests}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activerequests,setActiverequests] = useState([]);
    const [istoggle,setIstoggle] = useState(false);
    const [selectedData,setSelectedData]=useState([]);

    useEffect(()=> {
        get_designer_active_requestslist(dispatch,user?.token);
    },[]);

    useEffect(()=> {
        setActiverequests(activerequest)
    },[activerequest]);

    const handleDeliever = (requestData) => {
        navigate('/deleiver-request');
        dispatch(deliever_request_details(requestData));
    };

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content review-content ">
                    <div className="mx-md-5 mx-sm-0 mb-4"><h3 >My Active Requests</h3></div>
                    <div className="designer-active-request bg-white px-2 px-md-4 py-5 rounded">
                        {activerequests?.length > 0 ? activerequests?.map((request) => (
                            <div className="mb-4">
                                <div className="ms-4 mb-3">
                                    <span className="deadline-date status position-relative ps-3">Deadline in <span className="fw-bold"><CountdownTimer requestDate={request?.req_mail_date} /></span></span>
                                </div>
                                <div className="table-responsive rounded">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="text-center" style={{width:"100px"}}><ColorCode request={request} /></td>
                                                <td><p >{request?.brand_profile?.brandname}</p></td>
                                                <td  style={{width:"125px"}}><p><span className="fw-bold">{request?.request_name}</span></p></td>
                                                <td><p><span className="fw-bold" >Status</span> <span className="d-block">{request?.status}</span></p></td>
                                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span></p></td>
                                                <td style={{width:"140px"}}><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p></td>
                                                <td className="text-end"><p><span className="extra-dark-green cursor-pointer" onClick={() => {setIstoggle(true); setSelectedData(request);}}>+ show full brief</span> </p></td>
                                                <td className="text-end ps-0">
                                                    <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold" onClick={() => handleDeliever(request)}>DELIVERY NOW</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )) : <EmptyList name="Active Request" />}
                    </div>
                    <div className="mt-5">
                        <div className="mx-md-5 mx-sm-0 mb-4 d-flex"><h3 >Requests Poll</h3>
                            <span>{pollrequests?.length} requests</span>
                        </div>

                        <div className="poll-request-section">
                            <div className="row">
                                <PollRequests />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RequestBrief data={selectedData} show={istoggle} handleClose={() => setIstoggle(false)} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        activerequest: state.requests.activerequest,
        pollrequests: state.requests.pollrequests,
    };
};

export default connect(mapStateToProps)(DesignerHome);
