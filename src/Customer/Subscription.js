import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { get_plans } from "../reduxdata/rootAction";
import { Link } from "react-router-dom";
import DoPayment from "./DoPayment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_HaildCNdMAkdT0HruXtJPvig');
const Subscription = ({plans,get_plans}) => {
  const dispatch=useDispatch();
  const firstPrice=250;
  const secPrice=220;
  const thirdPrice=200;
  const steps=['Subscription Setup','Payment'];
  const [plan,setPlan]=useState(null);
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
    <>
      <div className=" ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          {plan && <>
            <div className="mx-md-3 mx-lg-5 mb-4 row">
              <div className="offset-lg-3 col-lg-4">
                <p className="mb-md-0 mb-3">Your plan auto renews in 17 days<span className="d-block">You have 5 requests left until NOV 17</span></p></div>
              <div className="col-md-5">
                <div className="d-flex justify-content-md-end">
                  <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                    <Link className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
                    <div className="request-date ms-2"><p className="mb-0"><span>21:43</span>
                      <span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-main-content mb-5">
              <div className="mx-md-5 mx-sm-0 mb-4">
                <h3>Subscription</h3>
              </div>
              <div className="review-content bg-white rounded px-4 px-md-5 py-5">
                <div className="row">
                  <div className="col-lg-6 col-6">
                    <p className="status position-relative ps-sm-0 ps-2"><b>Status</b><span className="d-block">ACTIVE</span></p>
                  </div>
                  <div className="col-lg-6 col-6">
                    <div className="status-btn d-flex justify-content-end">
                      <button className="btn border rounded-pill pause-btn ">PAUSE </button>
                      <button className="btn border rounded-pill cancel-btn">CANCEL</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
          <div className="review-main-content modify-subscription text-center bg-white py-5 px-3 rounded">
            <div className="row">
              <div className="col-md-8 px-1 mx-auto">
                <div className="d-flex subscription-progress mb-4">
                {steps.map((item,i)=><span key={i} className={(step===i)?'stepIndicator active':'stepIndicator'} onClick={()=>setStep(i)}>{item}</span>)}
                </div>
              </div>
            </div>
            {step===0 && <>
              <h2>{plan?'Modify':'Add'} your <span className="subscription-heading">Subscription</span> </h2>
              {plan && <h4>Your current plan includes 12 pieces per month. Need to change it?</h4>}
              <div className="pt-5 pb-4">
                <div className="subscription-data mb-3 row no-gutters align-items-center w-75 ms-lg-auto">
                  <div className={`increament col-md-1 ${(pieces>1) && 'cursor-pointer'}`} onClick={()=>(pieces>1) && decrease()}>-</div>
                  <div className="subscription-count offset-md-2 g-0 col-md-2">{pieces}</div>
                  <div className="increament cursor-pointer col-md-1 g-0" onClick={()=>increase()}> +</div>
                  {(save>0)&& <div className="col-md-4">
                    <div className="savings rounded-pill py-1 g-0">You are saving ${save}</div>
                  </div>}
                </div>

                <div className="subscription-total mb-2">
                  <strong>New total </strong><span>${prize}</span>
                </div>
                {plan && <p className="text-secondary">Before ${plan?.total}</p>}
              </div>
              <div className="mb-5">
                <button type="button" className="btn update-btn rounded-pill px-5 fw-bold" onClick={()=>setStep(1)}>{plan?'Update':'Add'}</button>
              </div>
              <p>Subscriptions are billed monthly at the start of the period.</p>
            </>}
            {step===1 && <Elements stripe={stripePromise}>
              <DoPayment pieces={pieces} prize={prize} save={save}/>
            </Elements>}
          </div>

          <div className="payment-history-section review-main-content p-5 rounderd mt-5">
            <div className="d-flex justify-content-between align-item-center mb-5">
              <h5><strong>Payments</strong> History</h5>
              <div><button className="btn btn-outline-dark rounded-pill px-4 py-1">Download Csv</button></div>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless mb-0" collspacing-2="true">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th colSpan={4}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>17/10/2022</td>
                    <td>COMPLETED</td>
                    <td>$2400 </td>
                    <td className="text-end"><button className="btn btn-outline-dark rounded-pill px-4 py-1">Invoice</button></td>
                  </tr>
                  <tr>
                    <td>17/10/2022</td>
                    <td>COMPLETED</td>
                    <td>$2400 </td>
                    <td className="text-end"><button className="btn btn-outline-dark rounded-pill px-4 py-1">Invoice</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);