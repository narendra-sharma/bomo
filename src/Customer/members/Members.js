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
import { Link } from "react-router-dom";
import SharedRequest from "../../Common/SharedRequest";
const roles = [
  { id: 1, label: "Admin", value: "customer_admin" },
  { id: 2, label: "Member", value: "customer" },
];

const Members = ({ user, member, total, isAddEdit }) => {
  // show hide create members
  const [showAddComp, setShowAddComp] = useState(false);
  const [selectedRole, setselectedRole] = useState("");
  const [updateRolepopUps, setUpdateRolepopUps] = useState(-1);

  const [showDeleteModals, setShowDeleteModals] = useState(
    Array(member.length).fill(false)
  );
  const dispatch = useDispatch();

  // getting list of the user
  useEffect(() => {
    get_all_members(dispatch, user?.token);
  }, []);

  //edit member
  const editmember = {
    id: '',
    name: '',
    role: '',
    email: '',
    colour: ''
  };
  const [edit, setEdit] = useState(editmember);

  const handleEditMember = (index) => {
    if (index !== -1) {
      const editmember = member[index];
      setEdit({
        id: editmember?._id,
        name: editmember?.name,
        role: editmember?.role,
        email: editmember?.email,
        colour: editmember?.colour
      });
      setUpdateRolepopUps(index);
    }
  };

  const [formdata, setFormdata] = useState({
    name: "",
    role: "",
    email: "",
    colour: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    email: "",
    colour: "",
  });
  // deleting a user
  const handleDeleteConfirm = (id) => {
    delete_existing_user(id, dispatch, user?.token);
    setShowDeleteModals([]);
  };

  // handling change of a value
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setErrors({ ...errors, name: value === '' ? 'Name is Required' : null });
        setFormdata({ ...formdata, name: value });
        break;

      case 'role':
        setErrors({ ...errors, role: value === '' ? 'Role is required' : null });
        setFormdata({ ...formdata, role: value });
        break;

      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setErrors({ ...errors, email: value === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null })
        setFormdata({ ...formdata, email: value });
        break;

      case 'colour':
        setErrors({ ...errors, colour: value === '' ? 'Colour is required' : null });
        setFormdata({ ...formdata, colour: value });
        break;

      default:
        setFormdata({ ...formdata, [name]: value, });
        setErrors({ ...errors, [name]: '' });
        break;
    }
  };

  // updating a user
  const updateUserRole = (e) => {
    e.preventDefault();
    const memberdata = {
      id: edit?.id,
      name: formdata?.name,
      email: formdata?.email,
      colour: formdata?.colour,
      role: formdata?.role
    };
    add_new_member(dispatch, null, user?.token, memberdata, user);
    setUpdateRolepopUps(-1);
    setFormdata({ name: "", role: "", email: "", colour: "" });
  };

  useEffect(() => {
    if (edit) {
      setFormdata((prev) => {
        return ({
          ...prev,
          name: edit?.name,
          role: edit?.role,
          email: edit?.email,
          colour: edit?.colour,
        })
      });
    };
  }, [edit]);

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          <div className="">
          {((user?.role === 'customer_admin'||'customer')) && <SharedRequest />}
          </div>
          <div className="review-main-content mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4">
              <h3>Members</h3>
            </div>
            {(member.length > 0) && <div className="review-content rounded mb-3">

              {member.map((item, index) => (
                <div className={`table-responsive member-table table table-borderless ps-5 ${(updateRolepopUps === index) ? 'border border-dark bg-medium-gray ps-5' : ''}`}
                  key={index}>
                  <table
                    className="table table-borderless mb-0" >

                    <tr className="members">
                      <td>
                        <div className="d-flex  align-items-center">
                          {(updateRolepopUps === index) ?
                            <div className="d-flex justify-content-center rounded bg-white" style={{ padding: "5px", alignSelf: "end" }}>
                              <input
                                type="color"
                                name="colour"
                                value={formdata?.colour}
                                onChange={(e) => handleChange(e)} id="color1" className="cursor-pointer"
                              /></div> :
                            !item?.colour ?
                              <div style={{
                                backgroundColor: "black",
                                width: 30,
                                height: 30,
                                borderRadius: 25,
                              }}
                              ></div> :
                              <div
                                style={{
                                  backgroundColor: item?.colour,
                                  width: 30,
                                  height: 30,
                                  borderRadius: 25,
                                }}
                              ></div>
                          }
                          <p className="mb-0 user-email">
                            <b>Name</b>
                            {(updateRolepopUps === index) ?
                              <input
                                type="text"
                                className="formcontrol"
                                name="name"
                                value={formdata?.name}
                                onChange={(e) => handleChange(e)}
                              /> :
                              <p className="d-block">
                                {item?.name}
                              </p>
                            }
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 user-email">
                          <b>Role</b>
                          {(updateRolepopUps === index) ? (
                            <select
                              className="d-block"
                              name="role"
                              value={formdata?.role}
                              onChange={(e) => handleChange(e)}
                            >
                              {roles?.map((roleItem) => (
                                <option key={roleItem?.id} value={roleItem?.value}>
                                  {roleItem?.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="d-block text-capitalize">{roles.find(r => r.value === item?.role) ? roles.find(r => r.value === item?.role).label : 'Customer'}</span>
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 user-email member-date">
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
                        <p className="mb-0 user-email">
                          <b>Email</b>
                          {(updateRolepopUps === index) ?
                            <input
                              type="email"
                              noValidate
                              className="formcontrol"
                              name="email"
                              value={formdata?.email}
                              onChange={(e) => handleChange(e)}
                            /> :
                            <span className="d-block">{item?.email}</span>
                          }
                        </p>
                      </td>
                      <td>
                        <div className="edit-buttons d-flex align-items-center justify-content-end gap-5">
                      {(updateRolepopUps === index) && <span>
                       
                          <span className="">
                          <button type="submit" className="create-add-btn brands-add-btn rounded-pill fw-bold w-auto mx-auto" onClick={(e) => updateUserRole(e)}>
                            Update
                          </button>
                          <button type="button" className="create-add-btn delete-btn rounded-pill fw-bold w-auto mx-auto mb-0"
                            onClick={() => {
                              const updatedModals = [...showDeleteModals];
                              updatedModals[index] = true;
                              setShowDeleteModals(updatedModals);
                            }}
                          >
                            Delete
                          </button>
                          </span>

                      </span>}
                      {(user?.role === 'customer_admin') && <span className="">
                        <span className="edit p-0 edit gap-5 d-flex align-items-center justify-content-center">

                          {(updateRolepopUps === index) ?
                            <Link className="text-dark text-decoration-none" onClick={() => { setShowAddComp(false); handleEditMember(null); }}><span className="fa fa-times"></span></Link>
                            :
                            <Link className="text-dark text-decoration-none" onClick={() => { setShowAddComp(false); handleEditMember(index); }}>+ edit</Link>
                          }
                        </span>
                      </span>}


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
                      </div>
                      </td>
                    </tr>
                  </table>
                </div>
              ))}

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
              (user?.role === 'customer_admin') && <div className="add-new-brand add-member-count" onClick={() => { setShowAddComp(true); setUpdateRolepopUps(-1); }}><button className="add-btn">+</button> <span className="ms-4 ps-2"><span className="fw-bold">Add</span> New Member</span></div>
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