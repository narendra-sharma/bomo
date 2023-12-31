import React, { useState } from "react";
import BillingInfo from "../Sahred/BillingInfo";
import { edit_billing_info } from "../../reduxdata/rootAction";
import { useDispatch } from "react-redux";
const BillingForm = ({user}) => {
  const dispatch=useDispatch();
  const [card, setCard] = useState({
    name:user?.address?user?.address?.name:user?.name,
    surname:user?.address?user?.address?.surname:'',
    company:user?.address?user?.address?.company:user?.company,
    address:user?.address?user?.address?.address:'',
    city:user?.address?user?.address?.city:'',
    postalCode:user?.address?user?.address?.postalCode:'',
    country:user?.address?user?.address?.country:'',
    vatNumber:user?.address?user?.address?.vatNumber:''
  });
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    vatNumber: ''
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
      case 'name':
        if (!event) {
          setErrors({ ...errors, name: { type: 'required' } })
        } else {
          setErrors({ ...errors, name: '' })
        }
        setCard({ ...card, name: event });
        break;
      case 'surname':
        setCard({ ...card, surname: event });
        break;
      case 'company':
        if (!event) {
          setErrors({ ...errors, company: { type: 'required' } })
        } else {
          setErrors({ ...errors, company: '' })
        }
        setCard({ ...card, company: event });
        break;
      case 'address':
        if (!event) {
          setErrors({ ...errors, address: { type: 'required' } })
        } else {
          setErrors({ ...errors, address: '' })
        }
        setCard({ ...card, address: event });
        break;
      case 'city':
        if (!event) {
          setErrors({ ...errors, city: { type: 'required' } })
        } else {
          setErrors({ ...errors, city: '' })
        }
        setCard({ ...card, city: event });
        break;
      case 'postalCode':
        if (!event) {
          setErrors({ ...errors, postalCode: { type: 'required' } })
        } else {
          setErrors({ ...errors, postalCode: '' })
        }
        setCard({ ...card, postalCode: event });
        break;
      case 'country':
        if (!event) {
          setErrors({ ...errors, country: { type: 'required' } })
        } else {
          setErrors({ ...errors, country: '' })
        }
        setCard({ ...card, country: event });
        break;
      case 'vatNumber':
        if (!event) {
          setErrors({ ...errors, vatNumber: { type: 'required' } })
        } else {
          setErrors({ ...errors, vatNumber: '' })
        }
        setCard({ ...card, vatNumber: event });
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const output = Object.entries(card).map(([key, value]) => ({ key, value }));
    let err=false;
    for (let i = output.length - 1; i > -1; i--) {
      if (!output[i].value && (output[i].key!=='surname')) {
        err=true;
        handleCardElementChange(output[i].value, output[i].key);
      }
    };
    if(err){
      return false;
    }
    edit_billing_info(user?.token,user?.address?._id,card,dispatch);
  };
  return (
    <>
      <div className="mb-3">
        <h3>Billing Information</h3>
      </div>
      <div className="bg-white billing-form py-5  rounded">
        <form className="form" onSubmit={handleSubmit}>
          <div className="text-end">
            <button type="submit" className="border-0 bg-transparent mx-3 text-muted">edit</button>
          </div>
          <div className="px-60">
            <div className="row">
              <BillingInfo card={card} errors={errors} handleCardElementChange={(e, label) => handleCardElementChange(e, label)} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default BillingForm;