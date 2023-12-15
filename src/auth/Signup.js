import React from "react";
import React, { useState } from "react";
const Signup = () => {

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
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange}  className="form_control"/>
                       
                       </div>
                       <div class="form-group">
                        <label>
                            Email:</label>                          
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form_control"/>
                        </div>
                        <div class="form-group">
                        <label>
                            Company:</label>                            
                            <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="form_control"/>
                        </div>
                        <div class="form-group">
                        <label>
                            Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form_control"/>
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


