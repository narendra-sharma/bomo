import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import EmptyList from "../../Common/EmptyList";
import AcceptRequest from "../../Modals/AcceptRequest";
import { get_admin_pending_requestlist } from "../../reduxdata/rootAction";
import CustomPagination from "../../Common/CustomPagination";
import { format } from "date-fns";
import ColorCode from "../../Common/ColorCode";
const PendingRequest = ({user, allRequest, total,search }) => {
  const [showAcceptModal, setshowAcceptModal] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    get_admin_pending_requestlist(dispatch, user?.token,1,10,search);
  }, [dispatch,search]);
  return (
    <div className="row mb-4">
      <h3 className="mb-3">Pending Requests</h3>
      <div className="col-md-12">
        <div className="col-md-12">
          <div className="review-content pending-request rounded mt-4">
            {(allRequest.length>0) ?
              allRequest.map((item, index) => {
                return (
                  <div className="table-responsive" key={index}>
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="text-center">
                           <ColorCode request={item} />
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">{item?.user_id?.company}</span>{" "}
                              <span className="d-block">
                                {item?.brand_profile?.brandname}
                              </span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block text-capitalize">{item?.status}</span>
                            </p>
                          </td>

                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">
                                {!item?.delivery_date
                                  ? "No Date"
                                  : format(new Date(item?.delivery_date), 'dd/MM/yyyy')}
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
                          <td>
                            <button
                              className="btn btn-outline-dark w-full h-25 rounded-pill"
                              onClick={() => setshowAcceptModal(item?._id)}
                            >
                              Accept Request
                            </button>
                            {showAcceptModal === item?._id && (
                              <AcceptRequest
                                heading={item?.request_name}
                                showAcceptModal={showAcceptModal}
                                setshowAcceptModal={setshowAcceptModal}
                                id={item?._id}
                                token={user?.token}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
              : <EmptyList name="Pending Request"/>}
              {total > 0 && (
                <CustomPagination
                  total={total}
                  onPageChange={(newPage, newLimit) => {
                    get_admin_pending_requestlist(dispatch, user?.token, newPage, newLimit, search);
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
    allRequest: state.requests.pendingRequests,
    total: state.requests.pendingTotal,
  };
};
export default connect(mapStateToProps)(PendingRequest);
