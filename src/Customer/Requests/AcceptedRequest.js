import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import EmptyList from "../../Common/EmptyList";
import CustomPagination from "../../Common/CustomPagination";
import { format } from "date-fns";
import ColorCode from "../../Common/ColorCode";
import { get_accepted_request } from "../../reduxdata/Requests/requestActions";
import { useNavigate } from "react-router-dom";
const AcceptedRequest = ({
  user,
  acceptedRequests,
  total,
  search,
  acceptedTotal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    get_accepted_request(dispatch, user?.token, 1, 10, search);
  }, [dispatch, search]);

  const handleView = (request) => {
    localStorage.setItem('requestData', JSON.stringify(request));
    navigate('/details');
  };

  return (
    <div className="row mb-4">
      <div className="d-flex align-items-center gap-3">
        <div>
            <h3 className="fw-bold mb-0 counter-circle d-flex align-items-center gap-2">
            <span className="rounded-circle bg-white mr-2">{acceptedRequests?.length}</span>
          </h3>
        </div>
        <div>  <h3 className="mb-0">Accepted Request</h3></div>
      </div>
    
      <div className="col-md-12">
        <div className="bg-white rounded mt-4 p-4">
          <div className="review-content">
            {acceptedRequests.length > 0 ? (
              acceptedRequests.map((item, index) => {
                return (
                  <div className="table-responsive" key={index}>
                    <table className="table table-borderless mb-0">
                      <tbody onClick={() => handleView(item)}>
                        <tr>
                          <td  style={{ width: "130px" }} className="text-center">
                            <ColorCode request={item} />
                          </td>
                          <td style={{ width: "170px", paddingLeft: "30px" }}>
                            <p>
                              <span className="fw-bold">
                                {item?.user_id?.company}
                              </span>{" "}
                              <span className="d-block">
                                {item?.brand_profile?.brandname}
                              </span>{" "}
                            </p>
                          </td>
                          <td style={{ width: "140px" }}>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block text-capitalize">
                                {item?.status}
                              </span>
                            </p>
                          </td>

                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">
                                {!item?.delivery_date
                                  ? "No Date"
                                  : format(
                                      new Date(item?.delivery_date),
                                      "dd/MM/yyyy"
                                    )}
                              </span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Request by</span>{" "}
                              <span className="d-block">
                                {item?.user_id?.name}
                              </span>
                            </p>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <EmptyList name="Accepted Request" />
            )}
            {total > 0 && (
              <CustomPagination
                total={acceptedTotal}
                onPageChange={(newPage, newLimit) => {
                  get_accepted_request(
                    dispatch,
                    user?.token,
                    newPage,
                    newLimit
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    acceptedRequests: state.requests.acceptedRequests,
    total: state.requests.pendingTotal,
    acceptedTotal: state.requests.acceptedTotal,
  };
};
export default connect(mapStateToProps)(AcceptedRequest);
