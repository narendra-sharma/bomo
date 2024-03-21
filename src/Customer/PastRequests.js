import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import NewRequestShared from "./Sahred/NewRequestShared";
import { get_past_requests_for_customer_admin, get_review_request_data } from "../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import ColorCode from '../Common/ColorCode';
import { format } from "date-fns";
import CustomPagination from "../Common/CustomPagination";
import EmptyList from "../Common/EmptyList";
import SharedRequest from "../Common/SharedRequest";

const PastRequest = ({ user, pastrequests, totalpastrequest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    get_past_requests_for_customer_admin(dispatch, user?.token);
  }, [user?.token, dispatch]);

  const groupedRequests = pastrequests?.reduce((acc, item) => {
    const acceptedDate = new Date(item?.updatedAt);
    const month = acceptedDate.toLocaleString('default', { month: 'long' });
    const year = acceptedDate.getUTCFullYear();
    const key = `${month} ${year}`;
    acc[key] = acc[key] || [];
    acc[key].push(item);

    return acc;
  }, {});

  const handleView = (request) => {
    localStorage.setItem('requestData', JSON.stringify(request));
    navigate('/completed-request');
  };

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          {((user?.role === 'customer_admin' || 'customer')) && <SharedRequest />}
          <div className="review-main-content past-request-section mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4"><h3 >Past Requests</h3></div>
            <div className="review-content bg-white px-2 px-md-3 py-5 rounded">

              {totalpastrequest > 0 ? Object.entries(groupedRequests).map(([monthYear, requests]) => (
                <div className="row  g-0 mb-4" key={monthYear}>
                  <div className="col-md-12">
                    <h5 className="mx-md-4 mx-sm-0 fw-bold">{monthYear}</h5>
                  </div>
                  {requests?.map((request) => (
                    <div className="col-md-4" onClick={() => handleView(request)}>
                      <Link className="text-decoration-none">
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-center"><ColorCode request={request} /></td>
                                <td><p>{request?.brand_profile?.brandname ? request?.brand_profile?.brandname : '-'}</p></td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">
                                  {!request?.delivery_date ? 'No Date' : format(new Date(request?.design_approved_at_by_customer), 'dd/MM/yyyy')}
                                </span></p></td>
                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p>
                                    <div>
                                    <img src={dropdownImage} alt="imgone" />
                                    </div>
                                  </div>
                                </td>
                                {/* <td>
                                  <select type='select' defaultValue='' onClick={() => handleView(request)}>
                                    <option value='' disabled></option>
                                    <option value='view'>View</option>
                                  </select>
                                </td> */}
                              </tr>

                            </tbody>
                          </table>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )) :
                (<EmptyList name="Past Request" heading="List" />)}

            </div>
            {(totalpastrequest > 0) && <CustomPagination total={totalpastrequest} onPageChange={(newPage, newLimit) => {
              get_past_requests_for_customer_admin(dispatch, user?.token, newPage, newLimit);
            }} />}
          </div>
        </div>

      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pastrequests: state.requests.pastrequests,
    totalpastrequest: state.requests.totalpastrequest
  };
};
export default connect(mapStateToProps)(PastRequest);
