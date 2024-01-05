import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../../images/user-img.png";
import MemberForm from "./MemberForm";
import DeleteBrand from "../../Modals/Delete";
import CustomPagination from "../../Common/CustomPagination";
import {
  delete_existing_user,
  get_all_members,
  add_new_member,
} from "../../reduxdata/members/memberAction";
import { useDispatch, connect } from "react-redux";

const roles = [
  { id: 1, label: "Admin" },
  { id: 2, label: "Team Member" },
];

const Members = ({ user, member, total }) => {
  // show hide create members
  const [showAddComp, setShowAddComp] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [updateRolepopUps, setUpdateRolepopUps] = useState(
    Array(member.length).fill(false)
  );

  const [showDeleteModals, setShowDeleteModals] = useState(
    Array(member.length).fill(false)
  );

  const [deletedFlag, setdeletedFlag] = useState(false);

  const dispatch = useDispatch();

  // getting list of the user
  useEffect(() => {
    get_all_members(dispatch, user?.token);
  }, [deletedFlag]);

  // deleting a user
  const handleDeleteConfirm = (id) => {
    delete_existing_user(id, dispatch, user?.token);
    setShowDeleteModals([]);
    setdeletedFlag((prev) => !prev);
  };

  // updating a user
  const updateUserRole = (id = "6596a9aacde9f223fdb74337") => {
    const updatedMember = member?.find((item) => item?._id == id);
    console.log("Member to update", updatedMember?.role);
    add_new_member(
      dispatch,
      updatedMember,
      user?.token,
      id,
      updatedMember?.role
    );

    setUpdateRolepopUps([]);
  };
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          <div className="mx-md-3 mx-lg-5 mb-4">
            <div className="d-flex justify-content-md-end">
              <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                <Link
                  to="/new-request"
                  className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark"
                >
                  New Request
                </Link>
                <div className="request-date ms-2">
                  <p className="mb-0">
                    <span>21:43</span>
                    <span className="d-block">Wed 01 Nov, 2023 </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="review-main-content mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4">
              <h3>Members</h3>
            </div>
            <div className="review-content bg-white px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                {member &&
                  member.map((item, index) => (
                    <table
                      className="table table-borderless member-table mb-0"
                      key={index}
                    >
                      <tr>
                        <td>
                          <div className="d-flex  align-items-center">
                            <div
                              style={{
                                backgroundColor: item?.colour,
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                              }}
                            ></div>
                            <p className="mb-0 user-email  ms-1 ms-lg-2">
                              <b>Name</b>
                              <span
                                className="d-block"
                                style={{ maxWidth: "20px" }}
                              >
                                {item?.name}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Role</b>
                            {updateRolepopUps[index] ? (
                              <select className="d-block">
                                {roles.map((item) => (
                                  <option>{item.label}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="d-block">{item?.role}</span>
                            )}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Date added</b>
                            <span className="d-block">
                              {item?.updatedAt?.trim(0, 6)}
                            </span>
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Email</b>
                            <span className="d-block">{item?.email}</span>
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Password</b>
                            <span className="d-block">*******</span>
                          </p>
                        </td>

                        <td className="text-end">
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            {!updateRolepopUps[index] ? (
                              <button
                                className=" text-decoration-none text-dark cursor-pointer"
                                onClick={() => {
                                  const updatedPopUps = [...updateRolepopUps];
                                  updatedPopUps[index] = !updatedPopUps[index];
                                  setUpdateRolepopUps(updatedPopUps);
                                }}
                                style={{
                                  border: "none",
                                  backgroundColor: "#fff",
                                }}
                              >
                                edit
                              </button>
                            ) : (
                              <button onClick={() => updateUserRole(item?._id)}>
                                update
                              </button>
                            )}
                          </p>
                        </td>

                        <td className="text-end">
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <button
                              className=" text-decoration-none text-dark"
                              onClick={() => {
                                const updatedModals = [...showDeleteModals];
                                updatedModals[index] = true;
                                setShowDeleteModals(updatedModals);
                              }}
                              style={{
                                border: "none",
                                backgroundColor: "#fff",
                              }}
                            >
                              delete
                            </button>
                          </p>
                        </td>
                        {showDeleteModals[index] && (
                          <DeleteBrand
                            heading="Member"
                            name={item?.name}
                            show={showDeleteModals[index]}
                            handleClose={() => {
                              const updatedModals = [...showDeleteModals];
                              updatedModals[index] = false;
                              setShowDeleteModals(updatedModals);
                            }}
                            DeleteBrand={() => handleDeleteConfirm(item?._id)}
                          />
                        )}
                      </tr>
                    </table>
                  ))}
              </div>
            </div>
            {!showAddComp ? (
              <tbody>
                <tr>
                  <td>
                    <Link className="text-decoration-none text-dark">
                      <div className="d-flex  align-items-center">
                        <span
                          className="plus"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowAddComp((prev) => !prev)}
                        >
                          +
                        </span>
                        <span>
                          <span className="fw-bold ms-3">Add</span> New Memeber
                        </span>
                      </div>
                    </Link>
                  </td>
                </tr>
              </tbody>
            ) : (
              <MemberForm setShowAddComp={setShowAddComp} />
            )}
            <div className="review-content add-member px-4 py-2 rounded mb-3">
              {total > 0 && (
                <CustomPagination
                  total={total}
                  onPageChange={(newPage, newLimit) => {
                    setPage(newPage);
                    setLimit(newLimit + 1);
                  }}
                />
              )}
              <div className="table-responsive"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    member: state.member.members,
    total: state.member.total,
  };
};
export default connect(mapStateToProps)(Members);
