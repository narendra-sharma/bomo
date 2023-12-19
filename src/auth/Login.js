import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../reduxdata/Actions/authActions";

const Login = () => {

    let typeuser = localStorage.getItem('USERTYPE');
    let checkusertype = JSON.parse(typeuser);
    const userrole = useSelector((state) => state.auth.role || '')
    console.log("userole",userrole);

    const users = useSelector((state) => state.user);
    console.log("redux-loginuser-data", users);
    console.log("types of data", typeof users);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // const userarray = Object.values(users).find((u)=> u.email === formData.email && u.password === formData.password);
    // console.log("types of userarray", typeof userarray);
   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailerror, setEmailerror] = useState(null);
    const [passworderror, setPassworderror] = useState(null);

    const handleSubmit = (e) => {
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
            dispatch(logIn(formData));
            window.location.reload();
            navigate('/');
        } else {
            alert("Invalid Credentials");
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
            setEmailerror(null)
        }

        if (formData.password === '') {
            setPassworderror('Password is Required*');
        } else {
            setPassworderror(null)
        }
    };

    return (
        <>
        <div className={checkusertype === 'Designer' ? "designer-signup-form" : checkusertype === 'Customer' ? "signup-form" : checkusertype === 'SuperAdmin' ? "signup-form" : ""}>
          <div className="container">
              <div className="signup-content">
                  <div className="form-heading">
                  <h2>Login</h2>
                  </div>
                  <div>
                  <form onSubmit={handleSubmit}  className="form-inner">
                     
                     <div className="form-group">
                      <label>
                          Email:</label>                          
                          <input type="email" name="email" placeholder="Your company email here" className="form_control" value={formData.email}  onChange={handleInputChange}/>
                          {emailerror ? <p>{emailerror}</p> : null}
                      </div>
                      
                      <div className="form-group">
                      <label>
                          Password:</label>
                          <input type="password" name="password"  placeholder="Enter your password here" className="form_control" value={formData.password} onChange={handleInputChange} />
                          {passworderror ? <p>{passworderror}</p> : null}
                      </div>
                    
                      <button type="submit" className="submit-btn signup-btn mt-150">Login</button>
                  </form>
                  {checkusertype === 'SuperAdmin' ? (
                    <p></p>
                  ): checkusertype === 'Designer' ? (
                    <p className="already-register">Don’t have an account? <a href='/signup' className="login-redirect">Signup</a></p>
                  ) : checkusertype === 'Customer' ? (
                    <p className="already-register">Don’t have an account? <a href='/signup' className="login-redirect">Signup</a></p>
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

export default Login;