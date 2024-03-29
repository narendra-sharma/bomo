import React, { useEffect, useState } from "react";
import CardInfo from "../Sahred/CardInfo";
import {
  Elements,
  ElementsConsumer,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import CardDetailShow from "../Sahred/CardDetail";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { add_change_card, change_add_edit } from "../../reduxdata/rootAction";
import EditBillData from "../../Modals/EditBillData";
const { REACT_APP_STRIPE_PUBLIC_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentCardInfo = ({ cards, user, isAddEdit }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [stripeData, setStripeData] = useState(null);
  const [stripeElements, setStripeElements] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [cardFeilds, setCardFeilds] = useState({
    cardNumber: true,
    cardExpiry: true,
    cardCvc: true,
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const handleCardElementChange = (event, label) => {
    switch (label) {
      case "cardNumber":
        if (event.empty) {
          setErrors({ ...errors, cardNumber: "Card Number is required" });
          setCardFeilds({ ...cardFeilds, cardNumber: true });
        } else if (event.error) {
          setErrors({ ...errors, cardNumber: event.error.message });
          setCardFeilds({ ...cardFeilds, cardNumber: true });
        } else {
          setErrors({ ...errors, cardNumber: "" });
          setCardFeilds({ ...cardFeilds, cardNumber: false });
        }
        break;
      case "cardExpiry":
        if (event.empty) {
          setErrors({ ...errors, cardExpiry: "Card Expiry is required" });
          setCardFeilds({ ...cardFeilds, cardExpiry: true });
        } else if (event.error) {
          setErrors({ ...errors, cardExpiry: event.error.message });
          setCardFeilds({ ...cardFeilds, cardExpiry: true });
        } else {
          setErrors({ ...errors, cardExpiry: "" });
          setCardFeilds({ ...cardFeilds, cardExpiry: false });
        }
        break;
      case "cardCvc":
        if (event.empty) {
          setErrors({ ...errors, cardCvc: "Card CVC is required" });
          setCardFeilds({ ...cardFeilds, cardCvc: true });
        } else if (event.error) {
          setErrors({ ...errors, cardCvc: event.error.message });
          setCardFeilds({ ...cardFeilds, cardCvc: true });
        } else {
          setErrors({ ...errors, cardCvc: "" });
          setCardFeilds({ ...cardFeilds, cardCvc: false });
        }
        break;
      default:
        break;
    }
  };
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cardFeilds);
    output.forEach(([key, value]) => {
      if (value) {
        err = true;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]:
            key === "cardNumber"
              ? prevErrors.cardNumber
                ? prevErrors.cardNumber
                : "Card Number is required"
              : key === "cardExpiry"
              ? prevErrors.cardExpiry
                ? prevErrors.cardExpiry
                : "Card Expiry is required"
              : prevErrors.cardCvc
              ? prevErrors.cardCvc
              : "Card CVC is required",
        }));
      } else {
        setCardFeilds((prevErrors) => ({ ...prevErrors, [key]: false }));
      }
    });
    return err;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripeData || !stripeElements || checkAllErrors()) {
      return;
    }
    const cardElement = stripeElements.getElement(CardNumberElement);
    const { error, token } = await stripeData.createToken(cardElement);
    if (error) {
      let err = {
        error: { message: error.message },
      };
      if (error?.code.includes("number")) {
        handleCardElementChange(err, "cardNumber");
      } else if (error?.code.includes("expiry")) {
        handleCardElementChange(err, "cardExpiry");
      } else if (error?.code.includes("cvc")) {
        handleCardElementChange(err, "cardCvc");
      } else {
        toast.error(error.message);
      }
    } else {
      setShow(true);
    }
  };

  const handleConfirm = async () => {
    const cardElement = stripeElements.getElement(CardNumberElement);
    const { error, token } = await stripeData.createToken(cardElement);
    add_change_card(user?.token, token, dispatch);
    setShow(false);
  };

  useEffect(() => {
    if (cards) {
      setCardDetails(cards);
      setIsDefault(true);
    }
  }, [cards]);
  useEffect(() => {
    if (isAddEdit) {
      change_add_edit(dispatch);
      setIsDefault(true);
    }
  }, [isAddEdit]);
  return (
    <>
      <div className="bg-white billing-form payment-info pt-3 py-5 rounded">
        <div className="px-60 pt-4">
          <CardDetailShow
            cardDetails={cardDetails}
            isDefault={isDefault}
            setIsDefault={setIsDefault}
          />
        </div>
        {!isDefault && (
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe, elements }) => {
                setStripeElements(elements);
                setStripeData(stripe);
                return (
                  <>
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="px-60">
                        <div className="row">
                          <CardInfo
                            stripe={stripe}
                            elements={elements}
                            errors={errors}
                            handleCardElementChange={(e, label) =>
                              handleCardElementChange(e, label)
                            }
                          />
                          <div className="col-12">
                            <button
                              type="submit"
                              className="w-auto create-add-btn brands-add-btn rounded-pill fw-bold w-100 px-4 mt-2"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                );
              }}
            </ElementsConsumer>
          </Elements>
        )}
      </div>
      <EditBillData
        show={show}
        handleClose={() => setShow(false)}
        heading={"Add Card"}
        onConfirm={handleConfirm}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cards: state.plan.cards,
    isAddEdit: state.brand.isAddEdit,
  };
};
export default connect(mapStateToProps)(PaymentCardInfo);
