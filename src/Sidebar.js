/* eslint-disable no-unreachable */
import React from "react";
import bomoLogo from './images/bomo-logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "./reduxdata/User/userActions";

const Sidebar = () => {

  const userrole = useSelector((state) => state.auth.role || '')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.reload();
    navigate('/');
    localStorage.removeItem('LoginuserDetails');
    dispatch(logOut());
  }

  return (
    <>
      {userrole === 'Customer' ?
        <div>
          <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
          <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar d-flex justify-content-between flex-column  pb-5" id="sidebar">
            <div>
              <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
              <div className="list-group pt-5">
                <Link to="/" className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
                  <span className="ml-2">Home</span>
                </Link>
                <Link to="/past-requests" className="list-group-item list-group-item-action border-0 align-items-center">
                  <span className="ml-2">Past Requests</span>
                </Link>
                <Link to="/brand-profile" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                  <span className="ml-2">Brand Profiles</span>
                </Link>
                <Link to="/subscription" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                  <span className="ml-2">Subscription</span>
                </Link>
                <Link to="/members" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                  <span className="ml-2">Members</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="list-group">
            <Link to="/setting" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
              <span className="ml-2">Settings</span>
            </Link>
            <Link className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
              <span className="ml-2" onClick={handleLogout}>Logout</span>
            </Link>
          </div>
        </div>
        : userrole === 'Designer' ?
          <div>
            <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
            <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
              <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
              <div className="list-group rounded-0 pt-5">
                <Link to="/" className="list-group-item list-group-item-action active border-0 d-flex align-items-center" >
                  <span className="ml-2">Home</span>
                </Link>
                <Link to="/active-requests" className="list-group-item list-group-item-action border-0 align-items-center" >
                  <span className="ml-2">Active Requests</span>
                </Link>
                <Link to="/past-requests" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                  <span className="ml-2">Past Requests</span>
                </Link>
                <Link to="/payments" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                  <span className="ml-2">Payments</span>
                </Link>
                <Link to="/motion-tips" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                  <span className="ml-2">Motion Tips</span>
                </Link>
                <Link to="/setting" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                  <span className="ml-2">Settings</span>
                </Link>
                <Link className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                  <span className="ml-2" onClick={handleLogout}>Logout</span>
                </Link>
              </div>
            </div>
          </div>
          : userrole === 'SuperAdmin' ?
            <div>
              <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
              <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
                <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
                <div className="list-group rounded-0 pt-5">
                  <Link to="/" className="list-group-item list-group-item-action active border-0 d-flex align-items-center" >
                    <span className="ml-2">Home</span>
                  </Link>
                  <Link to="/active-requests" className="list-group-item list-group-item-action active border-0 d-flex align-items-center" >
                    <span className="ml-2">All Requests</span>
                  </Link>
                  <Link to="/payments" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                    <span className="ml-2">Payments</span>
                  </Link>
                  <Link to="/all-Customers" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                    <span className="ml-2">Customers ALL</span>
                  </Link>
                  <Link to="/all-Designers" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                    <span className="ml-2">Designers ALL</span>
                  </Link>
                  <Link to="/site-edit" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                    <span className="ml-2">Site EDIT</span>
                  </Link>
                  <Link to="/setting" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse" >
                    <span className="ml-2">Settings</span>
                  </Link>
                  <Link className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
                    <span className="ml-2" onClick={handleLogout}>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
            :
            <div>
              <p>no data found</p>
            </div>
      }
    </>
  )
}

export default Sidebar;