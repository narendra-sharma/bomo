import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import bomowhiteLogo from "../images/logo-provisional.png";
import { set_user_type } from "../reduxdata/User/userActions";

const Bomohome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bomousers = ["Super admin", "customer_admin", "Designer"];
  const Handleuser = (usertype) => {
    dispatch(set_user_type(usertype));
    navigate("/login");
    localStorage.setItem("USERTYPE", JSON.stringify(usertype));
  };
  return (
    <>
      <div className="Home-screen text-center">
        <div className="container">
          <div className="mb-5">
            <img src={bomowhiteLogo} alt="Bomo logo" />
          </div>
          {bomousers.map((ele, index) => {
            return (
              <button
                key={ele}
                onClick={() => Handleuser(ele)}
                className="Home-button rounded"
              >
                {ele}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Bomohome;
