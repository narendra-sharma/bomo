import React from "react";
import { useNavigate } from "react-router-dom";

const Bomohome = () => {
    const navigate = useNavigate();
    const bomousers = ['SuperAdmin', 'Customer', 'Designer'];

    const Handleuser = (usertype) => {
        navigate(`/login`);
    }
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
