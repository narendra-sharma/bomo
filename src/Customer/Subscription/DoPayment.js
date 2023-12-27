import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement,CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';
import BillingInfo from "./BillingInfo";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const { STRIPE_PUBLIC_KEY } = process.env;
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const DoPayment = ({ stripe,elements,pieces, prize, save }) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({
    name:'',
    surname:'',
    company:'',
    address:'',
    city:'',
    postalCode:'',
    country:'',
    vatNumber:''
  });
  const [errors, setErrors] = useState({
    cardNumber:'',
    cardExpiry:'',
    cardCvc:'',
    name:'',
    company:'',
    address:'',
    city:'',
    postalCode:'',
    country:'',
    vatNumber:''
  });
  // const stripe = useStripe();
  // const elements = useElements();
  const handleCardElementChange = (event,label) => {
    console.log(event,label);
    switch(label){
      case 'cardNumber':
        if(event.empty){
          setErrors({...errors,cardNumber:'Card Number is required'})
        }else if(event.error){
          setErrors({...errors,cardNumber:event.error.message})
        }else{
          setErrors({...errors,cardNumber:''})
        }
        break;
      case 'cardExpiry':
        if(event.empty){
          setErrors({...errors,cardExpiry:'Card Expiry is required'})
        }else if(event.error){
          setErrors({...errors,cardExpiry:event.error.message})
        }else{
          setErrors({...errors,cardExpiry:''})
        }
        break;
      case 'cardCvc':
        if(event.empty){
          setErrors({...errors,cardCvc:'Card CVC is required'})
        }else if(event.error){
          setErrors({...errors,cardCvc:event.error.message})
        }else{
          setErrors({...errors,cardCvc:''})
        }
        break;
      case 'name':
        if(!event){
          setErrors({...errors,name:{type:'required'}})
        }else{
          setErrors({...errors,name:''})
        }
        setCard({...card,name:event});
        break;
      case 'surname':
        setCard({...card,surname:event});
      case 'company':
        if(!event){
          setErrors({...errors,company:{type:'required'}})
        }else{
          setErrors({...errors,company:''})
        }
        setCard({...card,company:event});
        break;
      case 'address':
        if(!event){
          setErrors({...errors,address:{type:'required'}})
        }else{
          setErrors({...errors,address:''})
        }
        setCard({...card,address:event});
        break;
      case 'city':
        if(!event){
          setErrors({...errors,city:{type:'required'}})
        }else{
          setErrors({...errors,city:''})
        } 
        setCard({...card,city:event});  
        break;
      case 'postalCode':
        if(!event){
          setErrors({...errors,postalCode:{type:'required'}})
        }else{
          setErrors({...errors,postalCode:''})
        }
        setCard({...card,postalCode:event});
        break;
      case 'country':
        if(!event){
          setErrors({...errors,country:{type:'required'}})
        }else{
          setErrors({...errors,country:''})
        }
        setCard({...card,country:event});
      case 'vatNumber':
        if(!event){
          setErrors({...errors,vatNumber:{type:'required'}})
        }else{
          setErrors({...errors,vatNumber:''})
        } 
        setCard({...card,vatNumber:event});  
        break;
      default:
        break;      
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrors('');
    
    const cardElement = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      let err={
        error:{message:error.message}
      }
      if(error?.code.includes('number')){
        handleCardElementChange(err,'cardNumber')
      }else if(error?.code.includes('expiry')){
        handleCardElementChange(err,'cardExpiry')
      }else if(error?.code.includes('cvc')){
        handleCardElementChange(err,'cardCvc')
      }else{
        toast.error(error.message);
      }
    } else {
      const output = Object.entries(card).map(([key, value]) => ({key,value}));
      output.forEach((r) =>{
        console.log(r);
        handleCardElementChange(r.value,r.key)
      });
    }
  };
 const getElementError=()=>{
  const output = Object.entries(errors).map(([key, value]) => value);
  let err=output.filter(r=>r?true:false);
  return err;
 }
  return (
    <>
      <h2><span className="subscription-heading">Payment</span> </h2>
      <form className="form" onSubmit={handleSubmit}>
      <div className="pt-5 pb-4">
        <div className="row align-items-center ms-lg-auto">
          <div className="col-md-6">
            
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="cc-number">Card Number</label>
                    <CardNumberElement
                      id="cc-number"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardNumber')}
                    />
                    {errors.cardNumber &&
                      <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                        {errors.cardNumber}
                      </p>
                    }
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="expiry">Card Expiry</label>
                    <CardExpiryElement
                      id="expiry"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardExpiry')}
                    />
                    {errors.cardExpiry &&
                      <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                        {errors.cardExpiry}
                      </p>
                    }
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cvc">CVV</label>
                    <CardCvcElement
                      id="cvc"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardCvc')}
                    />
                    {errors.cardCvc &&
                      <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                        {errors.cardCvc}
                      </p>
                    }
                  </div>
                </div>
                <BillingInfo card={card} errors={errors} handleCardElementChange={(e,label)=>handleCardElementChange(e,label)}/>
              </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">Subscription of {pieces} pieces per month</p><span className="subscription-total">${prize + save}</span>
            </div>
            {(save > 0) && <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">12% saving vs the basic plan</p><span>${save}</span>
            </div>}
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">Total</p><span className="subscription-total">${prize}</span>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-end">
              <button type="submit" className="btn update-btn rounded-pill px-5 fw-bold" disabled={!stripe || !elements}>Play Now</button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  )
}

export default DoPayment;