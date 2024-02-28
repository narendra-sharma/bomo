import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DraftRequests from "../Customer/Requests/DraftRequests";
import NewRequestShared from "../Customer/Sahred/NewRequestShared";
import { connect, useDispatch } from "react-redux";
import { get_customeradmin_active_requestslist } from "../reduxdata/rootAction";
import ColorCode from "../Common/ColorCode";
import { format } from 'date-fns';
import FeedBackRequest from "../Customer/Requests/FeedBackRequest";
import ReviewRequest from "../Customer/Requests/ReviewRequest";
import EmptyList from "../Common/EmptyList";

const CustomerHome = ({ activerequest, user }) => {
  const dispatch = useDispatch();
  const [activerequests, setActiverequests] = useState([]);
  useEffect(() => {
    get_customeradmin_active_requestslist(dispatch, user?.token);
  }, []);

  useEffect(() => {
    setActiverequests(activerequest);
  }, [activerequest]);

  return (
    <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
      <div className="main-content-wraaper px-60 cutomer-home-page py-md-2 py-lg-5">
        <div className="mx-md-3 mx-lg-5 mb-4">
          <NewRequestShared />
        </div>
        <div className="review-main-content mb-5">
          <div className="mx-md-5 mx-sm-0 mb-4"><h3>Ready to Review</h3></div>
            <ReviewRequest />
        </div>

        <div className="review-main-content mb-5">
          <div className="row">
            <div className="col-lg-6 col-md-12  mb-lg-0">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3 >Active Requests</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 ">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3 >Feedback Queue</h3>
              </div>
            </div>
            </div>
            <div className="row designer-active-request-section">
            <div className="col-lg-6 col-md-12 bg-white rounded mb-5">
              <div className="review-content bg-white px-3 py-5 rounded">
                <div className="table-responsive">
                  {activerequests.length>0 ? activerequests?.map((request) => (
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-center" style={{width:"119px"}}><ColorCode request={request} /></td>
                          <td>
                            <p>{request?.brand_profile?.brandname}</p>
                          </td>
                          <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                          <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span></p></td>
                          <td><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p></td>
                        </tr>
                      </tbody>
                    </table>
                  )): (<EmptyList name="Active Request" heading="list" />)}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-5 bg-white rounded">
              <FeedBackRequest/>
            </div>
          </div>

        </div>
        <div className="review-main-content mb-5">
          <div className="mx-md-5 mx-sm-0 mb-4">
            <h3>Drafts</h3>
          </div>
          <DraftRequests />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    activerequest: state.requests.customerActiverequests,
  };
};

export default connect(mapStateToProps)(CustomerHome);