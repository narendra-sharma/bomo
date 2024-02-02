import React from 'react';
import { Button } from 'react-bootstrap';
import EmptyList from '../../Common/EmptyList';
import ColorCode from '../../Common/ColorCode';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { desginer_accept_assignrequest, get_designer_assigned_requestlist } from '../../reduxdata/rootAction';
import { connect } from 'react-redux';
import { format } from 'date-fns';

const DesignerRequest = ({designerassignedrequests, user}) => {
    const dispatch = useDispatch();
    const [assignedRequest, setAssignedRequest] = useState([]);

    useEffect(() => {
      if(user?.token){
        get_designer_assigned_requestlist(dispatch, user?.token);
      };
    }, [dispatch,user?.token]);

    useEffect(() => {
        setAssignedRequest(designerassignedrequests);
    }, [designerassignedrequests]);

    const handleacceptRequest = (requestdetail) => {
      const request_id = requestdetail._id;
      
      desginer_accept_assignrequest(dispatch,user?.token,request_id,user?.email,user?._id);
    };
    return (
        <div className="col-12 mt-6">
                    <div className="designer-active-request bg-white px-5 px-md-4 py-5 rounded">
                        <div className="mb-4">
                            <div className="ms-4 mb-3">
                                <h5>Requests For Acceptance</h5>
                            </div>
                            {assignedRequest?.length ? assignedRequest?.map((request, index) => (
                                <div className="table-responsive rounded mt-4">
                                    <table className="table table-borderless mb-0" key={index}>
                                        <tbody>
                                            <tr>
                                                <td><p>{request?.request_name}</p></td>
                                                <td className="text-center"><ColorCode request={request} /></td>
                                                <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status === 'design_assigned_pending' ? 'pending' : ''}</span></p></td>
                                                <td><p><span className="fw-bold">Expected Delivery Time</span> <span className="d-block">{request?.delivery_date ? format(new Date(request?.delivery_date), 'dd/MM/yyyy') : 'No Date'}</span></p></td>
                                                <td><p><span className="fw-bold">Size</span> <span className="d-block">{request?.size}</span></p></td>
                                                <td className="text-end ps-0">
                                                    <Button variant="unset" className="rounded-pill deliver-now-btn fw-bold" onClick={() => handleacceptRequest(request)}>Accept</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )) : <EmptyList name="Acceptance Request" />}
                        </div>
                    </div>
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
