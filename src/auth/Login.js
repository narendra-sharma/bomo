import React from "react";

const Login = () => {
    return (
        <>
          <div className="signup-form">
            <div className="container">
                <div class="signup-content">
                    <div className="form-heading">
                    <h2>Login
                        
                         </h2>
                    </div>
                    <div>
                    <form  className="form-inner">
                       
                       <div class="form-group">
                        <label>
                            Email:</label>                          
                            <input type="email" name="email" placeholder="Your company email here" className="form_control"/ >
                        </div>
                        
                        <div class="form-group">
                        <label>
                            Password:</label>
                            <input type="password" name="password"  placeholder="|" className="form_control"/>
                        </div>
                      
                        <button type="submit" className="submit-btn signup-btn mt-150">Login</button>
                    </form>
                    <p class="already-register">Don’t have an account? <a href="/signup" class="login-redirect">signup</a></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Login;