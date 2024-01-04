import React, { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { add_new_member } from "../../reduxdata/members/memberAction";
const MemberForm = ({ setShowAddComp, isAddEdit, user }) => {
  // initial form data
  const initialFormData = {
    name: "",
    role: "customer_admin",
    email: "",
    password: "",
    colour: "#111111",
  };
  const [formData, setformData] = React.useState(initialFormData);
  const [showPass, setshowPass] = React.useState(false);
  const [errors, setErrors] = React.useState({
    nameError: "",
    emailError: "",
    passError: "",
  });
  const roles = [
    { id: 1, label: "customer Admin" },
    { id: 2, label: "Team Member" },
  ];

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
    }
  }, [isAddEdit, dispatch]);

  // for setting text
  const handleChange = (name, value) => {
    switch (name) {
      case "name":
        if (value == null || value == "") {
          setErrors({ ...errors, nameError: "Name is required*" });
        } else {
          setErrors({ ...errors, nameError: null });
        }
        setformData({ ...formData, name: value });
        break;
      case "email":
        if (value == null || value == "") {
          setErrors({ ...errors, emailError: "Email is required*" });
        } else {
          setErrors({ ...errors, emailError: null });
        }
        setformData({ ...formData, email: value });
        break;
      case "role":
        setformData({ ...formData, role: value });
        break;
      case "password":
        if (value == null || value == "") {
          setErrors({ ...errors, passError: "Password is required*" });
        } else {
          setErrors({ ...errors, passError: null });
        }
        setformData({ ...formData, password: value });
        break;
      case "colour":
        setformData({ ...formData, colour: value });
        break;
      default:
        break;
    }
  };

  // callback

  // const getformData = () => {
  //   sendData(formData);
  // };

  // validations

  // for submitting
  const handleCreate = () => {
    const output = Object.entries(formData).map(([key, value]) => ({
      key,
      value,
    }));
    for (let i = output.length - 1; i > -1; i--) {
      if (!output[i].value) {
        handleChange(output[i].key, output[i].value);
      }
    }
    let err = false;
    const errOutput = Object.entries(errors).map(([key, value]) => ({
      key,
      value,
    }));
    err = errOutput.find((r) => (r.value ? true : false));
    if (err) {
      return false;
    }
    // api call
    console.log(user.token);
    add_new_member(dispatch, formData, user?.token);
    // setting everything to null
  };

  return (
    <div>
      <tbody>
        <tr>
          <td>
            <div
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <span className="plus" onClick={() => setShowAddComp(false)}>
                -
              </span>
              <p className="mb-0 user-email  ms-1 ms-lg-2">
                <b>Name</b>
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
              <b>Role </b>
            </p>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              {roles.map((item) => (
                <option value={item.label} key={item.id}>
                  {item?.label}
                </option>
              ))}
            </select>
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
            </p>
            <input
              type="email"
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
              <b>Password</b>
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
                <b>Color</b>
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