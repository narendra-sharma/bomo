import React, { useEffect, useState } from "react";
import SearchInput from "../Common/SearchInput";
import userImage from "../images/user-img.png";
import { connect, useDispatch } from "react-redux";
import { get_all_users, switch_to_designer } from "../reduxdata/rootAction";
import CustomPagination from "../Common/CustomPagination";
import { format } from "date-fns";
import ViewAsCustomer from "../Modals/ViewAsCustomer";
import EmptyList from "../Common/EmptyList";

const AllCustomers = ({ user, users, total }) => {
  const dispatch = useDispatch();
  const role = "customer_admin";
  const [search, setSearch] = useState(null);
  const [view, setView] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    get_all_users(dispatch, user?.token, role, 1, 10, search);
  }, [search]);

  const handleswitchto_designer = async (userId) => {
    await switch_to_designer(dispatch,userId,user?.token);
  };

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper admin-payments customer-all px-60 py-md-2 py-lg-3">
          <h3 className="fw-bold mb-3">{total > 0 && <span className="bg-white rounded-circle  mr-2">{total}</span>} Customers</h3>
          <SearchInput
            placeholder="Browse Customers..."
            handleSearch={(val) => setSearch(val)}
          />
          <div className="mt-5 review-main-content">
            <div className="review-content mb-4">
            <div className="table-responsive" >
              <table className="table table-borderless mb-0">
                  <tbody>
                    {users?.length > 0 ? (
                      users.map((item) => (
                      
                              <tr key={item?._id}>
                                <td>
                                  <p>
                                    <button
                                      className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark"
                                      onClick={() => handleswitchto_designer(item?._id)}
                                    >
                                      View as customer
                                    </button>
                                  </p>
                                </td>
                                <td>
                                  <p className="fw-bold">{item?.company}</p>
                                </td>
                                <td>
                                  <p className="fw-bold color-light-blue">
                                    {item?.active_requests} ACTIVE Requests
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="fw-bold">Date added</span>{" "}
                                    <span className="d-block">
                                      {item?.createdAt &&
                                        format(
                                          new Date(item?.createdAt),
                                          "dd/MM/yyyy"
                                        )}
                                    </span>
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="fw-bold">Contact </span>{" "}
                                    <span className="d-block">{item?.email}</span>
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="fw-bold">Monthly Requests</span>{" "}
                                    <span className="d-block">{item?.monthly_request ? item?.monthly_request : '0'}</span>
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="fw-bold">Total Admins</span>{" "}
                                    <span className="d-block">{item?.no_of_admin}</span>
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="fw-bold">Members</span>{" "}
                                    <span className="d-block">{item?.no_of_cust}</span>
                                  </p>
                                </td>
                                <td>
                                  <p>
                                    <span className="cursor-pointer" onClick={() => { setView(item); setShow(true); }}>expand</span>
                                  </p>
                                </td>
                              </tr>      
                      ))
                    ) : (
                      <EmptyList name="Customers" />
                    )}
                  </tbody>
                </table>
              </div>

              <div className="review-content add-member px-4 py-2 rounded mb-3">
                {total > 0 && (
                  <CustomPagination
                    total={total}
                    onPageChange={(newPage, newLimit) => {
                      get_all_users(
                        dispatch,
                        user?.token,
                        role,
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
      </div>

      <ViewAsCustomer
        view={view}
        token={user?.token}
        show={show}
        handleClose={() => {
          setView(null);
          setShow(false);
        }}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.member.users,
    total: state.member.total,
  };
};
export default connect(mapStateToProps)(AllCustomers);
