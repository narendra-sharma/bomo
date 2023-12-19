import React from "react";
import { useSelector } from "react-redux";

const Header = ({usertype}) => {

    const userrole = useSelector((state) => state.auth.role || '')

    // const typeuser = localStorage.getItem('USERTYPE');
    // const checkusertype = JSON.parse(typeuser);
    const userdetails = localStorage.getItem('LoginuserDetails')
    const usertypecheck = JSON.parse(userdetails);

    
    return(
        <div className="col-md-9 col-lg-10 ml-md-auto px-0 ms-md-auto">
          <nav className="w-100 d-flex px-100 py-3 justify-content-between items-content-center bg-white">
              <div className="mx-5">
                  <h4>Cratat <span className="fw-bold">Workspace</span></h4>
              </div>
              <div className="text-right">
                  <p className="pb-0"><b>{usertypecheck.email}</b>
                      <span className="d-block">{userrole}</span></p>
              </div>
          </nav>
        </div>
    )
}
export default Header;