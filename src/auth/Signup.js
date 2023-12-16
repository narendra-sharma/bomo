import React, { useState } from "react";
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div className="signup-form">
            <div className="container">
                <div class="signup-content">
                    <div className="form-heading">
                    <h2>It’s time 
                        <span class="d-block">to step up   </span>
                        <span class="d-block">MOTION</span>
                         </h2>
                    </div>
                    <div>
                    <form onSubmit={handleSubmit}  className="form-inner">
                        <div class="form-group">
                        <label>
                            Name:</label>
                            <input type="text" placeholder="Your full name here. You can add members later"  name="name" value={formData.name} onChange={handleInputChange}  className="form_control"/>
                       
                       </div>
                       <div class="form-group">
                        <label>
                            Email:</label>                          
                            <input type="email" name="email"  placeholder="Your company email here" value={formData.email} onChange={handleInputChange} className="form_control"/>
                        </div>
                        <div class="form-group">
                        <label>
                            Company:</label>                            
                            <input type="text" name="company" placeholder="Your company name here" value={formData.company} onChange={handleInputChange} className="form_control"/>
                        </div>
                        <div class="form-group">
                        <label>
                            Password:</label>
                            <input type="password" name="password" placeholder="Choose your own password" value={formData.password} onChange={handleInputChange} className="form_control"/>
                        </div>
                      
                        <p>Fill out this form to create your account.</p>
                        <p>You can activate your <span class="color-white">subscription</span> and choose your monthly plan later in the dashboard.</p>
                        <br />
                        <button type="submit" className="submit-btn signup-btn">Signup</button>
                    </form>
                    <p class="already-register">Already Registered? <a href="/login" class="login-redirect">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup;


