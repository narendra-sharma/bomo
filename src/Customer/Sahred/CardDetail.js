import React, { useState } from "react";
import visa from '../../images/visa.png';
import stripe from '../../images/stripe.png';
import paypal from '../../images/paypal.png';
import oro from '../../images/oro.png';
import gpay from '../../images/gpay.png';
const CardDetailShow = ({cardDetails,isDefault,setIsDefault}) => {
  const arr=[visa,gpay,paypal,oro,stripe];
  return (
    <>
        <div className="d-flex align-items-center mb-2">
            {arr.map((r,i)=><img key={i} src={r} className="me-1"/>)}
        </div>
        {cardDetails && (
            <div className="row d-flex align-items-center border pt-2 mb-2 mx-1">
            <div className="col-2">
                <input type="checkbox" checked={isDefault} onChange={()=>setIsDefault(!isDefault)}/>
            </div>
            <div className="col-10">
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
