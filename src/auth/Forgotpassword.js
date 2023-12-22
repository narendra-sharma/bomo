import React, { useState } from "react";
import { Link } from "react-router-dom";
import bomoLogo from '../images/bomo-logo.svg'
import { connect } from 'react-redux';
import { forgotPasswordReset } from "../reduxdata/User/userActions";
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const Forgotpassword = (props) => {
  const { isLoading } = props;
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setEmailerror(value === '' ? 'Email Address is Required*' : !emailRegex.test(value) ? 'Email is Invalid*' : null);
        break;
      default:
        break;
    }
  };

  const handleLink = async (user) => {
    console.log("APi Form Data--->", user);
    await forgotPasswordReset(user, dispatch);
  }

  return (
    <>
      <div className="signup-form">
        <div className="container">
          <div className="signup-content">
            <div className="form-heading">
              <img src={bomoLogo} alt="admin" />
              <h5>Forgot Password</h5>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData)}>
                <div className="mb-3">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control form-control-lg" placeholder="Email address" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {emailerror ? <p>{emailerror}</p> : null}
                </div>
                <button type="submit" className="btn btn-success btn-lg w-100">
                  {isLoading ? 'Sending Link.....' : 'Send Link'}
                </button>
              </form>
              <div className="text-center h5 mt-4 fw-bold">
                <Link to="/login" className="text-no-decoration">
                  Back to login
                </Link>
              </div>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    forgotPasswordReset,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);
