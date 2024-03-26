import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { get_admin_pending_requestlist } from "../../reduxdata/rootAction";
import ExpandRequest from "../../Modals/ExpandRequest";
import RejectRequest from "../../Modals/RejectRequest";
import ColorCode from "../../Common/ColorCode";
import EmptyList from "../../Common/EmptyList";
import CustomPagination from "../../Common/CustomPagination";
import { change_request_status, deliever_request_details } from "../../reduxdata/Requests/requestActions";

const ApproveRequest = ({ user, allRequest, total, requestapproved }) => {
  const [show, setShow] = useState(false);
  const [isreject, setIsreject] = useState(false);
  const [reqdata, setReqdata] = useState({});
  const [isapprove, setIsapprove] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    get_admin_pending_requestlist(dispatch, user?.token, 1, 10);
  }, [dispatch, user?.token]);

  const handleAccept = (id) => {
    setIsapprove((prev) => ({ ...prev, [id]: "accepted" }));
    change_request_status(dispatch, user?.token, id, "active");
  };

  const handleReject = (e, data, status) => {
    e.preventDefault();
    if (status === "rejected" && data) {
      setIsreject(true);
      setReqdata(data);
    }
  };

  return (
    <div className="row g-0">
      <div className="col-lg-12">
        <small className="text-muted fw-bold">{total} requests left </small>
      </div>
      {total > 0 ? (
        allRequest?.map((request) => (
          <div className="col-lg-6">
            <div className="table-responsive mt-2">
              <table
                className={
                  requestapproved?._id===request?._id ? 
                  "table table-borderless bg-gray rounded" :
                  isapprove[request?._id] === "accepted"
                    ? "table table-borderless table-green rounded"
                    : "table table-borderless"
                }
              >
                <tbody>
                  <tr>
                    <td style={{ width: "37px" }}>
                      <p>12h</p>
                    </td>
                    <td className="text-center" style={{ width: "125px" }}>
                      <ColorCode request={request} />
                    </td>
                    <td style={{ width: "110px" }}>
                      <p>
                        <span className="fw-bold">
                          {request?.user_id?.company}
                        </span>{" "}
                        <span className="d-block">
                          {request?.brand_profile?.brandname
                            ? request?.brand_profile?.brandname
                            : "-"}
                        </span>
                      </p>
                    </td>
                    <td style={{ width: "78px" }}>
                      <p>{request?.request_name}</p>
                    </td>
                    <td style={{ width: "125px" }}>
                      <p>
                        <span
                          className="fw-bold cursor-pointer"
                          onClick={() => {
                            setShow(true);
                            setReqdata(request);
                            dispatch(deliever_request_details(request));
                          }}
                        >
                          Expand Request
                        </span>{" "}
                      </p>
                    </td>
                    <td style={{ width: "70px" }}>
                      <div className="d-flex gap-1 approverequest-btn">
                       {requestapproved?._id !==request?._id && <div>
                          {isapprove[request?._id] === "accepted" ? (
                            <button className="w-100 rounded-pill fw-bold">
                              Approved
                            </button>
                          ) : (
                            <i
                              className="fa-solid fa-check-circle active-request-status cursor-pointer"
                              onClick={() => handleAccept(request?._id)}
                            ></i>
                          )}
                        </div>}
                        {isapprove[request?._id] !== "accepted" && <div>
                          {requestapproved?._id===request?._id ? (
                            <button className="w-100 rounded-pill fw-bold request-rejected">
                              Rejected
                            </button>
                          ) : (
                            <i
                              className="fa-solid fa-circle-xmark cancel cursor-pointer pr-0"
                              onClick={(e) =>
                                handleReject(e, request, "rejected")
                              }
                            ></i>
                          )}
                        </div>}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <EmptyList name="Approve Request" />
      )}
      {total > 0 && (
        <CustomPagination
          total={total}
          onPageChange={(newPage, newLimit) => {
            get_admin_pending_requestlist(
              dispatch,
              user?.token,
              newPage,
              newLimit
            );
          }}
        />
      )}
      <ExpandRequest
        show={show}
        handleClose={() => {setShow(false);  dispatch(deliever_request_details(null));}}
        requestdata={reqdata}
        reqtype='approve'
      />
      <RejectRequest
        show={isreject}
        handleClose={() => setIsreject(false)}
        detail={reqdata}
        reqstatus="draft"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    approvelist: state.requests.superadminapprovelist,
    allRequest: state.requests.pendingRequests,
    total: state.requests.pendingTotal,
    requestapproved: state.requests.editrequestData,
  };
};
export default connect(mapStateToProps)(ApproveRequest);
