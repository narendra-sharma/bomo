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
            <div className="border py-3 mb-2  px-2 mb-4 rounded">
                <div className="row d-flex align-items-center">
                    <div className="col-1">
                        <input type="checkbox" checked={isDefault} onChange={()=>setIsDefault(!isDefault)}/>
                    </div>
                    <div className="col-10">
                        <p className="mb-0"><b>{cardDetails.brand} {cardDetails.last4}</b></p>
                        <p className="mb-0">Expiry: {cardDetails.exp_month}/{cardDetails.exp_year}</p>
                    </div> 
                </div>
         </div>
        )}
        {isDefault && <div className="row d-flex align-items-center justtify-content-end mx-1 mb-2 status-btn">
            <button type="button" onClick={()=>setIsDefault(!isDefault)} className="w-auto new-request rounded-pill btn border rounded-pill pause-btn">Add New Card</button>
        </div>}
    </>
  )
}

export default CardDetailShow;
