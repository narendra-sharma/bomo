import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement,CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const DoPayment = ({ pieces, prize, save }) => {
  const [loading, setLoading] = useState(false);
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

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const handleCardElementChange = (event) => {
    console.log(event);
    if (event.error) {
      console.log("",event.error);
      setErrors(event.error.message);
    } else {
      setErrors('');
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrors('');
    const cardElement = elements.getElement(CardElement);
    cardElement.on('change', handleCardElementChange);
    
    const paymentMethodObj = {
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        address: {
          line1: address,
          city,
          postal_code: postalCode,
          country,
        },
      },
    };

    // Add additional information to the paymentMethodObj
    paymentMethodObj.billing_details.surname = surname;
    paymentMethodObj.billing_details.company = company;
    paymentMethodObj.billing_details.vat_number = vatNumber;

    try {
      const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
      // stripePaymentMethodHandler(
      //   {
      //     result: paymentMethodResult,
      //     amount: props.amount,
      //   },
      //   handleResponse
      // );
    } catch (error) {
      setLoading(false);
      setErrors(error.message);
    }
  };

  // const handleResponse = (response) => {
  //   setLoading(false);
  //   if (response.error) {
  //     setErrorMsg(response.error.message);
  //   } else {
  //     props.setPaymentCompleted(response.success ? true : false);
  //   }
  // };
  return (
    <>
      <h2><span className="subscription-heading">Payment</span> </h2>
      <div className="pt-5 pb-4">
        <div className="row align-items-center ms-lg-auto">
          <div className="col-md-6">
            <form className="form">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="cc-number">Card Number</label>
                    <CardNumberElement
                      id="cc-number"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardNumber')}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="expiry">Card Expiry</label>
                    <CardExpiryElement
                      id="expiry"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardExpiry')}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cvc">CVV</label>
                    <CardCvcElement
                      id="cvc"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e)=>handleCardElementChange(e,'cardCvc')}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cc-name">Name</label>
                    <input id="cc-name" type="text" name="name" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'name')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Surname</label>
                    <input type="text" name="surname" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'surname')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text"  name="company" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'company')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text"  name="address" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'address')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text"  name="city" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'city')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text"  name="postalCode" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'postalCode')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text"  name="country" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'country')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>VAT number</label>
                    <input type="text"  name="vatNumber" className="form_control" onChange={(e)=>handleCardElementChange(e.target.value,'vatNumber')}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">Subscription of {pieces} pieces per month</p><span className="subscription-total">${prize + save}</span>
            </div>
            {(save > 0) && <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">12% saving vs the basic plan</p><span>${save}</span>
            </div>}
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">Total</p><span className="subscription-total">${prize}</span>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-end">
              <button type="button" className="btn update-btn rounded-pill px-5 fw-bold">Play Now</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DoPayment;