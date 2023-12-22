import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../reduxdata/rootAction";

const Signup = (props) => {
  const { isLoading, signup } = props;

  const userrole = useSelector((state) => state.auth.role || '')

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
  const handleSubmit = async (e) => {
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

    if (formData.reel === '') {
      setReelerror('Reel is Required*');
    } else {
      setReelerror(null);
    }

    if (formData.email !== '' && ((userrole === 'Designer' && formData.reel !== '') || (userrole === 'Customer' && formData.company !== '')) && formData.name !== '' && formData.password !== '') {

      const userFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      if (userrole === 'Designer') {
        userFormData.reel = formData.reel;
      } else if (userrole === 'Customer') {
        userFormData.company = formData.company;
      }
      await handleSignup(userFormData, userrole);
    }
  }

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'name':
        setNameerror(value === '' ? 'Name is Required*' : null);
        break;
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setEmailerror(value === '' ? 'Email is Required*' : !emailRegex.test(value) ? 'Email is Invalid*' : null);
        break;
      case 'password':
        setPassworderror(value === '' ? 'Password is Required*' : value.length < 5 ? 'Password length should be more than 5*' : null);
        break;
      case 'company':
        setCompanyerror(value === '' ? 'Company is Required*' : null);
        break;
      case 'reel':
        setReelerror(value === '' ? 'Reel is Required*' : null);
        break;
      default:
        break;
    }
  }

  const handleSignup = async (user, role) => {
    await signup(user, role, navigate, dispatch);
  }

  return (
    <>
      <div className={userrole === 'Designer' ? "designer-signup-form" : userrole === "Customer" ? "signup-form" : ""}>
        <div className="container">
          <div className="signup-content">
            <div className="form-heading d-flex flex-column justify-content-between">
              {userrole === 'Designer' ? (
                <h2>Welcome
                  <span className="d-block fw-bold font-public">MOTION   </span>
                  <span className="d-block fw-bold font-public">DESIGNER</span>
                </h2>
              ) : userrole === 'Customer' ? (
                <h2>It’s time
                  <span className="d-block">to step up   </span>
                  <span className="d-block font-public">MOTION</span>
                </h2>
              ) : (
                <h2>Usertype not found</h2>
              )}
              <div class="login-date fw-bold">11.28.2023
                <div className="bomo-login-logo fw-bold">Bomo</div>
              </div>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e, formData, userrole)} className="form-inner">
                <div className="form-group">
                  <label>
                    Name:</label>
                  <input type="text" autoComplete="off" placeholder="Your full name here. You can add members later" name="name" value={formData.name} onChange={handleInputChange} className="form_control" />
                  {nameerror ? <p>{nameerror}</p> : null}
                </div>
                <div className="form-group">
                  <label>
                    Email:</label>
                  <input type="email" autoComplete="off" name="email" placeholder={userrole === 'Designer' ? "Your working email here" : "Your company email here"} value={formData.email} onChange={handleInputChange} className="form_control" />
                  {emailerror ? <p>{emailerror}</p> : null}
                </div>
                {userrole === 'Designer' ? (
                  <div className="form-group">
                    <label>
                      Reel:</label>
                    <input type="text" autoComplete="off" name="reel" placeholder="Time to shine. Show us your best work" value={formData.reel} onChange={handleInputChange} className="form_control" />
                    {reelerror ? <p>{reelerror}</p> : null}
                  </div>
                ) : userrole === 'Customer' ? (
                  <div className="form-group">
                    <label>
                      Company:</label>
                    <input type="text" autoComplete="off" name="company" placeholder="Your company name here" value={formData.company} onChange={handleInputChange} className="form_control" />
                    {companyerror ? <p>{companyerror}</p> : null}
                  </div>
                ) : (
                  <p>Not Found!!!</p>
                )}
                <div className="form-group">
                  <label>
                    Password:</label>
                  <input type="password" autoComplete="off" name="password" placeholder="Choose your own password" value={formData.password} onChange={handleInputChange} className="form_control" />
                  {passworderror ? <p>{passworderror}</p> : null}
                </div>
                {userrole === 'Designer' ? (
                  <>
                    <button type="submit" className="submit-btn signup-btn">Create my Account</button>
                  </>
                ) : userrole === 'Customer' ? (
                  <>
                    <p>Fill out this form to create your account.</p>
                    <p>You can activate your <span className="color-white">subscription</span> and choose your monthly plan later in the dashboard.</p>
                    <br />
                    <button type="submit" disabled={isLoading} className="submit-btn signup-btn">
                      {isLoading ? 'Signing up...' : 'Signup'}
                    </button>
                  </>
                ) : (
                  <>
                    <p>no usertype data found</p>
                  </>
                )}
              </form>
              
            </div>
          </div>
          <p class="already-register">Already Registered? <a href='/login' className="login-redirect">Login</a></p>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loader.isLoading,
  };
};

const mapDispatchToProps = () => {
  return {
    signup,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);



