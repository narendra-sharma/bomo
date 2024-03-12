import React, { useEffect } from "react";
import {
  get_all_draft_requests,
  get_edit_request_data,
} from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import ColorCode from "../Common/ColorCode";
import CustomPagination from "../Common/CustomPagination";
import { useNavigate } from "react-router-dom";

const AllDrafts = ({ user, drafts, total, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    get_all_draft_requests(dispatch, user?.token, 1, 10, search);
  }, [user?.token, search]);

  const handleEdit = (request) => {
    dispatch(get_edit_request_data(request));
    navigate("/new-request");
  };

  return (
    <div class="accordion-item mb-5">
      <h3 class="accordion-header mb-4" id="panelsStayOpen-headingFour">
        <h3 className="fw-bold mb-0 counter-circle d-flex align-items-center gap-2">
          <span className="rounded-circle bg-white mr-2">{total}</span>
        </h3>
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseFour"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseTwo"
        >
          <span className="d-inline-block position-relative">
            Draft Requests
          </span>
        </button>
      </h3>
      <div
        id="panelsStayOpen-collapseFour"
        class="accordion-collapse collapse"
        aria-labelledby="panelsStayOpen-headingFour"
      >
        <div class="accordion-body p-0">
          <div className="row g-0 pt-3 bg-white">
            {drafts?.map((request) => (
              <div className="col-md-6 " onClick={() => handleEdit(request)}>
                <div className="review-content px-3  mb-3">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr className="cursor-pointer">
                          <td className="text-center">
                            <p className="">edit</p>{" "}
                          </td>
                          <td style={{width:'130px'}} className="text-center">
                            <ColorCode request={request} />
                          </td>
                          <td className="text-center" style={{width:'110px'}}> 
                            <p>
                              {request?.brand_profile?.brandname
                                ? request?.brand_profile?.brandname
                                : "-"}
                            </p>
                          </td>
                          <td style={{width:'65px'}}>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block">{request?.status}</span>
                            </p>
                          </td>
                          <td style={{width:'67px'}}>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">-</span>
                            </p>
                          </td>
                          <td  style={{width:'112px'}}>
                            <p>
                              <span className="fw-bold">Request by</span>{" "}
                              <span className="d-block">
                                {request?.isEditedByAdmin === true
                                  ? "BOMO team"
                                  : request?.user_id?.name}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {total > 0 && (
            <CustomPagination
              total={total}
              onPageChange={(newPage, newLimit) => {
                get_all_draft_requests(
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
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    drafts: state.requests.alldrafts,
    total: state.requests.totalalldraft,
  };
};

export default connect(mapStateToProps)(AllDrafts);
