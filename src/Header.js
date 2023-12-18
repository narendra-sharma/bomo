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
        <div className="col-md-9 col-lg-10 ml-md-auto px-0 ms-md-auto">
          <nav className="w-100 d-flex px-100 py-3 justify-content-between items-content-center bg-white">
              <div className="mx-5">
                  <h4>Cratat <span className="fw-bold">Workspace</span></h4>
              </div>
              <div className="text-right">
                  <p className="pb-0"><b>Juanito Bosset</b>
                      <span className="d-block">Admin</span></p>
              </div>
          </nav>
        </div>
    )
}
export default Header;