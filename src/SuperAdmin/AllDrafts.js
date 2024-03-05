import React, { useEffect, useState } from "react";
import { get_all_draft_requests } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
import CustomPagination from "../Common/CustomPagination";

const AllDrafts = ({ user, drafts, total, search }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    get_all_draft_requests(dispatch, user?.token, 1, 10, search);
  }, [user?.token, search]);
  return (
    <div class="accordion-item mb-5">
      <h3 class="accordion-header" id="panelsStayOpen-headingFour">
        <h3 className="fw-bold mb-3 counter-circle d-flex align-items-center gap-2">
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
          <span className="mb-4 d-inline-block position-relative">
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
          <div className="row g-0 bg-white">
            {drafts?.map((request) => (
              <div className="col-md-6">
                <div className="review-content px-4  mb-3">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <p className="">edit</p>{" "}
                          </td>
                          <td className="text-center">
                            <ColorCode request={request} />
                          </td>
                          <td>
                            <p>
                              <span className="d-block">
                                {request?.brand_profile
                                  ? request?.brand_profile?.brandname
                                  : "-"}
                              </span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block">{request?.status}</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">
                                {/* {request?.delivery_date
                                  ? format(
                                      new Date(request?.delivery_date),
                                      "dd/MM/yyyyy"
                                    )
                                  : "No Date"} */}
                                -
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
