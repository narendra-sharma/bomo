/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import bomoLogo from './images/bomo-logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isSubscription, logout } from "./reduxdata/rootAction";
import Logout from "./Modals/Logout";
const Sidebar = () => {
  const userrole = useSelector((state) => state.auth.role || '');
  const user = useSelector((state) => state.auth.user || '')
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('USERTYPE');
    dispatch(logout());
  }
  const [items, setItems] = useState([]);
  const [isSubscribe,setIsSubscribe]=useState(false);
  const getSubscription=async()=>{
    await isSubscription(user).then(r=>{
      if(!r && (userrole === 'Customer')){
        navigate('/subscription');
      }
       setIsSubscribe(r);
    });
  }
  useEffect(()=>{
    getSubscription();
  },[]);
  useEffect(() => {
    let list = [];
    if (userrole === 'Customer') {
      list = [
        { name: 'Home', to: '/' },
        { name: 'Past Requests', to: '/past-requests' },
        { name: 'Brand Profiles', to: '/brand-profile' },
        { name: 'Subscription', to: '/subscription' },
        { name: 'Members', to: '/members' },
      ]
    } else if (userrole === 'Designer') {
      list = [
        { name: 'Home', to: '/' },
        { name: 'Active Requests', to: '/active-requests' },
        { name: 'Past Requests', to: '/past-requests' },
        { name: 'Payments', to: '/payments' },
        { name: 'Motion Tips', to: '/motion-tips' },
      ]
    } else {
      list = [
        { name: 'Home', to: '/' },
        { name: 'All Requests', to: '/all-requests' },
        { name: 'Payments', to: '/payments' },
        { name: 'Customers All', to: '/all-Customers' },
        { name: 'Designers All', to: '/all-Designers' },
        { name: 'Site EDIT', to: '/site-edit' },
      ]
    }
    setItems(list);
    let time = localStorage.getItem('time') || 0;
    time = new Date(time).getTime();
    const n = new Date().getTime();
    console.log(isSubscribe);
    location.pathname = ((userrole === 'Customer') && !isSubscribe)?'/subscription':((n - time) < 1500) ? localStorage.getItem('path') : '/';
    navigate(location.pathname);
  }, [userrole,isSubscribe])

  const [show, setShow] = useState(false);
  return (
    <div>
      <div id="sidebar-overlay" className="overlay w-100 vh-100 position-fixed d-none"></div>
      <div className="px-0 position-fixed h-100 bg-white shadow-sm sidebar d-flex justify-content-between flex-column  pb-5" id="sidebar">
        <div>
          <div className="text-center pt-3"><img src={bomoLogo} alt="Bomo logo" /></div>
          <div className="list-group pt-5">
            {items.map(item => <Link to={`${(userrole === 'Customer') && (!isSubscribe && (item.name!=='Subscription') ? '#':item.to)}`} key={item.name} className={`list-group-item list-group-item-action border-0 d-flex align-items-center ${(location.pathname === item.to ? 'active':'')} ${(userrole === 'Customer') && !isSubscribe && (item.name!=='Subscription') ?'disable':''}`}>
              <span className="ml-2">{item.name}</span>
            </Link>)}
          </div>
        </div>
        <div className="list-group">
          <Link to="/setting" className={'list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center ' + (location.pathname === '/setting' && 'active')}>
            <span className="ml-2">Settings</span>
          </Link>
          <Link className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" onClick={() => setShow(true)}>
            <span className="ml-2">Logout</span>
          </Link>
        </div>
      </div>
      <Logout show={show} handleClose={() => setShow(false)} logout={() => handleLogout()} />
    </div>
  )
}

export default Sidebar;