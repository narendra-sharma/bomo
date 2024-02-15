import React, { useState } from "react";
import visa from '../../images/visa.png';
const CardDetailShow = ({cardDetails,isDefault,setIsDefault}) => {
  
  return (
    <>
        {cardDetails && (
            <div className="row d-flex align-items-center border pt-2 mb-2 mx-1">
            <div className="col-2">
                <input type="checkbox" checked={isDefault} onChange={()=>setIsDefault(!isDefault)}/>
            </div>
            <div className="col-2">
                <img src={visa} />
            </div>
            <div className="col-8">
                <p><b>{cardDetails.brand} {cardDetails.last4}</b></p>
                <p>Expiry: {cardDetails.exp_month}/{cardDetails.exp_year}</p>
            </div> 
            </div>
        )}
        {isDefault && <div className="row d-flex align-items-center justtify-content-end mx-1 mb-2">
            <button type="button" onClick={()=>setIsDefault(!isDefault)}>Add New Card</button>
        </div>}
    </>
  )
}

export default CardDetailShow;
