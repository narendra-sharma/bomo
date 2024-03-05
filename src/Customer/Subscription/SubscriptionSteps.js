import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import DoPayment from "./DoPayment";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PAY_NOW } from "../../reduxdata/PlansPayments/planTypes";
import PaymentSuccess from "../../Modals/PaymentSuccess";
import SubscriptionCalculator from "../../Common/SubscriptionCalculator";
import { format, add } from "date-fns";
import { useNavigate } from "react-router-dom";
const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const SubscriptionSteps = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(props.user);
  const steps = ['Subscription Setup', 'Payment'];
  const [pieces, setPieces] = useState(5);
  const [prize, setPrize] = useState(250);
  const [save, setSave] = useState(0);
  const [step, setStep] = useState(0);
  const [changeFor,setChangeFor]=useState(null);
  const navigate=useNavigate();
  const changeQuantityData = (val) => {
    setPieces(val.pieces);
    setPrize(val.price);
    setSave(val.saved);
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (props.isPay) {
      setShow(true);
      setStep(0);
    }
  }, [props.isPay, dispatch]);

  const closeSuccessPopup = () => {
    setShow(false);
    dispatch({
      type: PAY_NOW
    });
    navigate('/settings');
  }
  const getRenew=()=>{
    const currentDate = new Date();
    const futureDate = add(currentDate, { days: 30 });
    return format(futureDate, 'MMM dd');
  }
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
          <SubscriptionCalculator change={(val) => changeQuantityData(val)} isSubscribe />
          <div className="mb-5 text-center">
            <button type="button" className="btn update-btn rounded-pill px-4 fw-bold" disabled={((user?.quantity>0) && (user?.next_subscription?.length>0))} onClick={() => setStep(1)}>{user?.plan_id ? 'Update' : 'Go to Payment'}</button>
          </div>
          <p className="text-center">
            {user?.plan_id
              ?(user?.quantity===0)
              ?<>
                You are changing your plan to <b>{pieces}</b> monthly pieces. Your new plan starts today and renews on <b>{getRenew()}</b>.
              </>
              :<>
               Subscriptions are billed every <b>30</b> days. You will be charged <b>${prize}</b> on <b>{format(new Date(user?.next_billing_date), 'MMM dd')}</b>.
              </>
              :'Subscriptions are billed monthly at the start of the period.'
            }
          </p>
        </>}
        {step === 1 && <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <DoPayment stripe={stripe} elements={elements} user={user} pieces={pieces} prize={prize} save={save} cards={props.cards} changeFor={setChangeFor}/>
            )}
          </ElementsConsumer>
        </Elements>}
      </div>
      <PaymentSuccess show={show} changeFor={changeFor} handleClose={() => closeSuccessPopup()} />
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
