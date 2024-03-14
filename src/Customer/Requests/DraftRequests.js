import React, { useEffect, useState } from "react";
import CustomPagination from "../../Common/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  get_draft_requestlist,
  get_edit_request_data,
} from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";
import EmptyList from "../../Common/EmptyList";
import { format } from "date-fns";
const DraftRequests = ({ draftrequests, user, total }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoverindex, setHoverindex] = useState(null);
  const handleEdit = (request) => {
    dispatch(get_edit_request_data(request));
    navigate("/new-request");
  };

  useEffect(() => {
    get_draft_requestlist(dispatch, user?.token, 1, 10);
  }, []);

  return (
    <>
      <div className="review-content bg-white px-4 px-md-5 py-5 rounded">
        {total > 0 ? (
          <div className="bg-gray-light draft-table table-responsive">
            <table className="table mb-0">
              <tbody>
                {draftrequests.map((request, index) => (
                  <tr
                    key={index}
                    className={`${
                      hoverindex === index ? "hovered" : ""
                    } cursor-pointer`}
                    onClick={() => handleEdit(request)}
                    onMouseEnter={() => {
                      setHoverindex(index);
                    }}
                    onMouseLeave={() => setHoverindex(null)}
                  >
                    <td className="text-center">
                      <ColorCode request={request} />
                    </td>
                    <td>
                      <p>
                        <span className="fw-bold">Status</span>{" "}
                        <span className="d-block">
                          {request?.brief_rejected_at ? <span className="d-block">Need Update</span> : request?.status === "draft" ? "Draft" : "--"}
                        </span>
                      </p>
                    </td>
                    <td>
                      <p>
                        <span className="fw-bold">Delivery</span>{" "}
                        <span className="d-block">-</span>
                      </p>
                    </td>
                    <td>
                      <p>
                        <span className="fw-bold">Request by</span>{" "}
                        <span className="d-block">
                          {request?.isEditedByAdmin == true
                            ? "BOMO team"
                            : request?.user_id?.name}
                        </span>
                      </p>
                    </td>
                    <td className="text-center">
                      <p>
                        {request?.brand_profile?.brandname
                          ? request?.brand_profile?.brandname
                          : "-"}
                      </p>
                    </td>
                    <td className="text-center col-md-3">
                      <p>
                        <Link
                          to="/new-request"
                          className="text-decoration-none"
                          onClick={() =>
                            dispatch(get_edit_request_data(request))
                          }
                        >
                          {hoverindex === index
                            ? "continue editing, you got this"
                            : "continue editing"}
                        </Link>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyList name="Draft Request" />
        )}
        {total > 0 && (
          <CustomPagination
            total={total}
            onPageChange={(newPage, newLimit) => {
              get_draft_requestlist(dispatch, user?.token, newPage, newLimit);
            }}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    draftrequests: state.requests.draftrequests,
    total: state.requests.totaldrafts,
  };
};
export default connect(mapStateToProps)(DraftRequests);
