import React from "react";
import { CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js';
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
const CardInfo = ({ errors, handleCardElementChange }) => {
  const { cardNumber, cardExpiry, cardCvc } = errors;
  return (
    <>
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="cc-number">Card Number<span className="text-danger">*</span></label>
          <CardNumberElement
            id="cc-number"
            className="form-control"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => handleCardElementChange(e, 'cardNumber')}
          />
          {cardNumber &&
            <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
              {cardNumber}
            </p>
          }
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="expiry">Card Expiry<span className="text-danger">*</span></label>
          <CardExpiryElement
            id="expiry"
            className="form-control"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => handleCardElementChange(e, 'cardExpiry')}
          />
          {cardExpiry &&
            <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
              {cardExpiry}
            </p>
          }
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="cvc">CVV<span className="text-danger">*</span></label>
          <CardCvcElement
            id="cvc"
            className="form-control"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(e) => handleCardElementChange(e, 'cardCvc')}
          />
          {cardCvc &&
            <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
              {cardCvc}
            </p>
          }
        </div>
      </div>
    </>
  )
}

export default CardInfo;