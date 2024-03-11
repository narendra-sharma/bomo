import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DraftRequests from "../Customer/Requests/DraftRequests";
import NewRequestShared from "../Customer/Sahred/NewRequestShared";
import { connect, useDispatch } from "react-redux";
import { get_customeradmin_active_requestslist } from "../reduxdata/rootAction";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
import FeedBackRequest from "../Customer/Requests/FeedBackRequest";
import ReviewRequest from "../Customer/Requests/ReviewRequest";
import EmptyList from "../Common/EmptyList";
import SharedRequest from "../Common/SharedRequest";
import CustomPagination from "../Common/CustomPagination";

const CustomerHome = ({ activerequest, user, activeTotal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activerequests, setActiverequests] = useState([]);
  useEffect(() => {
    get_customeradmin_active_requestslist(dispatch, user?.token);
  }, []);

  useEffect(() => {
    setActiverequests(activerequest);
  }, [activerequest]);

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
      status: "production",
    };
    localStorage.setItem("requestData", JSON.stringify(data));
    navigate("/request-expand");
  };

  return (
    <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
      <div className="main-content-wraaper px-60 cutomer-home-page py-md-2 py-lg-5">
        <div className="">
          {(user?.role === "customer_admin" || user?.role === "customer") && (
            <SharedRequest />
          )}
        </div>
        <div className="review-main-content mb-5">
          <div className="mx-md-5 mx-sm-0 mb-4">
            <h3>Ready to Review</h3>
          </div>
          <ReviewRequest />
        </div>

        <div className="review-main-content mb-5">
          <div className="row">
            <div className="col-lg-6 col-md-12  mb-lg-0">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>Active Requests</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 ">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>Feedback Queue</h3>
              </div>
            </div>
          </div>
          <div className="row designer-active-request-section">
            <div className="col-lg-6 col-md-12 bg-white rounded mb-5">
              <div className="review-content bg-white px-1 py-5 rounded">
                <div className="table-responsive">
                 
                      <table className="table table-borderless">
                        <tbody>
                        {activerequests?.length > 0 ? (
                          activerequests?.map((request) => (
                          <tr className="cursor-pointer" onClick={() => handleView(request)}>
                            <td className="text-center" style={{width:'135px'}}>
                              <ColorCode request={request} />
                            </td>
                            <td className="text-center" style={{paddingRight:'15px' , paddingLeft:'15px'}} >
                              <p>
                                {request?.brand_profile?.brandname
                                  ? request?.brand_profile?.brandname
                                  : "-"}
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Status</span>{" "}
                                <span className="d-block">
                                  {request?.status}
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Delivery</span>{" "}
                                <span className="d-block">
                                  {!request?.delivery_date
                                    ? "No Date"
                                    : format(
                                        new Date(request?.delivery_date),
                                        "dd/MM/yyyy"
                                      )}
                                </span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Request by</span>{" "}
                                <span className="d-block">
                                  {request?.user_id?.name}
                                </span>
                              </p>
                            </td>
                          </tr>
                           ))
                           ) : (
                             <EmptyList name="Active Request" heading="list" />
                           )}
                        </tbody>
                      </table>
                   
                </div>
              </div>
              <CustomPagination
                onPageChange={(page, perpage) => {
                  get_customeradmin_active_requestslist(
                    dispatch,
                    user?.token,
                    page,
                    perpage
                  );
                }}
                total={activeTotal}
              />
            </div>
            <div className="col-lg-6 col-md-12 mb-5 bg-white rounded">
              <FeedBackRequest />
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
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    activerequest: state.requests.customerActiverequests,
    activeTotal: state.requests.activeTotal,
  };
};

export default connect(mapStateToProps)(CustomerHome);
