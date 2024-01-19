import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { add_new_member } from "../../reduxdata/members/memberAction";
import { format } from 'date-fns';
import { change_add_edit } from "../../reduxdata/rootAction";

const MemberForm = ({ roles,setShowAddComp, isAddEdit, user }) => {
  // initial form data
  const initialFormData = {
    name: "",
    role: "",
    email: "",
    password: "",
    colour: "#111111",
  };
  const [formData, setformData] = useState(initialFormData);
  const [showPass, setshowPass] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddEdit) {
      setformData({
        name: "",
        role: "",
        email: "",
        password: "",
        colour: "#111111",
      });
      setShowAddComp();
      change_add_edit(dispatch);
    }
  }, [isAddEdit, dispatch]);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const handleChange = (label, value) => {
    setformData((prev) => ({...prev,[label]:value}));
    if(!value && (label!=='colour') && (label!=='role') ){
      setErrors((prevErrors) => ({ ...prevErrors,[label]:'required'}))
    }else if(((label==='email') && (!emailRegex.test(value)))  || ((label==='password') && (value.length < 5))){
      setErrors((prevErrors) => ({ ...prevErrors,[label]:(label==='email')?'invalid':'minLength'}))
    }else if (!value && (label === "role")) {
      setErrors((prevErrors) => ({ ...prevErrors, [label]: "required" }));
    }else{
      setErrors((prevErrors) => ({ ...prevErrors,[label]:''}))
    }
  };

  const checkAllErrors=()=>{
    let err=false;
    let output = Object.entries(formData)
    output.forEach(([key, value]) =>{
      if(!value && (key!=='colour') && (key!=='role') ){
        err=true;
        setErrors((prevErrors) => ({ ...prevErrors,[key]:'required'}))
      }else if(((key==='email') && (!emailRegex.test(value)))  || ((key==='password') && (value.length < 5))){
        err=true;
        setErrors((prevErrors) => ({ ...prevErrors,[key]:(key==='email')?'invalid':'minLength'}))
      }
    });
    if (!formData.role) {
      err = true;
      setErrors((prevErrors) => ({ ...prevErrors, role: 'required' }));
    }
    return err
  }
  const handleCreate = () => {
    if (checkAllErrors()) {
      return false;
    }
    add_new_member(dispatch, formData, user?.token);
  };

  return (
    <div className="member-content review-content rounded">
      <div className="table-responsive member-table"> 
        <table>
        <tbody>
          <tr>
            <td>
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <div>
                  <p className="mb-0 user-email">
                    <b>Color<span className="text-danger">*</span></b>
                  </p>
                  <input
                    type="color"
                    name="colour"
                    value={formData.colour}
                    onChange={(e) => handleChange("colour", e.target.value)}
                  />
                </div>
                <div>
                  <p className="mb-0 user-email">
                    <b>Name<span className="text-danger">*</span></b>
                  </p>
                      <input
                        type="text"
                        className="formcontrol"
                        name="name"
                        value={formData?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                      {errors.name && (
                        <p className="d-block error-msg mt-1">
                          Name is required
                        </p>
                      )}
                      </div>
              </div>
            </td>
            <td>
              <p className="mb-0 user-email">
                <b>Role<span className="text-danger">*</span></b>
              </p>
              <select
                name="role"
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="" disabled selected>Select</option>
                {roles.map((item,index) => (
                  <option value={item?.label} key={index}>
                    {item?.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                  <p
                    className="d-block error-msg mt-1"
                    
                  >
                    {errors.role==='required'?'Role is required':''}
                  </p>
                )}
            </td>
            <td>
              <p className="mb-0 date user-email">
                <b>Date added<span className="text-danger">*</span></b>
                <span className="d-block">{format(new Date(), 'MM/dd/yyyy')}</span>
              </p>
            </td>
            <td>
              <p className="mb-0 user-email">
                <b>Email<span className="text-danger">*</span></b>
              </p>
              <input
                type="email"
                noValidate
                className="formcontrol"
                name="email"
                value={formData?.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="d-block error-msg mt-1">
                  {errors.email==='required'?'Email is required':'Email is invalid'}
                </p>
              )}
            </td>
            <td>
              <p className="mb-0 user-email">
                <b>Password<span className="text-danger">*</span></b>
              </p>
              <div className="">
              <div className="position-relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="formcontrol"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />

                <div
                  className="eye-btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => setshowPass((prev) => !prev)}
                >
                  {!showPass ? <FaEye color="black" size={20} /> : <FaEyeSlash />}
                </div>
                </div>
                {errors.password && (
                  <p
                    className="d-block error-msg mt-1"
                    
                  >
                    {errors.password==='required'?'Password is required':'Password length should be more than 5 characters'}
                  </p>
                )}
              </div>
            </td>
            
            <td className="vertical-middle">
              <button
                type="button"
                className="bg-mid-gray fw-bold border rounded-pill px-4 py-1 "
                onClick={handleCreate}
              >
                CREATE
              </button>
              <button className="create-add-btn delete-btn rounded-pill fw-bold px-4" type="button" onClick={() => setShowAddComp(false)}>
                Close
              </button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAddEdit: state.brand.isAddEdit,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(MemberForm);
