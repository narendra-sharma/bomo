import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { reset_password } from "../reduxdata/User/userActions";
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const Changepassword = (props) => {

  const { isLoading,reset_password } = props;
  let [searchParams] = useSearchParams();
  const userrole = useSelector((state) => state.auth.role || '')
  const [formData, setFormData] = useState({
    password: '',
    confirmpassword: ''
  });
  const [passworderror, setPassworderror] = useState(null);
  const [confirmpassworderror, setconfirmPassworderror] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === '') {
      setPassworderror('Password is Required*');
    } else if (formData.password.length < 5) {
      setPassworderror("Password length should be more than 5*")
    } else {
      setPassworderror(null)
    }

    if (formData.confirmpassword === '') {
      setconfirmPassworderror("Confirm Password is required*");
    } else if (formData.confirmpassword !== formData.password) {
      setconfirmPassworderror("Password doesn't match*");
    } else {
      setconfirmPassworderror(null);
    }

    if (formData.password === formData.confirmpassword) {
      localStorage.setItem('reset-password', JSON.stringify(formData))
      await handleLink(formData);
    }
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    switch (name) {
      case 'password':
        setPassworderror(value === '' ? 'Password is Required*' : value.length < 5 ? 'Password length should be more than 5*' : null);
        break;
      case 'confirmpassword':
        setconfirmPassworderror(value === '' ? 'Confirm password is required*' : value !== formData.password ? "Password doesn't match*" : null);
        break;
      default:
        break;
    }
  };

  const handleLink = async (user) => {
    await reset_password(user, searchParams.get('token'), navigate, dispatch);
  }

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MM.dd.yyyy');

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  }
  const toggleConfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  }

  return (
    <>
      <div className={(userrole === 'Designer' ? "designer-signup-form" : "signup-form")+' forgot-password h-100vh'}>
        <div className="container">
          <div className="signup-content">
            <div className="form-heading d-flex flex-column justify-content-between">
              
            <h1 className="font-reckless">Changed Password</h1>
              <div class="login-date">{formattedDate}
              <div><Link to="/" className="bomo-login-logo fw-bold text-decoration-none">Bomo</Link></div>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData)} className="form-inner">
                <div className="mb-3">
                <label>
                    Password:</label>
                  <input type={showNewPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className="form_control" placeholder="Password" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"} onClick={toggleNewPasswordVisibility} ></i>
                  {passworderror && <p className="error fw-bold">{passworderror}</p>}
                </div>
                <div className="mb-3">
                <label>
                    Confirm:</label>
                  <input  type={showconfirmPassword ? "text" : "password"} name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} className="form_control" placeholder="Confirm Password" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <i className={showconfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} onClick={toggleConfirmPasswordVisibility} ></i>
                  {confirmpassworderror && <p className="error fw-bold">{confirmpassworderror}</p>}
                </div>
                <button type="submit" className="submit-btn signup-btn">
                  {isLoading ? 'Changing.....' : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
    changePasswordLink: state.auth.linkResetStatus,
  };
};

const mapDispatchToProps = () => {
  return {
    reset_password,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Changepassword);
