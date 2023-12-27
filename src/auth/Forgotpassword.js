import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { forgot_password_reset } from "../reduxdata/User/userActions";
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const Forgotpassword = (props) => {
  const { isLoading,forgot_password_reset } = props;
  const userrole = useSelector((state) => state.auth.role || '')
  const [formData, setFormData] = useState({
    email: ''
  });
  const [emailerror, setEmailerror] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const exptest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (formData.email === '') {
      setEmailerror('Email Address is Required*');
    } else if (!exptest.test(formData.email)) {
      setEmailerror('Email Address is Invalid*');
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
        setEmailerror(value === '' ? 'Email Address is Required*' : !emailRegex.test(value) ? 'Email Address is Invalid*' : null);
        break;
      default:
        break;
    }
  };

  const handleLink = async (user) => {
    await forgot_password_reset(user, dispatch);
  }

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MM.dd.yyyy');
  return (
    <>
      <div className={(userrole === 'Designer' ? "designer-signup-form" :"signup-form")+' forgot-password h-100vh'}>
        <div className="container">
          <div className="signup-content">
            <div className="form-heading d-flex flex-column justify-content-between">
              <h1 className="font-reckless">Forgot Password</h1>
              <div class="login-date">{formattedDate}
              <div><Link to="/" className="bomo-login-logo fw-bold text-decoration-none">Bomo</Link></div>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData)} className="form-inner">
                <div className="mb-3">
                <label>
                    Enter Email Address:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form_control" placeholder="Email address" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {emailerror ? <p className="error fw-bold">{emailerror}</p> : null}

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

const mapDispatchToProps = () => {
  return {
    forgot_password_reset,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);
