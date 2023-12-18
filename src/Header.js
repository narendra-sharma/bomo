import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./reduxdata/Reducer/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        window.location.reload();
        localStorage.removeItem('userDetails');
        dispatch(logout());
        navigate('/login');
    }
    
    return(
        <>
         <div className="App">
               Header <br/>
               <button onClick={handleLogout}>Logout</button>
         </div>
        </>
    )
}
export default Header;