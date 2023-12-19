import React from "react";
import bomoLogo from './images/bomo-logo.svg'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./reduxdata/Reducer/userSlice";
const Sidebar = () => {

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
            <div className="">
                <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
                <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
                <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
                    <div className="list-group rounded-0 pt-5">
                        <a href="#" className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
                        <span className="ml-2">Home</span>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action border-0 align-items-center">
                        <span className="ml-2">Past Requests</span>
                        </a>
                        <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                            <span className="ml-2">Brand Profiles</span>
                        </a>
                        <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                            <span className="ml-2">Subscription</span>
                        </a>
                        <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                            <span className="ml-2">Members</span>
                        </a>
                        <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                            <span className="ml-2">Setting</span>
                        </a>
                        <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                            <span className="ml-2" onClick={handleLogout}>Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;