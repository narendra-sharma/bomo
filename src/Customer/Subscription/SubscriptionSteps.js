import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import DoPayment from "./DoPayment";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PAY_NOW } from "../../reduxdata/PlansPayments/planTypes";
import PaymentSuccess from "../../Modals/PaymentSuccess";
import { get_plans } from "../../reduxdata/rootAction";
import imageLogo from '../../images/bomo-dark-green.svg';
const { REACT_APP_STRIPE_PUBLIC_KEY }= process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const SubscriptionSteps = (props) => {
  const dispatch = useDispatch();
  const [user,setUser]=useState(props.user);
  const [firstPrice,setFirstPrice] = useState(250);
  const [secPrice,setSecPrice] =  useState(220);
  const [thirdPrice,setThirdPrice] = useState(200);
  const [firstUpTo,setFirstUpTo] = useState(5);
  const [secUpTo,setSecUpTo] =  useState(10);
  const steps = ['Subscription Setup', 'Payment'];
  const [pieces, setPieces] = useState(1);
  const [prize, setPrize] = useState(firstPrice);
  const [save, setSave] = useState(0);
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(()=>{
    setUser(props.user);
    const tpieces = props?.user?.subscription?.quantity || 1;
    const lpieces=(tpieces > secUpTo) ?tpieces-secUpTo:0;
    const spieces=(lpieces>0)?firstUpTo:((tpieces > firstUpTo) && (tpieces < (secUpTo+1))) ?tpieces-firstUpTo:0;
    const fpieces=(spieces>0)?firstUpTo:(tpieces <= firstUpTo) ?tpieces:0;
    const price = ((fpieces*firstPrice)+(spieces*secPrice)+(lpieces*thirdPrice)) || firstPrice;
    const saved = ((spieces * (firstPrice - secPrice))+(lpieces*(firstPrice - thirdPrice))) || 0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
    setTotal(price);
  },[props.user])
  useEffect(()=>{
    get_plans(dispatch);
  },[])
  useEffect(()=>{
    if(props.plans.length>0){
      setFirstPrice(props.plans[0]?.unit_amount/100);
      setSecPrice(props.plans[1]?.unit_amount/100);
      setThirdPrice(props.plans[2]?.unit_amount/100);
      setFirstUpTo(props.plans[0]?.up_to);
      setSecUpTo(props.plans[1]?.up_to);
    }
  },[props.plans])
  const decrease = () => {
    const tpieces = pieces-1;
    const price = ((tpieces > firstUpTo) && (tpieces < secUpTo)) ? (prize - secPrice) : ((tpieces >= secUpTo) ? (prize - thirdPrice) : (tpieces * firstPrice));
    const saved = ((tpieces > firstUpTo) && (tpieces < secUpTo)) ? (save - (firstPrice - secPrice)) : (tpieces >= secUpTo) ? (save - (firstPrice - thirdPrice)) : 0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
  }
  const increase = () => {
    const tpieces = pieces + 1
    const price = ((tpieces > firstUpTo) && (tpieces < (secUpTo+1))) ? (prize + secPrice) : (tpieces > secUpTo) ? prize + thirdPrice : tpieces * firstPrice;
    const saved = ((tpieces > firstUpTo) && (tpieces < (secUpTo+1))) ? (save + firstPrice - secPrice) : (tpieces > secUpTo) ? (save + firstPrice - thirdPrice) : 0;
    setPieces(tpieces);
    setPrize(price);
    setSave(saved);
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
        window.location.reload();
      },6000);
    }
  }, [props.isPay,dispatch])
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
          <h2 className="text-center">{user?.plan_id ? 'Modify your' : 'Start using'} <span className="subscription-heading">{user?.plan_id ? 'Subscription' : <img src={imageLogo} alt="Bomo logo"  />}</span> </h2>
          <p className="sub-heading text-center">
            {user?.plan_id ? `Your current plan includes ${user?.subscription?.quantity} pieces per month. Need to change it?`
              : <>
                Choose the number of Pieces you want to create monthly.
                <br />Need more? You can modify it next month
              </>
            }
          </p>
          <div className="p-4 row px-2 px-md-4">
            <div className="subscription-data mb-3 row no-gutters align-items-center w-secUpTo0">
              <div className=" offset-md-4 col-md-4 d-flex justify-content-center align-items-center">
                <span className="increament-content position-relative">
                <span className={`increament plus-increment ${(pieces > 1) && 'cursor-pointer'}`} onClick={() => (pieces > 1) && decrease()}>-</span>
                <span className="subscription-count">{pieces}</span>
                <span className="increament decrease cursor-pointer g-0" onClick={() => increase()}> +</span>
                </span>
              </div>
              <div className="col-md-4 g-0">
                {!user?.plan_id && <>
                  <div className="savings saving-bg-color rounded py-1 g-0 mb-1">Order up to <u>25</u> items in one bulk request, or split them as needed</div>
                  <div className="savings rounded py-1 g-0 mb-1">Unlimited Revisions. <u>5</u> at a time with your current Plan</div>
                </>}
                {(save > 0) && <div className="savings rounded mt-2 mt-md-0 py-1 g-0">You are saving <u>${save}</u></div>}
              </div>
            </div>

            <div className="setting-subscription-total text-center mb-2">
              <span className="dark-green "> <strong>{user?.plan_id?'New total':'Total'} </strong></span><span className="light-green">${prize}</span>
            </div>
            {user?.plan_id && <p className="text-secondary text-center">Before ${total}</p>}
          </div>
          <div className="mb-5 text-center">
            <button type="button" className="btn update-btn rounded-pill px-5 fw-bold" onClick={() => setStep(1)}>{user?.plan_id ? 'Update' : 'Go to Payment'}</button>
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
    user: state.auth.user,
    plans: state.plan.plans
  };
};
export default connect(mapStateToProps)(SubscriptionSteps);
