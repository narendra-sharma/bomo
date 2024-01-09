import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { add_new_member } from "../../reduxdata/members/memberAction";
import { format } from 'date-fns';

const MemberForm = ({ roles,setShowAddComp, isAddEdit, user }) => {
  // initial form data
  const initialFormData = {
    name: "",
    role: "customer_admin",
    email: "",
    password: "",
    colour: "#111111",
  };
  const [formData, setformData] = useState(initialFormData);
  const [showPass, setshowPass] = useState(false);
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passError: "",
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
    }
  }, [isAddEdit, dispatch]);

  // for setting text
  const handleChange = (name, value) => {
    switch (name) {
      case "name":
        setErrors({ ...errors, nameError: (value === '' ? 'Name is Required' : null) });
        setformData({ ...formData, name: value });
        break;
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setErrors({ ...errors, emailError: (value === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null) });
        setformData({ ...formData, email: value });
        break;
      case "role":
        setformData({ ...formData, role: value });
        break;
      case "password":
        setErrors({ ...errors, passError: (value === '' ? 'Password is Required' : value.length < 5 ? 'Password length should be more than 5 characters' : null) });
        setformData({ ...formData, password: value });
        break;
      case "colour":
        setformData({ ...formData, colour: value });
        break;
      default:
        break;
    }
  };

  const handleCreate = () => {
    const output = Object.entries(formData).map(([key, value]) => ({
      key,
      value,
    }));
    let err = false;
    for (let i = output.length - 1; i > -1; i--) {
      if (!output[i].value) {
        err=true;
        handleChange(output[i].key, output[i].value);
      }
    }
    
    if (err) {
      return false;
    }
    add_new_member(dispatch, formData, user?.token);
  };

  return (
    <div>
      <table>
      <tbody>
        <tr>
          <td>
            <div
              className="add-new-brand d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <button className="add-btn" onClick={() => setShowAddComp(false)}>
                -
              </button>
              <p className="mb-0 user-email  ms-1 ms-lg-2">
                <b>Name<span className="text-danger">*</span></b>
                <span className="d-block">
                  <input
                    type="text"
                    className="formcontrol"
                    name="name"
                    value={formData?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.nameError && (
                    <p className="d-block" style={{ color: "red" }}>
                      {errors.nameError}
                    </p>
                  )}
                </span>
              </p>
            </div>
          </td>
          <td>
            <p className="mb-0 user-email  ms-1 ms-lg-2">
              <b>Role<span className="text-danger">*</span></b>
            </p>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              {roles.map((item) => (
                <option value={item.value} key={item.id}>
                  {item?.label}
                </option>
              ))}
            </select>
          </td>
          <td>
            <p className="mb-0 user-email  ms-1 ms-lg-2">
              <b>Date added<span className="text-danger">*</span></b>
              <span className="d-block">{format(new Date(), 'MM/dd/yyyy')}</span>
            </p>
          </td>
          <td>
            <p className="mb-0 user-email  ms-1 ms-lg-2">
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
            {errors.emailError && (
              <p className="d-block" style={{ color: "red" }}>
                {errors.emailError}
              </p>
            )}
          </td>
          <td>
            <p className="mb-0 user-email  ms-1 ms-lg-2">
              <b>Password<span className="text-danger">*</span></b>
            </p>
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
              {errors.passError && (
                <p
                  className="d-block "
                  style={{ color: "red", position: "relative", bottom: "20px" }}
                >
                  {errors.passError}
                </p>
              )}
            </div>
          </td>
          <td>
            <div className="mt-2">
              <p className="mb-0 user-email  ms-1 ms-lg-2">
                <b>Color<span className="text-danger">*</span></b>
              </p>
              <input
                type="color"
                name="colour"
                value={formData.colour}
                onChange={(e) => handleChange("colour", e.target.value)}
              />
            </div>
          </td>
          <td>
            <button
              type="button"
              className="bg-mid-gray fw-bold border rounded-pill px-4 py-1 mt-2"
              onClick={handleCreate}
            >
              create
            </button>
          </td>
        </tr>
      </tbody>
      </table>
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
