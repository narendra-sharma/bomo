import React from "react";

const Header = () => {
    
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