import React, { useState } from "react";

const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: ''
    });
    const [nameerror, setNameerror] = useState(null);
    const [emailerror, setEmailerror] = useState(null);
    const [passworderror, setPassworderror] = useState(null);
    const [companyerror, setCompanyerror] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if (formData.name = '') {
            setNameerror('Name is Required*');
        } else {
            setNameerror(null)
        }

        if (formData.email = '') {
            setEmailerror('Email is Required*');
        } else {
            setEmailerror(null)
        }

        if (formData.password = '') {
            setPassworderror('Password is Required*');
        } else {
            setPassworderror(null)
        }

        if (formData.company = '') {
            setCompanyerror('Company is Required*');
        } else {
            setCompanyerror(null)
        }
    };
    return (
        <>
            <h2>Create Your Account !</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Company:
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <br />
                <p>Fill out this form to create your account.</p>
                <p>You can activate your subscription and choose your monthly plan later in the dashboard.</p>
                <br />
                <button type="submit">Signup</button>
            </form>
            <p>Already Registered? <a href="/login">Login</a></p>
        </>
    )
}

export default Signup;
