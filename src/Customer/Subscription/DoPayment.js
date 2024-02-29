import React, { useEffect, useState } from "react";
import { CardNumberElement, useStripe } from '@stripe/react-stripe-js';
import BillingInfo from "../Sahred/BillingInfo";
import { toast } from "react-toastify";
import CardInfo from "../Sahred/CardInfo";
import { pay_now } from "../../reduxdata/PlansPayments/planActions";
import { useDispatch } from "react-redux";
import visa from '../../images/visa.png';
import CardDetailShow from "../Sahred/CardDetail";
import PaymentDetails from "../../Modals/PaymentDetails";
const DoPayment = ({ stripe, elements, user, pieces, prize, save, cards }) => {
  const dispatch = useDispatch();
  const [cardDetails, setCardDetails] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [showAcceptModal, setshowAcceptModal] = useState(false);
  const [card, setCard] = useState({
    name: user?.address ? user?.address?.name : (user?.name && (user?.name.split(' ').length > 0)) ? user?.name.split(' ')[0] : '',
    surname: user?.address ? user?.address?.surname : (user?.name && (user?.name.split(' ').length > 1)) ? user?.name.split(' ')[1] : '',
    company: user?.address ? user?.address?.company : user?.company,
    address: user?.address ? user?.address?.address : '',
    city: user?.address ? user?.address?.city : '',
    postalCode: user?.address ? user?.address?.postalCode : '',
    country: user?.address ? user?.address?.country : '',
    vatNumber: user?.address ? user?.address?.vatNumber : ''
  });
  const [cardFeilds, setCardFeilds] = useState({
    cardNumber: true,
    cardExpiry: true,
    cardCvc: true,
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    name: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    vatNumber: ''
  });

  const [DataToSend, setDataToSend] = useState(null);
  const [stripeInfo, setstripeInfo] = useState({});
  useEffect(() => {
    if (cards) {
      setCardDetails(cards);
      setIsDefault(true);
    }
  }, [cards])
  useEffect(() => {
    if (isDefault) {
      setCardFeilds({
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
      })
    } else {
      setCardFeilds({
        cardNumber: true,
        cardExpiry: true,
        cardCvc: true,
      })
    }
  }, [isDefault])
  const handleCardElementChange = (event, label) => {
    switch (label) {
      case 'cardNumber':
        if (event.empty) {
          setErrors({ ...errors, cardNumber: 'Card Number is required' })
          setCardFeilds({ ...cardFeilds, cardNumber: true })
        } else if (event.error) {
          setErrors({ ...errors, cardNumber: event.error.message })
          setCardFeilds({ ...cardFeilds, cardNumber: true })
        } else {
          setErrors({ ...errors, cardNumber: '' })
          setCardFeilds({ ...cardFeilds, cardNumber: false })
        }
        break;
      case 'cardExpiry':
        if (event.empty) {
          setErrors({ ...errors, cardExpiry: 'Card Expiry is required' })
          setCardFeilds({ ...cardFeilds, cardExpiry: true })
        } else if (event.error) {
          setErrors({ ...errors, cardExpiry: event.error.message })
          setCardFeilds({ ...cardFeilds, cardExpiry: true })
        } else {
          setErrors({ ...errors, cardExpiry: '' })
          setCardFeilds({ ...cardFeilds, cardExpiry: false })
        }
        break;
      case 'cardCvc':
        if (event.empty) {
          setErrors({ ...errors, cardCvc: 'Card CVC is required' })
          setCardFeilds({ ...cardFeilds, cardCvc: true })
        } else if (event.error) {
          setErrors({ ...errors, cardCvc: event.error.message })
          setCardFeilds({ ...cardFeilds, cardCvc: true })
        } else {
          setErrors({ ...errors, cardCvc: '' })
          setCardFeilds({ ...cardFeilds, cardCvc: false })
        }
        break;
      default:
        setCard((prev) => ({ ...prev, [label]: event }));
        setErrors((prev) => ({ ...prev, [label]: (!event && (label !== 'surname')) ? { type: 'required' } : '' }))
        break;
    }
  };
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(card)
    output.forEach(([key, value]) => {
      if (!value && (key !== 'surname')) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: { type: 'required' } }))
      }
    });
    output = Object.entries(cardFeilds)
    output.forEach(([key, value]) => {
      if (value) {
        err = true;
        setErrors((prevErrors) => (
          {
            ...prevErrors,
            [key]: key === 'cardNumber' ? (prevErrors.cardNumber ? prevErrors.cardNumber : 'Card Number is required')
              : key === 'cardExpiry' ? (prevErrors.cardExpiry ? prevErrors.cardExpiry : 'Card Expiry is required')
                : (prevErrors.cardCvc ? prevErrors.cardCvc : 'Card CVC is required')
          }
        ))
      } else {
        setCardFeilds((prevErrors) => ({ ...prevErrors, [key]: false }))
      }
    });
    return err;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || checkAllErrors()) {
      return;
    }
    if (!isDefault) {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, token } = await stripe.createToken(cardElement, {
        name: card.name,
        address_line1: card.address,
        address_line2: card.address,
        address_city: card.city,
        address_zip: card.postalCode,
        address_country: card.country,
      });
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
        const data = {
          user_id: user._id,
          email: user.email,
          quantity: pieces,
          cardToken: token?.id,
          ...card
        };

        if (user?.subscription) {
          setstripeInfo(token);
          setDataToSend(data);
          setshowAcceptModal(true);
        } else {
          pay_now(user?.token, token, data, dispatch)
        }
      }
      return error ? false : true;
    } else {
      const data = {
        user_id: user._id,
        email: user.email,
        quantity: pieces,
        ...card
      };
      if (user?.subscription) {
        setDataToSend(data);
        setshowAcceptModal(true);
      } else {
        pay_now(user?.token, {}, data, dispatch)
      }
    }
  };
  const doPay = (label) => {
    let data = { ...DataToSend };
    data[label] = 1;
    pay_now(user?.token, stripeInfo, data, dispatch);
  }
  return (
    <>
      <h2>Payment</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="pt-4 pb-4 do-payment">
          <div className="row align-items-center ms-lg-auto px-md-4 px-lg-4 px-2">
            <div className="col-md-6">
              <CardDetailShow cardDetails={cardDetails} isDefault={isDefault} setIsDefault={setIsDefault} />
              <div className="row">
                {!isDefault && <CardInfo errors={errors} handleCardElementChange={(e, label) => handleCardElementChange(e, label)} />}
                <BillingInfo card={card} errors={errors} handleCardElementChange={(e, label) => handleCardElementChange(e, label)} />
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">Subscription of {pieces} pieces per month</p><span className="subscription-total">$ {prize + save}</span>
              </div>
              {(save > 0) && <div className="d-flex align-items-center justify-content-between mt-2">
                <p className="mb-0">{((save / (prize + save)) * 100).toFixed(0)}% saving vs the basic plan</p><span className="light-green"><del>$ {save}</del></span>
              </div>}
              <div className="d-flex align-items-center justify-content-between mt-5">
                <p className="mb-0">Total</p><span className="subscription-total grand-total">$ {prize}</span>
              </div>
              <div className="hr-line mt-3 mb-4"></div>
              <div className="d-flex align-items-center justify-content-end">
                <button type="submit" className="btn pay-now rounded px-5 mt-3" disabled={!stripe || !elements}>Pay Now</button>
              </div>
              <PaymentDetails heading={"TEST"} showAcceptModal={showAcceptModal} setshowAcceptModal={setshowAcceptModal} doPay={(val) => doPay(val)} />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default DoPayment;