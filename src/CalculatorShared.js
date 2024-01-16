import React from "react";
import SubscriptionCalculator from "./Common/SubscriptionCalculator";

const CalculatorShared=()=> {
  const addClass=()=>{
      document.body.classList.add('calculator-page');
    }
    const removeClass=()=>{
      document.body.classList.remove('calculator-page');
    }
    useEffect(()=>{
      addClass();
      return(()=>{
        removeClass();
      })
    })
  return (
      <SubscriptionCalculator/>
    );
}

export default CalculatorShared;