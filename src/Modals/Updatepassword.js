import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap"
import { update_password } from "../reduxdata/rootAction";
import { connect, useDispatch } from 'react-redux';

const Updatepassword = ({ isLoading, show, handleClose }) => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });
  const [passworderror, setPassworderror] = useState(null);
  const [newpassworderror, setNewpassworderror] = useState(null);
  const [confirmpassworderror, setconfirmPassworderror] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.oldpassword === '') {
      setPassworderror('Old Password is Required');
    } else if (formData.oldpassword.length < 6) {
      setNewpassworderror("Old Password must be at least 6 characters")
    } else {
      setPassworderror(null)
    }

    if (formData.newpassword === '') {
      setNewpassworderror("New Password is Required");
    } else if (formData.newpassword.length < 6) {
      setNewpassworderror("Password length should be more than 5 characters")
    } else {
      setNewpassworderror(null);
    }

    if (formData.confirmpassword === '') {
      setconfirmPassworderror("Confirm Password is Required");
    } else if (formData.confirmpassword !== formData.newpassword) {
      setconfirmPassworderror("Confirm Password doesn't match");
    } else {
      setconfirmPassworderror(null);
    }

    if ((formData.newpassword === formData.confirmpassword) &&
      (formData.oldpassword && formData.newpassword && formData.confirmpassword)
      && (!passworderror && !newpassworderror && !confirmpassworderror)) {
      const tokendata = JSON.parse(localStorage.getItem('userDetails'));
      const usertoken = tokendata.token;
      const userDataForm = {
        currentUserPassword: formData.oldpassword,
        newUserPassword: formData.newpassword
      }
      await update_password(
        userDataForm,
        usertoken,
        navigate,
        dispatch
      );
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'oldpassword') {
      setPassworderror(value === '' ? 'Old Password is Required' : value.length < 6 ? 'Old Password must be at least 6 characters' : null);
    } else if (name === 'newpassword') {
      setNewpassworderror(value === '' ? 'New Password is Required' : null);
      if (value === formData.oldpassword) {
        setNewpassworderror('Old and New Password are same!')
      } else if (value.length < 6) {
        setNewpassworderror("Password length should be more than 5 characters");
      } else {
        setNewpassworderror(null);
      }
    } else if (name === 'confirmpassword') {
      setconfirmPassworderror(value === '' ? 'Confirm Password is Required' : null);
      if (value !== formData.newpassword) {
        setconfirmPassworderror("Confirm Password doesn't match");
      } else {
        setconfirmPassworderror(null);
      }
    }
  };

  useEffect(() => {
    if (!show) {
      setFormData({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
      });
      setPassworderror(null);
      setNewpassworderror(null);
      setconfirmPassworderror(null);
    }
  }, [show]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  }
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className="logout-popup">
        <Modal.Header className="pt-4" closeButton>
          <Modal.Title><h5 className="mb-0 text-dark fw-bold">Update Password</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <form class="mb-4">
            <div className="mb-3">
              <div className="form-row position-relative">
                <input type={showPassword ? "text" : "password"} name="oldpassword" value={formData.oldpassword} onChange={handleInputChange} className="form-control" placeholder="Old Password" />
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} onClick={togglePasswordVisibility} ></i>
              </div>{
                passworderror ? <p className="mt-1 error fw-bold">{passworderror}</p> : null}
            </div>
            <div className="mb-3">
              <div className="form-row position-relative">
                <input type={showNewPassword ? "text" : "password"} name="newpassword" value={formData.newpassword} onChange={handleInputChange} className="form-control" placeholder="New Password" />
                <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"} onClick={toggleNewPasswordVisibility} ></i>
              </div>
              {newpassworderror ? <p className="mt-1 error fw-bold">{newpassworderror}</p> : null}
            </div>
            <div className="mb-3">
              <div className="form-row position-relative">
                <input type={showconfirmPassword ? "text" : "password"} name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} className="form-control" placeholder="Confirm Password" />
                <i className={showconfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} onClick={toggleConfirmPasswordVisibility} ></i>
              </div>
              {confirmpassworderror ? <p className="mt-1 error fw-bold">{confirmpassworderror}</p> : null}
            </div>
          </form>
          <div className="text-end">

            <Button variant="secondary" className="rounded-pill px-4" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="rounded-pill px-4 ms-3" onClick={(e) => handleSubmit(e, formData)} disabled={isLoading}>
              {isLoading ? 'Updating.....' : 'Update Password'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoading: state.loader.isLoading,
  };
};

const mapDispatchToProps = () => {
  return {
    update_password,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Updatepassword);

