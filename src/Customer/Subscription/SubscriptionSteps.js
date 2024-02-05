import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import DoPayment from "./DoPayment";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PAY_NOW } from "../../reduxdata/PlansPayments/planTypes";
import PaymentSuccess from "../../Modals/PaymentSuccess";
import SubscriptionCalculator from "../../Common/SubscriptionCalculator";
import { get_customer_card, get_user_subscription } from "../../reduxdata/PlansPayments/planActions";
const { REACT_APP_STRIPE_PUBLIC_KEY }= process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const SubscriptionSteps = (props) => {
  const dispatch = useDispatch();
  const [user,setUser]=useState(props.user);
  const steps = ['Subscription Setup', 'Payment'];
  const [pieces, setPieces] = useState(5);
  const [prize, setPrize] = useState(250);
  const [save, setSave] = useState(0);
  const [step, setStep] = useState(0);
  const changeQuantityData=(val)=>{
    setPieces(val.pieces);
    setPrize(val.price);
    setSave(val.saved);
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (props.isPay) {
      setShow(true);
      setStep(0);
      setTimeout(() => {
        setShow(false);
        dispatch({
          type: PAY_NOW
        })
        get_user_subscription({...user},dispatch);
      },3000);
    }
  }, [props.isPay,dispatch])
  useEffect(()=>{
    get_customer_card(user?.token,dispatch);
  },[]);
  return (
    <>
      <div className="review-main-content modify-subscription  bg-white py-5 px-3 rounded">
        <div className="row">
          <div className="col-md-8 px-1 mx-auto">
            <div className="d-flex subscription-progress mb-4">
              {steps.map((item, i) => <span key={i} className={(step === i) ? 'stepIndicator active' : 'stepIndicator'} onClick={() => setStep(i)}>{item}</span>)}
            </div>
          </div>
        </div>
        {step === 0 && <>
          <SubscriptionCalculator change={(val)=>changeQuantityData(val)} isSubscribe/>
          <div className="mb-5 text-center">
            <button type="button" className="btn update-btn rounded-pill px-4 fw-bold" onClick={() => setStep(1)}>{user?.plan_id ? 'Update' : 'Go to Payment'}</button>
          </div>
          <p className="text-center">Subscriptions are billed monthly at the start of the period.</p>
        </>}
        {step === 1 && <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <DoPayment stripe={stripe} elements={elements} user={user} pieces={pieces} prize={prize} save={save} cards={props.cards}/>
            )}
          </ElementsConsumer>
        </Elements>}
      </div>
      <PaymentSuccess show={show} handleClose={() => setShow(false)} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isPay: state.plan.isPay,
    user: state.auth.user,
    plans: state.plan.plans,
    cards: state.plan.cards
  };
};
export default connect(mapStateToProps)(SubscriptionSteps);
