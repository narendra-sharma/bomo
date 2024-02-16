import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import NewRequestShared from "./Sahred/NewRequestShared";
import { get_past_requests_for_customer_admin } from "../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";
import ColorCode from '../Common/ColorCode';
import { format } from "date-fns";
import CustomPagination from "../Common/CustomPagination";
import EmptyList from "../Common/EmptyList";
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
    const data = {
      _id: request?._id,
      request_name: request?.request_name,
      request_type: request?.request_type, 
      delivery_date: request?.delivery_date,
      description: request?.description,
      size: request?.size,
      file_type: request?.file_type,
      transparency: request?.transparency,
      references: request?.references,
      brandname: request?.brand_profile?.brandname,
      status: 'completed'
    };
    navigate('/request-expand', { state: data});
  };

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          <div className="mx-md-3 mx-lg-5 mb-4">
            <NewRequestShared />
          </div>
          <div className="review-main-content past-request-section mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4"><h3 >Past Requests</h3></div>
            <div className="review-content bg-white px-2 px-md-3 py-5 rounded">

              {totalpastrequest > 0 ? Object.entries(groupedRequests).map(([monthYear, requests]) => (
                <div className="row mb-4" key={monthYear}>
                  <div className="col-md-12">
                    <h5 className="mx-md-4 mx-sm-0 fw-bold">{monthYear}</h5>
                  </div>
                  {requests?.map((request) => (
                    <div className="col-md-4">
                      <Link className="text-decoration-none">
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-center"><ColorCode request={request} /></td>
                                <td><p>{request?.brand_profile?.brandname}</p></td>
                                <td><p><span className="fw-bold">Status</span><span className="d-block">{request?.status}</span></p></td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">
                                  {!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}
                                </span></p></td>
                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p></td>
                                <td>
                                  <select type='select' defaultValue='' onChange={() => handleView(request)}>
                                    <option value='' disabled></option>
                                    <option value='view'>View</option>
                                  </select>
                                </td>
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
