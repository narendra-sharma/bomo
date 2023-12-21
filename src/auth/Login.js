import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn, setUpdateUser } from "../reduxdata/User/userActions";
import { startLoading, stopLoading } from "../reduxdata/Loader/loaderActions";

const Login = (props) => {

    const { isLoading, startLoading, } = props;

    let typeuser = localStorage.getItem('USERTYPE');
    let checkusertype = JSON.parse(typeuser);
    const userrole = useSelector((state) => state.auth.role || '')
    console.log("userole",userrole);


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
   
    const navigate = useNavigate();

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
            localStorage.setItem('LoginuserDetails', JSON.stringify(formData))
            await handleSignup(formData, userrole);
        }
    };

    const handleInputChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});

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
            setPassworderror(null)
        }
    };

    const handleSignup = async (user, role) => {
        console.log("APi Form Data--->",user,role);
        await startLoading();
        await logIn(user,navigate);
        setUpdateUser(user);
    }

    return (
        <>
        <div className={checkusertype === 'Designer' ? "designer-signup-form" : checkusertype === 'Customer' ? "signup-form" : checkusertype === 'SuperAdmin' ? "signup-form" : ""}>
          <div className="container">
              <div className="signup-content">
                  <div className="form-heading">
                  <h2>Login</h2>
                  </div>
                  <div>
                  <form onSubmit={(e) =>handleSubmit(e, formData, userrole)} className="form-inner">
                     
                     <div className="form-group">
                      <label>
                          Email:</label>                          
                          <input type="email" autoComplete="off" name="email" placeholder="Your company email here" className="form_control" value={formData.email}  onChange={handleInputChange}/>
                          {emailerror ? <p>{emailerror}</p> : null}
                      </div>
                      
                      <div className="form-group">
                      <label>
                          Password:</label>
                          <input type="password" autoComplete="off" name="password"  placeholder="Enter your password here" className="form_control" value={formData.password} onChange={handleInputChange} />
                          {passworderror ? <p>{passworderror}</p> : null}
                      </div>
                     
                      <button type="submit" disabled={isLoading} className="submit-btn signup-btn">
                                            {isLoading ? 'Login.....' : 'Login'}
                                        </button>
                  </form>
                  {checkusertype === 'SuperAdmin' ? (
                    <p></p>
                  ): checkusertype === 'Designer' ? (
                    <p className="already-register">Don’t have an account? <Link to='/signup' className="login-redirect">Signup</Link></p>
                  ) : checkusertype === 'Customer' ? (
                    <p className="already-register">Don’t have an account? <Link to='/signup' className="login-redirect">Signup</Link></p>
                  ): (
                    <p>Usertype not found,You can't Signup</p>
                  )}
                  </div>
              </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading()),
        logIn: (user,navigate) => dispatch(logIn(user, navigate)),
        setUpdateUser: (user) => dispatch(setUpdateUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);