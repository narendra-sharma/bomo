import React, { useState } from "react";
import { CardNumberElement } from '@stripe/react-stripe-js';
import BillingInfo from "../Sahred/BillingInfo";
import { toast } from "react-toastify";
import CardInfo from "../Sahred/CardInfo";
import { pay_now } from "../../reduxdata/PlansPayments/planActions";
import { useDispatch } from "react-redux";
const DoPayment = ({ stripe,elements,user,pieces, prize, save }) => {
  const dispatch=useDispatch();
  const [card, setCard] = useState({
    name:user?.address?user?.address?.name:'',
    surname:user?.address?user?.address?.surname:'',
    company:user?.address?user?.address?.company:'',
    address:user?.address?user?.address?.address:'',
    city:user?.address?user?.address?.city:'',
    postalCode:user?.address?user?.address?.postalCode:'',
    country:user?.address?user?.address?.country:'',
    vatNumber:user?.address?user?.address?.vatNumber:''
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
    const { error, token } = await stripe.createToken(cardElement, {
      name: card.name,
      address_line1: card.address,
      address_line2: card.address,
      address_city: card.city,
      address_zip: card.postalCode,
      address_country: card.country,
    });
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
      let err=false;
      for(let i=output.length-1;i>-1;i--){
        if(!output[i].value && (output.key!=='surname')){
          err=true;
          await handleCardElementChange(output[i].value,output[i].key);
        }
      };
      if(err){
        return false;
      }
      const data={
        user_id:user._id,
        email:user.email,
        quantity:pieces,
        cardToken:token.id,
        ...card
      };
      pay_now(user.token,token,data,dispatch);
    }
  };
  return (
    <>
      <h2>Payment</h2>
      <form className="form" onSubmit={handleSubmit}>
      <div className="pt-4 pb-4 do-payment">
        <div className="row align-items-center ms-lg-auto px-lg-5 px-2">
          <div className="col-md-7">
              <div className="row">
                <CardInfo errors={errors} handleCardElementChange={(e,label)=>handleCardElementChange(e,label)}/>
                <BillingInfo card={card} errors={errors} handleCardElementChange={(e,label)=>handleCardElementChange(e,label)}/>
              </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">Subscription of {pieces} pieces per month</p><span className="subscription-total">${prize + save}</span>
            </div>
            {(save > 0) && <div className="d-flex align-items-center justify-content-between mt-2">
              <p className="mb-0">{((save/(prize+save))*100).toFixed(0)}% saving vs the basic plan</p><span className="light-green"><del>${save}</del></span>
            </div>}
            <div className="d-flex align-items-center justify-content-between mt-5">
              <p className="mb-0">Total</p><span className="subscription-total grand-total">${prize}</span>
            </div>
            <div className="hr-line mt-3 mb-4"></div>
            <div className="d-flex align-items-center justify-content-end">
              <button type="submit" className="btn pay-now rounded px-5 mt-3" disabled={!stripe || !elements}>Pay Now</button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  )
}

export default DoPayment;