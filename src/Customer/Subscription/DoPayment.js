import React, { useState } from "react";
import { CardNumberElement } from '@stripe/react-stripe-js';
import BillingInfo from "../Sahred/BillingInfo";
import { toast } from "react-toastify";
import CardInfo from "../Sahred/CardInfo";
import { pay_now } from "../../reduxdata/Plans/planActions";
import { useDispatch } from "react-redux";
const DoPayment = ({ stripe,elements,user,pieces, prize, save }) => {
  const dispatch=useDispatch();
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
  const handleCardElementChange = (event,label) => {
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
        break;
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
        break;
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
      for(let i=output.length-1;i>-1;i--){
        if(!output[i].value){
          handleCardElementChange(output[i].value,output[i].key);
        }
      };
      let err=false;
      const errOutput = Object.entries(errors).map(([key, value]) => ({key,value}));
      err=errOutput.find(r=>r.value?true:false);
      if(err){
        return false;
      }
      const data={
        user_id:user._id,
        pieces:pieces,
        ...card
      };
      pay_now(token,data,dispatch);
    }
  };
  return (
    <>
      <h2><span className="subscription-heading">Payment</span> </h2>
      <form className="form" onSubmit={handleSubmit}>
      <div className="pt-5 pb-4">
        <div className="row align-items-center ms-lg-auto">
          <div className="col-md-6">
              <div className="row">
                <CardInfo errors={errors} handleCardElementChange={(e,label)=>handleCardElementChange(e,label)}/>
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