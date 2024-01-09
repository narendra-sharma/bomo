import React, { useState, useEffect } from "react";
import MemberForm from "./MemberForm";
import DeleteBrand from "../../Modals/Delete";
import CustomPagination from "../../Common/CustomPagination";
import {
  delete_existing_user,
  get_all_members,
  add_new_member,
} from "../../reduxdata/members/memberAction";
import { useDispatch, connect } from "react-redux";
import NewRequestShared from "../Sahred/NewRequestShared";
import { format } from 'date-fns';
const roles = [
  { id: 1, label: "Customer Admin", value: "customer_admin" },
  { id: 2, label: "Team Member",value: "team_member" },
];

const Members = ({ user, member, total, isAddEdit }) => {
  // show hide create members
  const [showAddComp, setShowAddComp] = useState(false);
  const [selectedRole, setselectedRole] = useState("");
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
  }, [deletedFlag, isAddEdit]);

  // deleting a user
  const handleDeleteConfirm = (id) => {
    delete_existing_user(id, dispatch, user?.token);
    setShowDeleteModals([]);
    setdeletedFlag((prev) => !prev);  
  };

  // handling change of a value
  const handleChange = (e) => {
    setselectedRole(e.target.value);
  };

  // updating a user
  const updateUserRole = (id) => {
    add_new_member(dispatch, null, user?.token, id, selectedRole);
    setUpdateRolepopUps([]);
  };
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          <div className="mx-md-3 mx-lg-5 mb-4">
            <NewRequestShared/>
          </div>
          <div className="review-main-content mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4">
              <h3>Members</h3>
            </div>
            {(member.length>0) && <div className="review-content bg-white px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                {member.map((item, index) => (
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
                              <p
                                className="d-block"
                                style={{ maxWidth: "60px" }}
                              >
                                {item?.name}
                              </p>
                            </p>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Role</b>
                            {updateRolepopUps[index] ? (
                              <select
                                className="d-block"
                                defaultValue={item?.role}
                                onChange={(e) => handleChange(e)}
                              >
                                {roles.map((roleItem) => (
                                  <option key={roleItem.id} value={roleItem.value}>
                                    {roleItem.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="d-block text-capitalize">{item?.role.replace('_',' ')}</span>
                            )}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 user-email  ms-1">
                            <b>Date added</b>
                            <p
                              className="d-block"
                              style={{
                                width: "90px",
                              }}
                            >
                              {format(new Date(item?.createdAt), 'MM/dd/yyyy')}
                            </p>
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
            </div>}
            <div className="review-content add-member px-4 py-2 rounded mb-3">
              {total > 0 && (
                <CustomPagination
                  total={total}
                  onPageChange={(newPage, newLimit) => {
                    get_all_members(dispatch, user?.token, newPage, newLimit);
                  }}
                />
              )}
            </div>
            {!showAddComp ? (
              <div className="add-new-brand" onClick={() => setShowAddComp((prev) => !prev)}><button className="add-btn">+</button> <span className="ms-4 ps-2"><span className="fw-bold">Add</span> New Memeber</span></div>
            ) : (
              <MemberForm roles={roles} setShowAddComp={setShowAddComp} />
            )}
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
    isAddEdit: state.brand.isAddEdit,
  };
};
export default connect(mapStateToProps)(Members);
