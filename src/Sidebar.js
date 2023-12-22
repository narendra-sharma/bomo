/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import bomoLogo from './images/bomo-logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "./reduxdata/rootAction";
const Sidebar = () => {
  const userrole = useSelector((state) => state.auth.role || '')
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('USERTYPE');
    dispatch(logout());
  }
  const [items,setItems]=useState([]);
  useEffect(()=>{
     let list=[];
     if(userrole==='Customer'){
      list=[
        {name:'Home',to:'/'},
        {name:'Active Requests',to:'/active-requests'},
        {name:'Past Requests',to:'/past-requests'},
        {name:'Brand Profiles',to:'/brand-profile'},
        {name:'Subscription',to:'/subscription'},
        {name:'Members',to:'/members'},
      ]
     }else if(userrole==='Designer'){
       list=[
        {name:'Home',to:'/'},
        {name:'Active Requests',to:'/active-requests'},
        {name:'Past Requests',to:'/past-requests'},
        {name:'Payments',to:'/payments'},
        {name:'Motion Tips',to:'/motion-tips'},
      ]
    }else{
      list=[
        {name:'Home',to:'/'},
        {name:'All Requests',to:'/all-requests'},
        {name:'Payments',to:'/payments'},
        {name:'Customers All',to:'/all-Customers'},
        {name:'Designers All',to:'/all-Designers'},
        {name:'Site EDIT',to:'/site-edit'},
      ]
     }
     setItems(list);
  },[userrole])
  return (
    <div>
      <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
      <div className="px-0 position-fixed h-100 bg-white shadow-sm sidebar d-flex justify-content-between flex-column  pb-5" id="sidebar">
        <div>
          <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
          <div className="list-group pt-5">
            {items.map(item=><Link to={item.to} key={item.name} className={'list-group-item list-group-item-action border-0 d-flex align-items-center '+(location.pathname===item.to && 'active')}>
              <span className="ml-2">{item.name}</span>
            </Link>)}
          </div>
        </div>
        <div className="list-group">
          <Link to="/setting" className={'list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center '+(location.pathname==='/setting' && 'active')}>
            <span className="ml-2">Settings</span>
          </Link>
          <Link className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
            <span className="ml-2" onClick={handleLogout}>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;