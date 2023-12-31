import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import userImage from './images/user-img.png';

const Header = ({ user, userrole }) => {
  const [cuser, setCuser] = useState(user);

  let local = localStorage.getItem('userDetails');
  local = local ? JSON.parse(local) : null;

  useEffect(() => {
    setCuser(local);
  }, [local]);

  return (
    <div className="ml-md-auto px-0 ms-md-auto rightside-wrapper">
      <nav className="px-60 py-3 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn py-0 d-lg-none" id="open-sidebar">
              <span className="toggle-btn"></span>
            </button>
            <div className="mx-lg-5">
              <h4 className="mb-0">{(userrole === 'customer_admin') ?<>{user?.company} <span className="fw-bold">Workspace</span></>:(userrole === 'Designer') ?'':'Super Admin Panel'} </h4>
            </div>
            <div className="d-flex text-right justify-content-between align-items-center">
              <img src={userImage} alt="Bomo logo" />
              <p className="mb-0 user-email ms-1 ms-lg-2">
                <b className="d-none d-md-block">{cuser?.name}</b>
                <span className="d-block">{(userrole === 'customer_admin') ? 'Customer' : userrole}</span>
              </p>
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
  };
};

export default connect(mapStateToProps)(Header);
