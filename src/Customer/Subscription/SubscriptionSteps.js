import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import DoPayment from "./DoPayment";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PAY_NOW } from "../../reduxdata/Plans/planTypes";
import PaymentSuccess from "../../Modals/PaymentSuccess";
const stripePromise = loadStripe('pk_test_HaildCNdMAkdT0HruXtJPvig');
const SubscriptionSteps = ({ user, plan, isPay }) => {
  const dispatch = useDispatch();
  const firstPrice = 250;
  const secPrice = 220;
  const thirdPrice = 200;
  const steps = ['Subscription Setup', 'Payment'];
  const [pieces, setPieces] = useState(plan ? plan?.pieces : 1);
  const [prize, setPrize] = useState(plan ? plan?.prize : firstPrice);
  const [save, setSave] = useState(plan ? plan?.save : 0);
  const [step, setStep] = useState(0);

  const decrease = () => {
    const tpieces = pieces - 1
    const price = ((tpieces > 5) && (tpieces < 11)) ? (prize - secPrice) : (tpieces > 10) ? prize - thirdPrice : tpieces * firstPrice;
    const saved = ((tpieces > 5) && (tpieces < 11)) ? (save - (firstPrice - secPrice)) : (tpieces > 10) ? (save - (secPrice - thirdPrice)) : 0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
  }
  const increase = () => {
    const tpieces = pieces + 1
    const price = ((tpieces > 5) && (tpieces < 11)) ? (prize + secPrice) : (tpieces > 10) ? prize + thirdPrice : tpieces * firstPrice;
    const saved = ((tpieces > 5) && (tpieces < 11)) ? (save + firstPrice - secPrice) : (tpieces > 10) ? (save + secPrice - thirdPrice) : 0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isPay) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch({
          type: PAY_NOW
        })
      },6000);
    }
  }, [isPay,dispatch])
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
          <h2 className="text-center">{plan ? 'Modify your' : 'Start using'}  <span className="subscription-heading">{plan ? 'Subscription' : 'BOMO'}</span> </h2>
          <p className="sub-heading text-center">
            {plan ? `Your current plan includes 12 pieces per month. Need to change it?`
              : <>
                Choose the number of Pieces you want to create monthly.
                <br />Need more? You can modify it next month
              </>
            }
          </p>
          <div className="p-4 px-2 px-md-5">
            <div className="subscription-data mb-3 row no-gutters align-items-center w-100">
              <div className=" offset-md-4 col-md-4 d-flex justify-content-center align-items-center">
              <span className={`increament  ${(pieces > 1) && 'cursor-pointer'}`} onClick={() => (pieces > 1) && decrease()}>-</span>
              <span className="subscription-count">{pieces}</span>
              <span className="increament cursor-pointer g-0" onClick={() => increase()}> +</span>
              </div>
              <div className="col-md-4">
                {!plan && <>
                  <div className="savings saving-bg-color rounded py-1 g-0 mb-1">Order up to 25 items in one bulk request, or split them as needed</div>
                  <div className="savings rounded py-1 g-0 mb-2">Unlimited Revisions. 5 at a time with your current Plan</div>
                </>}
                {(save > 0) && <div className="savings rounded mt-2 mt-md-0 py-1 g-0">You are saving ${save}</div>}
              </div>
            </div>

            <div className="subscription-total text-center mb-2">
              <span className="dark-green "> <strong>{plan?'New total':'Total'} </strong></span><span>${prize}</span>
            </div>
            {plan && <p className="text-secondary text-center">Before ${plan?.total}</p>}
          </div>
          <div className="mb-5 text-center">
            <button type="button" className="btn update-btn rounded-pill px-5 fw-bold" onClick={() => setStep(1)}>{plan ? 'Update' : 'Go to Payment'}</button>
          </div>
          <p className="text-center">Subscriptions are billed monthly at the start of the period.</p>
        </>}
        {step === 1 && <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <DoPayment stripe={stripe} elements={elements} user={user} pieces={pieces} prize={prize} save={save} />
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
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(SubscriptionSteps);
