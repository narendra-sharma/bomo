import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { get_admin_pending_requestlist } from '../../reduxdata/rootAction';
import ExpandRequest from '../../Modals/ExpandRequest';
import RejectRequest from '../../Modals/RejectRequest';
import ColorCode from '../../Common/ColorCode';
import EmptyList from '../../Common/EmptyList';
import AcceptRequest from '../../Modals/AcceptRequest';
import CustomPagination from '../../Common/CustomPagination';

const ApproveRequest = ({ user, allRequest, total }) => {
    const [show, setShow] = useState(false);
    const [isreject, setIsreject] = useState(false);
    const [showAcceptModal, setshowAcceptModal] = useState([]);
    const [reqdata, setReqdata] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        get_admin_pending_requestlist(dispatch, user?.token, 1, 10);
    }, [dispatch, user?.token]);

    const handleReject = (e,data,status) => {
        e.preventDefault();
       if((status === 'rejected')&&data){
            setIsreject(true);
            setReqdata(data);
        }
    };

    return (
        <div className="row g-0">
            <div className="col-lg-12">
                <small className="text-muted fw-bold">
                    {total} requests left{" "}
                </small>
            </div>
            {total > 0 ? allRequest?.map((request) => (
                <div className="col-lg-6">
                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td style={{width:'37px'}}>
                                        <p>12h</p>
                                    </td>
                                    <td className="text-center" style={{width:'122px'}}>
                                        <ColorCode request={request} />
                                    </td>
                                    <td style={{width:'100px'}}>
                                        <p>
                                            <span className="fw-bold">{request?.user_id?.company}</span>{" "}
                                            <span className="d-block">
                                                {request?.brand_profile?.brandname ? request?.brand_profile?.brandname : '-'}
                                            </span>
                                        </p>
                                    </td>
                                    <td style={{width:'78px'}}>
                                        <p>{request?.request_name}</p>
                                    </td>
                                    <td style={{width:'112px'}}>
                                        <p>
                                            <span className="fw-bold" onClick={() => { setShow(true); setReqdata(request) }}>
                                                Expand Request
                                            </span>{" "}
                                        </p>
                                    </td>
                                    <td style={{width:'80px'}}>
                                       <div class="d-flex gap-2">
                                        <div>
                                        <i className="fa-solid fa-check-circle active-request-status cursor-pointer" onClick={() => setshowAcceptModal(request?._id)}></i>
                                        {showAcceptModal === request?._id && (
                                            <AcceptRequest
                                                heading={request?.request_name}
                                                showAcceptModal={showAcceptModal}
                                                setshowAcceptModal={setshowAcceptModal}
                                                id={request?._id}
                                                token={user?.token}
                                            />
                                        )}
                                        </div>
                                        <div>
                                        <i className="fa-solid fa-circle-xmark cancel cursor-pointer" onClick={(e) => handleReject(e,request,'rejected')}></i>
                                   
                                        </div>
                                        </div>

                                    </td>
                                  
                                       
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )) : (<EmptyList name="Approve Request" />)}
            {total > 0 && (
                <CustomPagination
                    total={total}
                    onPageChange={(newPage, newLimit) => {
                        get_admin_pending_requestlist(dispatch, user?.token, newPage, newLimit);
                    }}
                />
            )}
            <ExpandRequest show={show} handleClose={() => setShow(false)} requestdata={reqdata} />
            <RejectRequest show={isreject} handleClose={() => setIsreject(false)} detail={reqdata} reqstatus='draft' />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        approvelist: state.requests.superadminapprovelist,
        allRequest: state.requests.pendingRequests,
        total: state.requests.pendingTotal,
    };
};
export default connect(mapStateToProps)(ApproveRequest);