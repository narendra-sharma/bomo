import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const MemberForm = ({ setShowAddComp }) => {
  // initial form data
  const initialFormData = {
    name: "",
    role: 1,
    email: "",
    password: "",
  };
  const [formData, setformData] = React.useState(initialFormData);
  const [showPass, setshowPass] = React.useState(false);
  const roles = [
    { id: 1, label: "Admin" },
    { id: 2, label: "Team Member" },
  ];

  const handleChange = (fieldName, value) => {
    setformData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // for submitting
  const handleCreate = () => {
    console.log(formData);
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
              value={formData?.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              {roles.map((item) => (
                <option>{item?.label}</option>
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
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
           
              <div className="eye-btn"
                style={{ cursor: "pointer" }}
                onClick={() => setshowPass((prev) => !prev)}
              >
                {!showPass ? <FaEye color="black" size={20} /> : <FaEyeSlash />}
              </div>
              </div>
          
          </td>
          <td>
            <button
              type="button"
              className="bg-mid-gray fw-bold border rounded-pill px-4 py-1"
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

export default MemberForm;
