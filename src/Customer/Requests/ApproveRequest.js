import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { get_approve_delivery_list, superadmin_approve_delivery } from '../../reduxdata/rootAction';
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import designImage3 from "../../images/sixteen-nine2.png";
import { format } from 'date-fns';
import ExpandRequest from '../../Modals/ExpandRequest';
import RejectRequest from '../../Modals/RejectRequest';
import ColorCode from '../../Common/ColorCode';

const ApproveRequest = ({ user, approvelist }) => {
    const [show, setShow] = useState(false);
    const [isapprove, setIsapprove] = useState({});
    const [isreject, setIsreject] = useState(false);
    const [reqdata, setReqdata] = useState({});
    const dispatch = useDispatch();

    const handleApprove = (e, data, status) => {
        e.preventDefault();
        const requestId = data?._id;
        if ((status === 'accepted') && data) {
            const approvedata = {
                _id: requestId,
                deliverystatus: status
            };
            setIsapprove((prev) => ({ ...prev, [requestId]: 'accepted' }));
            superadmin_approve_delivery(dispatch, user?.token, approvedata);
        } else if ((status === 'rejected') && data) {
            setIsreject(true);
            setReqdata(data);
        }
    };

    useEffect(() => {
        get_approve_delivery_list(user?.token, dispatch);
    }, [dispatch, user?.token]);

    return (
        <div className="row g-0">
            <div className="col-lg-12">
                <small className="text-muted fw-bold">
                    {approvelist?.length} requests left{" "}
                </small>
            </div>
            {approvelist?.map((request) => (
                <div className="col-lg-6">
                    <div className="table-responsive">
                        <table className="table table-borderless">
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
                                            <span className="fw-bold">Cratat</span>{" "}
                                            <span className="d-block">Dior</span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>Ad ss23 Winter</p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className="fw-bold" onClick={() => setShow(true)}>
                                                Expand Request
                                            </span>{" "}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-outline-success rounded-pill" onClick={(e) => handleApprove(e, request, 'accepted')}>
                                                {isapprove[request?._id] === 'accepted' ? 'Approve' : 'Approve Delivery'}
                                            </button>
                                            {isapprove[request?._id] === 'accepted' ?
                                                <i className="fa-solid fa-check-circle text-success"></i> :
                                                <i className="fa-solid fa-circle-xmark cancel" onClick={(e) => handleApprove(e, request, 'rejected')}></i>}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <ExpandRequest show={show} handleClose={() => setShow(false)} />
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
export default connect(mapStateToProps)(ApproveRequest);