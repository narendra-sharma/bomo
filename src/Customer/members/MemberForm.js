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
    colour: "#111111",
  };
  const [formData, setformData] = useState(initialFormData);
  const [showPass, setshowPass] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAddEdit) {
      setformData({
        name: "",
        role: "",
        email: "",
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
    }else if(((label==='email') && (!emailRegex.test(value)))){
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
      }else if(((key==='email') && (!emailRegex.test(value)))){
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
    <div className="member-content review-content rounded border border-dark">
      <div className="table-responsive member-table bg-medium-gray border ps-5"> 
        <table className="table table-borderless mb-0">
        <tbody>
          <tr>
            <td>
              <div
                className="row"
                style={{ cursor: "pointer" }}
              >
                <div className="col-md-3 col-3" style={{ height: "45px"}}>
                  <p className="mb-1 user-email">
                    <b>Color<span className="text-danger">*</span></b>
                  </p>
                  <div className="d-flex justify-content-center rounded bg-white" style={{padding:"5px" , width:"35px" , height:"35px"}}><input
                    type="color"
                    name="colour"
                    value={formData.colour}
                    onChange={(e) => handleChange("colour", e.target.value) } id="color1" className="cursor-pointer"
                  />
                  </div>
                </div>
                <div className="col-md-9 col-9" >
                  <p className="mb-1 user-email">
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
              <p className="mb-1 user-email">
                <b>Role<span className="text-danger">*</span></b>
              </p>
              <select
                name="role"
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="" disabled selected>Select</option>
                {roles.map((item,index) => (
                  <option value={item?.value} key={index}>
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
              <p className="mb-1 user-email">
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
            
            <td className="vertical-middle member-last-column">
            
              <div className="d-flex justify-content-end gap-5">
                <button
                  type="button"
                  className="bg-mid-gray fw-bold rounded-pill px-3 py-1 w-auto d-block mb-0"
                  onClick={handleCreate}
                >
                  CREATE
                </button>
               
              </div>
            </td>
            <td className="col-md-1 col-12 mb-3 mb-md-0 vertical-middle text-center"> <button className="border-0 bg-transparent fw-bold mb-0 p-0" type="button" onClick={() => setShowAddComp(false)}>
                  <span className="fa fa-times"></span>
                </button></td>
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
