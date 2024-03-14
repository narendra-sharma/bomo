import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import EmptyList from '../../Common/EmptyList';
import ColorCode from '../../Common/ColorCode';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { desginer_accept_assignrequest, get_designer_assigned_requestlist } from '../../reduxdata/rootAction';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import RequestsDetails from '../../Modals/RequestsDetails';

const DesignerRequest = ({ designerassignedrequests, user }) => {
    const dispatch = useDispatch();
    const [assignedRequest, setAssignedRequest] = useState([]);
    const [toggle, setToggle] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        if (user?.token) {
            get_designer_assigned_requestlist(dispatch, user?.token);
        };
    }, [dispatch, user?.token]);

    useEffect(() => {
        setAssignedRequest(designerassignedrequests);
    }, [designerassignedrequests]);

    const handleacceptRequest = useCallback((requestdetail, status) => {
        const request_id = requestdetail._id;

        desginer_accept_assignrequest(dispatch, user?.token, request_id, user?.email, user?._id, status);
    }, [dispatch, user?.token, user?.email, user?._id]);

    return (
        <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                <div className="review-main-content review-content">
                    <div className="ms-4 mb-4">
                        <h3>Accept Request</h3>
                    </div>
                    <div className="designer-request bg-white px-5 px-md-4 py-5 rounded">
                        <div className="table-responsive rounded">
                            <table className="table table-borderless mb">
                                <tbody>
                                    {assignedRequest?.length ? assignedRequest?.map((request, index) => (

                                        <tr key={index}>
                                            <td className="text-center shortad"><ColorCode request={request} /></td>
                                            <td><p>{request?.brand_profile?.brandname}</p></td>
                                            <td><p>{request?.request_name}</p></td>
                                            <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status === 'design_assigned_pending' ? 'Awaiting Acceptance' : ''}</span></p></td>
                                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{request?.delivery_date ? '-' : 'No Date'}</span></p></td>
                                            <td className="text-end">
                                                <p>
                                                    <span
                                                        className="extra-dark-green cursor-pointer"
                                                        onClick={() => { setToggle(true); setSelectedData(request); }}
                                                    >
                                                        + show full brief
                                                    </span>{" "}
                                                </p>
                                            </td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold" onClick={() => handleacceptRequest(request, 'accepted')}>ACCEPT</Button>
                                            </td>
                                            <td className="text-end ps-0">
                                                <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold" onClick={() => handleacceptRequest(request, 'rejected')}>DECLINE</Button>
                                            </td>
                                        </tr>

                                    )) : <EmptyList name="Acceptance Request" />}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <RequestsDetails show={toggle} handleClose={() => setToggle(false)} data={selectedData} reqaccept='yes' />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        designerassignedrequests: state.requests.designerassignedrequests,
    };
};
export default connect(mapStateToProps)(DesignerRequest);
