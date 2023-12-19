import React from "react";
import { useNavigate } from "react-router-dom";
import { setUserType } from "../reduxdata/Actions/authActions";
import { useDispatch } from "react-redux";
import bomowhiteLogo from '../images/logo-provisional.png';

const Bomohome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bomousers = ['SuperAdmin', 'Customer', 'Designer'];

    const Handleuser = (usertype) => {
        dispatch(setUserType(usertype));
        navigate('/login');
        localStorage.setItem('USERTYPE',JSON.stringify(usertype));
    };
    return(
        <>
         <div className="Home-screen text-center">
            <div className="container">
              <div className="mb-5"><img src={bomowhiteLogo} alt="Bomo logo" /></div>
               {
                bomousers.map((ele,index)=>{
                    return (
                        <>
                         <button onClick={()=> Handleuser(ele)} key={index} className="Home-button">{ele}</button>
                        </>
                    )
                })
               }
            </div>
         </div>
        </>
    )
}
export default Bomohome;
