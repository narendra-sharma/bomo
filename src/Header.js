import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import userImage from './images/user-img.png';

const Header = ({user,userrole}) => {
    const [cuser,setCuser]=useState(null);
    useEffect(()=>{
        setCuser(user);
    },[user,userrole])
    return(
        <div className=" ml-md-auto px-0 ms-md-auto rightside-wrapper">
          <nav className="w-100 d-flex px-60 py-3 justify-content-between align-items-center bg-white">
          <button className="btn py-0 d-lg-none" id="open-sidebar">
           <span className="toggle-btn"></span>
          </button>
              <div className="mx-md-2 mx-lg-5">
                  <h4 className="mb-0">Cratat <span className="fw-bold">Workspace</span></h4>
              </div>
              <div className="d-flex text-right justify-content-between align-items-center">
              <img src={userImage} alt="Bomo logo" />
                  <p className="mb-0 user-email  ms-1 ms-lg-2"><b className="d-none d-md-block">{cuser?.name}</b>
                      <span className="d-block">{userrole}</span></p>
              </div>
          </nav>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user:state.auth.user,
        userrole:state.auth.role,
    };
};


export default connect(mapStateToProps, null)(Header);