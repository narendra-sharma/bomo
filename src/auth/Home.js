import React from "react";
import { useNavigate } from "react-router-dom";
import { setUserType } from "../reduxdata/Actions/authActions";
import { useDispatch } from "react-redux";

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
         <div className="Home-screen">
            <div className="container">
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
