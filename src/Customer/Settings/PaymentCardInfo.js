import React, { useEffect, useState } from "react";
import CardInfo from "../Sahred/CardInfo";
import { Elements, ElementsConsumer, CardNumberElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import CardDetailShow from "../Sahred/CardDetail";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { add_change_card } from "../../reduxdata/rootAction";
import { PAY_NOW } from "../../reduxdata/PlansPayments/planTypes";
const {REACT_APP_STRIPE_PUBLIC_KEY}=process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentCardInfo = ({cards,user,isPay}) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [stripeData, setStripeData] = useState(null);
  const [stripeElements, setStripeElements] = useState(null);
  const dispatch=useDispatch();
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
        if(event.empty){
          setErrors({...errors,cardNumber:'Card Number is required'})
          setCardFeilds({...cardFeilds,cardNumber:true})
        }else if(event.error){
          setErrors({...errors,cardNumber:event.error.message})
          setCardFeilds({...cardFeilds,cardNumber:true})
        }else{
          setErrors({...errors,cardNumber:''})
          setCardFeilds({...cardFeilds,cardNumber:false})
        }
        break;
      case 'cardExpiry':
        if(event.empty){
          setErrors({...errors,cardExpiry:'Card Expiry is required'})
          setCardFeilds({...cardFeilds,cardExpiry:true})
        }else if(event.error){
          setErrors({...errors,cardExpiry:event.error.message})
          setCardFeilds({...cardFeilds,cardExpiry:true})
        }else{
          setErrors({...errors,cardExpiry:''})
          setCardFeilds({...cardFeilds,cardExpiry:false})
        }
        break;
      case 'cardCvc':
        if(event.empty){
          setErrors({...errors,cardCvc:'Card CVC is required'})
          setCardFeilds({...cardFeilds,cardCvc:true})
        }else if(event.error){
          setErrors({...errors,cardCvc:event.error.message})
          setCardFeilds({...cardFeilds,cardCvc:true})
        }else{
          setErrors({...errors,cardCvc:''})
          setCardFeilds({...cardFeilds,cardCvc:false})
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
    if (!stripeData || !stripeElements || checkAllErrors()) {
      return;
    }
    const cardElement = stripeElements.getElement(CardNumberElement);
    const { error, token } = await stripeData.createToken(cardElement);
    console.log(error);
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
      add_change_card(user?.token,token,dispatch);
    }
  };
  useEffect(()=>{
    if(cards){
      setCardDetails(cards);
      setIsDefault(true);
    }
  },[cards])
  useEffect(()=>{
    if(isPay){
      dispatch({
        type: PAY_NOW
      })
      setIsDefault(true);
    }
  },[isPay])
  return (
    <>
      <div className="mb-3">
        <h3>Payment info</h3>
      </div>
      <div className="bg-white billing-form payment-info pt-3 py-5 rounded">
        <div className="px-3">
          <CardDetailShow 
            cardDetails={cardDetails} 
            isDefault={isDefault} 
            setIsDefault={setIsDefault}
          />
        </div>
        {!isDefault && <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) =>{ 
              setStripeElements(elements);
              setStripeData(stripe);
              return (
              <>
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
              </>
            )}}
          </ElementsConsumer>
        </Elements>}
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    cards: state.plan.cards,
    isPay: state.plan.isPay,
  };
};
export default connect(mapStateToProps)(PaymentCardInfo);
