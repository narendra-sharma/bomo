import React, { useState } from "react";
import CardInfo from "../Sahred/CardInfo";
import { Elements, ElementsConsumer, CardNumberElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const stripePromise = loadStripe('pk_test_HaildCNdMAkdT0HruXtJPvig');
const PaymentCardInfo = ({ stripe, elements }) => {
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
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
      <div className="bg-white billing-form payment-info py-5  rounded">
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form className="form px-60" onSubmit={handleSubmit}>
                <div className="text-end">
                  <button type="submit" className="text-secondary mb-0 px-3 text-decoration-none">Edit</button>
                </div>
                <div>
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
