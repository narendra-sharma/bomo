import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../reduxdata/rootAction";
import { format } from 'date-fns';
const Login = (props) => {
  const { isLoading,login } = props;
  let typeuser = localStorage.getItem('USERTYPE');
  let checkusertype = JSON.parse(typeuser);
  const userrole = useSelector((state) => state.auth.role || '')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const [emailerror, setEmailerror] = useState(null);
  const [passworderror, setPassworderror] = useState(null);

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

    if (formData.password === '') {
      setPassworderror('Password is Required*');
    } else {
      setPassworderror(null);
    }

    if (formData.email !== '' && formData.password !== '') {
      await handleSignup(formData, userrole);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setEmailerror(value === '' ? 'Email is Required*' : !emailRegex.test(value) ? 'Email is Invalid*' : null);
        break;
      case 'password':
        setPassworderror(value === '' ? 'Password is Required*' : value.length < 5 ? 'Password length should be more than 5*' : null);
        break;
      default:
        break;
    }
  };

  const handleSignup = (user, role) => {
    login(user,role,dispatch);
  }
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MM.dd.yyyy');
  return (
    <>
      <div className={checkusertype === 'Designer' ? "designer-signup-form" : "signup-form"}>
        <div className="container">
          <div className="signup-content">
            <div className="form-heading d-flex flex-column justify-content-between">
              <h2>Login</h2>
              <div className="login-date">{formattedDate}
              <div><Link to="/" className="bomo-login-logo fw-bold text-decoration-none">Bomo</Link></div>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData, userrole)} className="form-inner">

                <div className="form-group">
                  <label>
                    Email:</label>
                  <input type="email" autoComplete="off" name="email" placeholder="Your company email here" className="form_control" value={formData.email} onChange={handleInputChange} />
                  {emailerror ? <p >{emailerror}</p> : null}
                </div>

                <div className="form-group">
                  <label>
                    Password:</label>
                  <input type="password" autoComplete="off" name="password" placeholder="Enter your password here" className="form_control" value={formData.password} onChange={handleInputChange} />
                  {passworderror ? <p>{passworderror}</p> : null}
                </div>

                <button type="submit" disabled={isLoading} className="submit-btn signup-btn">
                  {isLoading ? 'Login.....' : 'Login'}
                </button>
                <div className="text-center h8 mt-4 ">
                  <Link
                    to="/forgot-password"
                    className="text-decoration-none color-white"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
            </div>
              {checkusertype === 'SuperAdmin' ? (
                <p></p>
              ) : checkusertype === 'Designer' ? (
                <p className="already-register text-end">Don’t have an account? <Link to='/signup' className="login-redirect">Signup</Link></p>
              ) : checkusertype === 'Customer' ? (
                <p className="already-register text-end">Don’t have an account? <Link to='/signup' className="login-redirect">Signup</Link></p>
              ) : (
                <p>Usertype not found,You can't Signup</p>
              )}
            
       
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
  };
};

const mapDispatchToProps = () => {
  return {
    login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);