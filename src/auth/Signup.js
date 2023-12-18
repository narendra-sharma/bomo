import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../reduxdata/Reducer/userSlice";
const Signup = () => {

    let typeuser = localStorage.getItem('USERTYPE');
    let checkusertype = JSON.parse(typeuser);
    console.log("Usertype", checkusertype);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        reel: ''
    });
    const [nameerror, setNameerror] = useState(null);
    const [emailerror, setEmailerror] = useState(null);
    const [passworderror, setPassworderror] = useState(null);
    const [companyerror, setCompanyerror] = useState(null);
    const [reelerror, setReelerror] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name === '') {
            setNameerror('Name is Required*');
        } else {
            setNameerror(null)
        }

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
        } else if (formData.password.length < 5) {
            setPassworderror("Password length should be more than 5*")
        } else {
            setPassworderror(null)
        }

        if (formData.company === '') {
            setCompanyerror('Company is Required*');
        } else {
            setCompanyerror(null)
        }

        if(formData.reel === '') {
            setReelerror('Reel is Required*');
        } else {
            setReelerror(null);
        }

        if (formData.email !== '' && ((checkusertype ==='Designer' && formData.reel !== '') || (checkusertype ==='Customer' && formData.company !== '')) && formData.name !== '' && formData.password !== '') {
            localStorage.setItem('userDetails', JSON.stringify(formData))
            navigate(`/login`);
            dispatch(signup(formData));
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (formData.name === '') {
            setNameerror('Name is Required*');
        } else {
            setNameerror(null)
        }

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
        } else if (formData.password.length < 5) {
            setPassworderror("Password length should be more than 5*")
        } else {
            setPassworderror(null)
        }

        if (formData.company === '') {
            setCompanyerror('Company is Required*');
        } else {
            setCompanyerror(null)
        }

        if(formData.reel === '') {
            setReelerror('Reel is Required*');
        } else {
            setReelerror(null);
        }
    }

    return (
        <>
            <div className={checkusertype === 'Designer' ? "designer-signup-form" : checkusertype === 'Customer' ? "signup-form" : ""}>
                <div className="container">
                    <div className="signup-content">
                        <div className="form-heading">
                            {checkusertype === 'Designer' ? (
                                <h2>Welcome
                                    <span className="d-block">MOTION   </span>
                                    <span className="d-block">DESIGNER</span>
                                </h2>
                            ) : checkusertype === 'Customer' ? (
                                <h2>It’s time
                                    <span className="d-block">to step up   </span>
                                    <span className="d-block">MOTION</span>
                                </h2>
                            ) : (
                                <h2>Usertype not found</h2>
                            )}
                        </div>
                        <div>
                            <form onSubmit={handleSubmit} className="form-inner">
                                <div className="form-group">
                                    <label>
                                        Name:</label>
                                    <input type="text" placeholder="Your full name here. You can add members later" name="name" value={formData.name} onChange={handleInputChange} className="form_control" />
                                    {nameerror ? <p>{nameerror}</p> : null}
                                </div>
                                <div className="form-group">
                                    <label>
                                        Email:</label>
                                    <input type="email" name="email" placeholder={ checkusertype === 'Designer' ? "Your working email here" : "Your company email here"} value={formData.email} onChange={handleInputChange} className="form_control" />
                                    {emailerror ? <p>{emailerror}</p> : null}
                                </div>
                                {checkusertype === 'Designer' ? (
                                    <div className="form-group">
                                        <label>
                                            Reel:</label>
                                        <input type="text" name="reel" placeholder="Time to shine. Show us your best work" value={formData.reel} onChange={handleInputChange} className="form_control" />
                                        {reelerror ? <p>{reelerror}</p> : null}
                                    </div>
                                ) : checkusertype === 'Customer' ? (
                                    <div className="form-group">
                                        <label>
                                            Company:</label>
                                        <input type="text" name="company" placeholder="Your company name here" value={formData.company} onChange={handleInputChange} className="form_control" />
                                        {companyerror ? <p>{companyerror}</p> : null}
                                    </div>
                                ) : (
                                    <p>Not Found!!!</p>
                                )}
                                <div className="form-group">
                                    <label>
                                        Password:</label>
                                    <input type="password" name="password" placeholder="Choose your own password" value={formData.password} onChange={handleInputChange} className="form_control" />
                                    {passworderror ? <p>{passworderror}</p> : null}
                                </div>
                                {checkusertype === 'Designer' ? (
                                    <>
                                        <button type="submit" className="submit-btn signup-btn">Create my Account</button>
                                    </>
                                ) : checkusertype === 'Customer' ? (
                                    <>
                                        <p>Fill out this form to create your account.</p>
                                        <p>You can activate your <span className="color-white">subscription</span> and choose your monthly plan later in the dashboard.</p>
                                        <br />
                                        <button type="submit" className="submit-btn signup-btn">Signup</button>
                                    </>
                                ) : (
                                    <>
                                        <p>no usertype data found</p>
                                    </>
                                )}
                            </form>
                            <p class="already-register">Already Registered? <a href='/login' className="login-redirect">Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;


