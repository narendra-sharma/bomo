import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../../images/user-img.png";
import MemberForm from "./MemberForm";
import DeleteBrand from "../../Modals/Delete";
import CustomPagination from "../../Common/CustomPagination";
import {
  deleteExistingUser,
  getAllMembersList,
  updateUser,
} from "../../reduxdata/members/memberAction";
import { useDispatch } from "react-redux";

const roles = [
  { id: 1, label: "Admin" },
  { id: 2, label: "Team Member" },
];

const Members = () => {
  // show hide create members
  const [showAddComp, setShowAddComp] = useState(false);
  const [updateRolepopUp, setupdateRolepopUp] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const dispatch = useDispatch();

  // getting list of the user
  useEffect(() => {
    getAllMembersList(dispatch, null, page, limit);
  }, [dispatch, page, limit]);

  // deleting a user
  const handleDeleteConfirm = () => {
    deleteExistingUser(4, dispatch, null);
    setShow(false);
  };

  // updating a user
  const updateUserRole = (id) => {
    updateUser(id, FormData.role, dispatch, null);
    setupdateRolepopUp(false);
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
                <table className="table table-borderless member-table mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex  align-items-center">
                          <img src={userImage} alt="Bomo logo" />
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Name</b>
                            <span className="d-block">Juanito Bosset</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Role</b>
                          {updateRolepopUp ? (
                            <select className="d-block">
                              {roles.map((item) => (
                                <option>{item.label}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="d-block">Admin</span>
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Date added</b>
                          <span className="d-block">15/03/2022</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Email</b>
                          <span className="d-block">uanito@cratat.com</span>
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
                          {!updateRolepopUp ? (
                            <button
                              className=" text-decoration-none text-dark cursor-pointer"
                              onClick={() =>
                                setupdateRolepopUp((prev) => !prev)
                              }
                            >
                              edit
                            </button>
                          ) : (
                            <button onClick={() => updateUserRole(4)}>
                              update
                            </button>
                          )}
                        </p>
                      </td>

                      <td className="text-end">
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <button
                            className=" text-decoration-none text-dark"
                            onClick={() => setShow(true)}
                            style={{ border: "none", backgroundColor: "#fff" }}
                          >
                            delete
                          </button>
                        </p>
                      </td>
                      {show && (
                        <DeleteBrand
                          heading="Member"
                          name={"peppins"}
                          show={show}
                          handleClose={() => setShow(false)}
                          DeleteBrand={() => handleDeleteConfirm()}
                        />
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="review-content bg-white px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex  align-items-center">
                          <img src={userImage} alt="Bomo logo" />
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Name</b>
                            <span className="d-block">Pepín Noob</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Role</b>
                          <span className="d-block">Team Member</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Date added</b>
                          <span className="d-block">23/07/2022</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Email</b>
                          <span className="d-block">uanito@cratat.com</span>
                        </p>
                      </td>
                      <td width={152}></td>

                      <td className="text-end">
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <Link className=" text-decoration-none text-dark">
                            + edit
                          </Link>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="review-content bg-white px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex  align-items-center">
                          <img src={userImage} alt="Bomo logo" />
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Name</b>
                            <span className="d-block">Pepín Noob</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Role</b>
                          <span className="d-block">Team Member</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Date added</b>
                          <span className="d-block">23/07/2022</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Email</b>
                          <span className="d-block">uanito@cratat.com</span>
                        </p>
                      </td>
                      <td width={152}></td>
                      <td className="text-end">
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <Link className=" text-decoration-none text-dark">
                            + edit
                          </Link>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="review-content bg-white px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex  align-items-center">
                          <img src={userImage} alt="Bomo logo" />
                          <p className="mb-0 user-email  ms-1 ms-lg-2">
                            <b>Name</b>
                            <span className="d-block">Pepín Noob</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Role</b>
                          <span className="d-block">Team Member</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Date added</b>
                          <span className="d-block">23/07/2022</span>
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <b>Email</b>
                          <span className="d-block">uanito@cratat.com</span>
                        </p>
                      </td>
                      <td width={152}></td>

                      <td className="text-end">
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                          <Link className=" text-decoration-none text-dark">
                            + edit
                          </Link>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="review-content bg-gray-mid add-member px-4 py-2 rounded mb-3">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
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
                                <span className="fw-bold ms-3">Add</span> New
                                Memeber
                              </span>
                            </div>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <MemberForm setShowAddComp={setShowAddComp} />
                  )}
                </table>
              </div>
            </div>
            <div className="review-content add-member px-4 py-2 rounded mb-3">
              <CustomPagination
                total={4}
                onPageChange={(newPage, newLimit) => {
                  setPage(newPage);
                  setLimit(newLimit + 1);
                }}
              />
              <div className="table-responsive"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Members;
