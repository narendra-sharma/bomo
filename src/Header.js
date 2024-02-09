import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import userImage from './images/user-img.png';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { get_designer_assigned_requestlist } from "./reduxdata/rootAction";
const Header = ({ user, userrole, totalassigns }) => {
  const [cuser, setCuser] = useState(user);
  const navigate =  useNavigate();
  const dispatch = useDispatch();

  let local = localStorage.getItem('userDetails');
  local = local ? JSON.parse(local) : null;

  useEffect(() => {
    setCuser(local);
  }, [local]);

  useEffect(() => {
    if(user?.role==='designer'){
      get_designer_assigned_requestlist(dispatch, user?.token);
    };
  }, [dispatch,user?.role]);

  return (
    <div className="ml-md-auto px-0 ms-md-auto rightside-wrapper">
      <nav className="px-60 py-3 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn py-0 d-lg-none" id="open-sidebar">
              <span className="toggle-btn"></span>
            </button>
            {(userrole !== 'Designer') ?<div className="mx-md-5">
              <h4 className="mb-0">
                {(userrole === 'customer_admin') ?<>{user?.company}
                 <span className="fw-bold"> Workspace</span></>:(userrole === 'Designer') ?'':'Super Admin Panel'
                 } 
              </h4>
            </div>
             : <>
            <div className="designer-header">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link>Intro SS23 campaign 
                    </Link>
                    <Button variant="unset" className="rounded-pill deliver-now-btn ms-2">Deliver in 01:12:33</Button>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link>Intro SS23 campaign 
                    </Link>
                    <Button variant="unset" className="rounded-pill deliver-now-btn ms-2">Deliver in 01:12:33</Button>
                  </div>
                </div>
              </div>
            
            </div>
            </>}
            <div className="d-flex text-right justify-content-between align-items-center">
              <img src={userImage} alt="Bomo logo" />
              <p className="mb-0 user-email ms-1 ms-lg-2">
                <b className="d-none d-md-block">{cuser?.name}</b>
                <span className="d-block">{(userrole === 'customer_admin') ?(cuser?.parent?'Admin': 'Customer') : userrole}</span>
                </p>
                {(userrole !== 'Designer') ? <div></div>:<>
                   <div className="header-request-btn position-relative">
                   <Button variant="unset" className="rounded-pill btn btn-outline-dark ms-2" onClick={() => {navigate('/acceptance-request')}}>Requests</Button>
                   <div className="request-count"><span className="counter-digit">{totalassigns}</span></div>
                   </div>
                </>}
                
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userrole: state.auth.role,
    totalassigns: state.requests.totalassigns,
  };
};

export default connect(mapStateToProps)(Header);
