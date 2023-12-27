import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_plans } from "../../reduxdata/rootAction";
import { Link } from "react-router-dom";
import DoPayment from "./DoPayment";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_HaildCNdMAkdT0HruXtJPvig');
const SubscriptionSteps = ({plan,plans,get_plans}) => {
  const dispatch=useDispatch();
  const firstPrice=250;
  const secPrice=220;
  const thirdPrice=200;
  const steps=['Subscription Setup','Payment'];
  const [pieces,setPieces]=useState(plan?plan?.pieces:1);
  const [prize,setPrize]=useState(plan?plan?.prize:firstPrice);
  const [save,setSave]=useState(plan?plan?.save:0);
  const [step,setStep]=useState(0);
  useEffect(()=>{
    get_plans(dispatch);
  },[])
  const decrease=()=>{
    const tpieces=pieces-1
    const price=((tpieces>5) && (tpieces<11))?(prize-secPrice):(tpieces>10)?prize-thirdPrice:tpieces*firstPrice;
    const saved=((tpieces>5) && (tpieces<11))?(save-(firstPrice-secPrice)):(tpieces>10)?(save-(secPrice-thirdPrice)):0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
  }
  const increase=()=>{
    const tpieces=pieces+1
    const price=((tpieces>5) && (tpieces<11))?(prize+secPrice):(tpieces>10)?prize+thirdPrice:tpieces*firstPrice;
    const saved=((tpieces>5) && (tpieces<11))?(save+firstPrice-secPrice):(tpieces>10)?(save+secPrice-thirdPrice):0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
  }
  return (
    <div className="review-main-content modify-subscription text-center bg-white py-5 px-3 rounded">
      <div className="row">
        <div className="col-md-8 px-1 mx-auto">
          <div className="d-flex subscription-progress mb-4">
            {steps.map((item, i) => <span key={i} className={(step === i) ? 'stepIndicator active' : 'stepIndicator'} onClick={() => setStep(i)}>{item}</span>)}
          </div>
        </div>
      </div>
      {step === 0 && <>
        <h2>{plan ? 'Modify' : 'Add'} your <span className="subscription-heading">Subscription</span> </h2>
        {plan && <h4>Your current plan includes 12 pieces per month. Need to change it?</h4>}
        <div className="pt-5 pb-4">
          <div className="subscription-data mb-3 row no-gutters align-items-center w-75 ms-lg-auto">
            <div className={`increament col-md-1 ${(pieces > 1) && 'cursor-pointer'}`} onClick={() => (pieces > 1) && decrease()}>-</div>
            <div className="subscription-count offset-md-2 g-0 col-md-2">{pieces}</div>
            <div className="increament cursor-pointer col-md-1 g-0" onClick={() => increase()}> +</div>
            {(save > 0) && <div className="col-md-4">
              <div className="savings rounded-pill py-1 g-0">You are saving ${save}</div>
            </div>}
          </div>

          <div className="subscription-total mb-2">
            <strong>New total </strong><span>${prize}</span>
          </div>
          {plan && <p className="text-secondary">Before ${plan?.total}</p>}
        </div>
        <div className="mb-5">
          <button type="button" className="btn update-btn rounded-pill px-5 fw-bold" onClick={() => setStep(1)}>{plan ? 'Update' : 'Add'}</button>
        </div>
        <p>Subscriptions are billed monthly at the start of the period.</p>
      </>}
      {step === 1 && <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({stripe, elements}) => (
              <DoPayment stripe={stripe} elements={elements}pieces={pieces} prize={prize} save={save} />
          )}
        </ElementsConsumer>
      </Elements>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    plans: state.plan.plans,
  };
};

const mapDispatchToProps = () => {
  return {
    get_plans,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionSteps);
