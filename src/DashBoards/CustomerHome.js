import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import DraftRequests from "../Customer/Requests/DraftRequests";
import NewRequestShared from "../Customer/Sahred/NewRequestShared";
import { connect, useDispatch } from "react-redux";
import { get_customeradmin_active_requestslist } from "../reduxdata/rootAction";
import ColorCode from "../Common/ColorCode";
import { format } from 'date-fns';

const CustomerHome = ({ activerequest, user }) => {
  const dispatch = useDispatch();
  const [activerequests, setActiverequests] = useState([]);
  useEffect(() => {
    get_customeradmin_active_requestslist(dispatch, user?.token);
  }, [dispatch]);

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
          <div className="review-content bg-white px-3 px-md-5 py-5 rounded">
            <div className="table-responsive">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="text-center"><p className="short0ad">short ad</p> </td>
                    <td><p>DIOR</p></td>
                    <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                    <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                    <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                    <td className="pull-right"> <div className="review-delivery"><Link className="rounded-pill text-decoration-none">Review Delivery</Link></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="review-main-content mb-5">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3 >Active Requests</h3>
              </div>

              <div className="review-content bg-white px-3 py-5 rounded">
                <div className="table-responsive">
                  {activerequests?.map((request) => (
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-center"><ColorCode request={request} /></td>
                          <td>
                            <p>{request?.brand_profile?.brandname}</p>
                          </td>
                          <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                          <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date, 'dd/MM/yyyy'))}</span></p></td>
                          <td><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.designer_id?.name}</span></p></td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3 >Feedback Queue</h3>
              </div>

              <div className="review-content bg-white px-3 py-5 rounded">
                <div className="table-responsive">
                  <table className="table table-borderless feedback-queue">
                    <tbody>
                      <tr>
                        <td><p className="serial-number">1</p></td>
                        <td className="text-center"><p className="short0ad transition">transition</p></td>
                        <td>
                          <p>DIOR</p>
                        </td>
                        <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                        <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                        <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                        <td><img src={dropdownImage} alt="" /></td>
                      </tr>
                      <tr>
                        <td><p className="serial-number">2</p></td>
                        <td className="text-center"><p className="short0ad brand-element">brand element</p></td>
                        <td><p>DIOR</p></td>
                        <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                        <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                        <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                        <td><img src={dropdownImage} alt="" /></td>
                      </tr>
                      <tr>
                        <td><p className="serial-number">3</p></td>
                        <td className="text-center"><p className="short0ad typography">typography</p></td>
                        <td><p>DIOR</p></td>
                        <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                        <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                        <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                        <td><img src={dropdownImage} alt="" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="review-main-content mb-5">
          <div className="mx-md-5 mx-sm-0 mb-4">
            <h3>Draft</h3>
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