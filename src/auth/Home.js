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
         <div className="App">
               {
                bomousers.map((ele,index)=>{
                    return (
                        <>
                         <button onClick={()=> Handleuser(ele)} key={index} style={{fontSize:'1rem'}}>{ele}</button>
                        </>
                    )
                })
               }
         </div>
        </>
    )
}
export default Bomohome;
