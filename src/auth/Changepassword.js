import React, { useState } from "react";
import bomoLogo from "../images/bomo-logo.svg"
import { useNavigate, useSearchParams } from "react-router-dom";
import { connect } from 'react-redux';
import { resetPassword } from "../reduxdata/User/userActions";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const Changepassword = (props) => {

  const { isLoading } = props;
  let [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmpassword: ''
  });
  const [passworderror, setPassworderror] = useState(null);
  const [confirmpassworderror, setconfirmPassworderror] = useState(null);

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

    if (formData.confirmpassword !== formData.password) {
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
        setconfirmPassworderror(value === '' ? 'Confirm your password*' : value !== formData.password ? "Password doesn't match*" : null);
        break;
      default:
        break;
    }
  };

  const handleLink = async (user) => {
    await resetPassword(user, searchParams.get('token'), navigate, dispatch);
  }

  return (
    <>
      <div className="signup-form">
        <div className="container">
          <div className="signup-content">
            <div className="form-heading">
              <img src={bomoLogo} alt="admin" />
              <h5>Changed Password</h5>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData)}>
                <div className="mb-3">
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control form-control-lg" placeholder="Password" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {passworderror ? <p>{passworderror}</p> : null}
                </div>
                <div className="mb-3">
                  <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} className="form-control form-control-lg" placeholder="Confirm Password" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {confirmpassworderror ? <p>{confirmpassworderror}</p> : null}
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100">
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

// export default Changepassword;

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
    changePasswordLink: state.auth.linkResetStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    resetPassword,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Changepassword);
