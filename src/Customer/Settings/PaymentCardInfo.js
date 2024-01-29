import React, { useState } from "react";
import CardInfo from "../Sahred/CardInfo";
import { Elements, ElementsConsumer, CardNumberElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const {REACT_APP_STRIPE_PUBLIC_KEY}=process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentCardInfo = () => {
  const [cardFeilds,setCardFeilds]=useState({
    cardNumber:true,
    cardExpiry:true,
    cardCvc:true,
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const handleCardElementChange = (event, label) => {
    switch (label) {
      case 'cardNumber':
        if (event.empty) {
          setErrors({ ...errors, cardNumber: 'Card Number is required' })
        } else if (event.error) {
          setErrors({ ...errors, cardNumber: event.error.message })
        } else {
          setErrors({ ...errors, cardNumber: '' })
        }
        break;
      case 'cardExpiry':
        if (event.empty) {
          setErrors({ ...errors, cardExpiry: 'Card Expiry is required' })
        } else if (event.error) {
          setErrors({ ...errors, cardExpiry: event.error.message })
        } else {
          setErrors({ ...errors, cardExpiry: '' })
        }
        break;
      case 'cardCvc':
        if (event.empty) {
          setErrors({ ...errors, cardCvc: 'Card CVC is required' })
        } else if (event.error) {
          setErrors({ ...errors, cardCvc: event.error.message })
        } else {
          setErrors({ ...errors, cardCvc: '' })
        }
        break;
      default:
        break;
    }
  };
  const checkAllErrors=()=>{
    let err=false;
    let output = Object.entries(cardFeilds)
    output.forEach(([key, value]) =>{
      if(value){
        err=true;
        setErrors((prevErrors) => (
          { ...prevErrors,
            [key]:key==='cardNumber'?(prevErrors.cardNumber?prevErrors.cardNumber:'Card Number is required')
            :key==='cardExpiry'?(prevErrors.cardExpiry?prevErrors.cardExpiry:'Card Expiry is required')
            :(prevErrors.cardCvc?prevErrors.cardCvc:'Card CVC is required')
          }
        ))
      }else{
        setCardFeilds((prevErrors) => ({ ...prevErrors,[key]:false}))
      }
    });
    return err
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || checkAllErrors()) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(cardElement);
    if (error) {
      let err = {
        error: { message: error.message }
      }
      if (error?.code.includes('number')) {
        handleCardElementChange(err, 'cardNumber')
      } else if (error?.code.includes('expiry')) {
        handleCardElementChange(err, 'cardExpiry')
      } else if (error?.code.includes('cvc')) {
        handleCardElementChange(err, 'cardCvc')
      } else {
        toast.error(error.message);
      }
    } else {
      
    }
  };
  return (
    <>
      <div className="mb-3">
        <h3>Payment info</h3>
      </div>
      <div className="bg-white billing-form payment-info pt-3 py-5 rounded">
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form className="form" onSubmit={handleSubmit}>
                <div className="text-end">
                  <button type="submit" className="border-0 bg-transparent mx-3 text-muted">edit</button>
                </div>

                <div className="px-60">
                  <div className="row">
                    <CardInfo stripe={stripe} elements={elements} errors={errors} handleCardElementChange={(e, label) => handleCardElementChange(e, label)} />
                  </div>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  )
}

export default PaymentCardInfo;
