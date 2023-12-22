import React, { useState } from "react";
import { Link } from "react-router-dom";
import bomoLogo from '../images/bomo-logo.svg'
import { connect } from 'react-redux';
import { forgotPasswordReset } from "../reduxdata/User/userActions";
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const Forgotpassword = (props) => {
  const { isLoading, startLoading } = props;
  const [formData, setFormData] = useState({
    email: ''
  });
  const [emailerror, setEmailerror] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const exptest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (formData.email === '') {
      setEmailerror('Email is Required*');
    } else if (!exptest.test(formData.email)) {
      setEmailerror('Email is Invalid*');
    } else {
      setEmailerror(null);
    }

    if (formData.email !== '' && exptest.test(formData.email)) {
      localStorage.setItem('reset-password', JSON.stringify(formData))
      await handleLink(formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const exptest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (formData.email === '') {
      setEmailerror('Email Address is Required*');
    } else if (!exptest.test(formData.email)) {
      setEmailerror('Please provide valid email*');
    } else {
      setEmailerror(null);
    }
  };

  const handleLink = async (user) => {
    console.log("APi Form Data--->", user);
    await forgotPasswordReset(user, dispatch);
  }

  return (
    <>
      <div className="signup-form  forgot-password h-100vh">
        <div className="container">
          <div className="signup-content">
            <div className="form-heading d-flex flex-column justify-content-between">
              <h1 className="color-white font-roboto">Forgot Password</h1>
              <div class="login-date">11.28.2023
                <div className="bomo-login-logo fw-bold">Bomo</div>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData)} className="form-inner">
                <div className="mb-3">
                <label>
                    Enter Email Address:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form_control" placeholder="Email address" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {emailerror ? <p>{emailerror}</p> : null}
                </div>
                <button type="submit" className="submit-btn signup-btn">
                  {isLoading ? 'Sending Link.....' : 'Send Link'}
                </button>
              </form>
            </div>
          </div>
          <div className="text-end mt-5 ">
                <Link to="/login" className="login-redirect">
                  Back to login
                </Link>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    forgotPasswordReset,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);
