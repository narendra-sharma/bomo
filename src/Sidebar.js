import React from "react";
import bomoLogo from './images/bomo-logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "./reduxdata/Actions/authActions";
const Sidebar = () => {

    const userrole = useSelector((state) => state.auth.role || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        window.location.reload();
        navigate('/login');
        localStorage.removeItem('LoginuserDetails');
        dispatch(logOut());
    }

    const handleRequest = () => {
        navigate('/past-requests')
    }

    const handleProfile = () => {
        navigate('/brand-profile')
    }

    const handleSubscription = () => {
        navigate('/subscription')
    }

    const handleMembers = () => {
        navigate('/members')
    }

    const handleSetting = () => {
        navigate('/setting')
    }

    const handleActive = () => {
        navigate('/active-requests')
    }

    const handleMotion = () => {
        navigate('/motion-tips')
    }

    const handleCustomers = () => {
        navigate('/all-Customers')
    }

    const handleDesigners = () => {
        navigate('/all-Designers')
    }

    const handleSideEdit = () => {
        navigate('/site-edit')
    }

    return (
        <>
            {userrole === 'Customer' ? (<>
                <div className="">
                    <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
                        <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar d-flex justify-content-between flex-column  pb-5" id="sidebar">
                            <div>
                                <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
                                <div className="list-group pt-5">
                                    <a href='/' className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
                                        <span className="ml-2">Home</span>
                                    </a>
                                    <a onClick={handleRequest} className="list-group-item list-group-item-action border-0 align-items-center">
                                        <span className="ml-2">Past Requests</span>
                                    </a>
                                    <a onClick={handleProfile} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                        <span className="ml-2">Brand Profiles</span>
                                    </a>
                                    <a onClick={handleSubscription} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                        <span className="ml-2">Subscription</span>
                                    </a>
                                    <a onClick={handleMembers} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                        <span className="ml-2">Members</span>
                                    </a>
                                </div>
                            </div>
                            <div className="list-group">
                                <a onClick={handleSetting} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                    <span className="ml-2">Settings</span>
                                </a>
                                <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                    <span className="ml-2" onClick={handleLogout}>Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                
            </>) : userrole === 'Designer' ? <>
                <div className="">
                    <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
                    <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
                        <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
                        <div className="list-group rounded-0 pt-5">
                            <a href='/' className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
                                <span className="ml-2">Home</span>
                            </a>
                            <a onClick={handleActive} className="list-group-item list-group-item-action border-0 align-items-center">
                                <span className="ml-2">Active Requests</span>
                            </a>
                            <a onClick={handleRequest} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Past Requests</span>
                            </a>
                            <a onClick={handleSubscription} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Payments</span>
                            </a>
                            <a onClick={handleMotion} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Motion Tips</span>
                            </a>

                            <a href="#" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                                <span className="ml-2">Setting</span>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                                <span className="ml-2" onClick={handleLogout}>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </> : userrole === 'SuperAdmin' ? <>
                <div className="">
                    <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
                    <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
                        <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
                        <div className="list-group rounded-0 pt-5">
                            <a href='/' className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
                                <span className="ml-2">Home</span>
                            </a>
                            <a onClick={handleActive} className="list-group-item list-group-item-action border-0 align-items-center">
                                <span className="ml-2">All Requests</span>
                            </a>
                            <a onClick={handleRequest} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Payments</span>
                            </a>
                            <a onClick={handleCustomers} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Customers ALL</span>
                            </a>
                            <a onClick={handleDesigners} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Designers ALL</span>
                            </a>
                            <a onClick={handleSideEdit} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Site EDIT</span>
                            </a>
                            <a onClick={handleSetting} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2">Settings</span>
                            </a>
                            <a className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                                <span className="ml-2" onClick={handleLogout}>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </> : <>
                <p>no data found</p>
            </>}
        </>
    )
}

export default Sidebar;