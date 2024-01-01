import React, { useState } from "react";
import BillingInfo from "../Sahred/BillingInfo";
import { edit_billing_info } from "../../reduxdata/rootAction";
import { useDispatch } from "react-redux";
const BillingForm = ({user}) => {
  const dispatch=useDispatch();
  const [card, setCard] = useState({
    name:user?.subscription?user?.subscription?.name:'',
    surname:user?.subscription?user?.subscription?.surname:'',
    company:user?.subscription?user?.subscription?.company:'',
    address:user?.subscription?user?.subscription?.address:'',
    city:user?.subscription?user?.subscription?.city:'',
    postalCode:user?.subscription?user?.subscription?.postalCode:'',
    country:user?.subscription?user?.subscription?.country:'',
    vatNumber:user?.subscription?user?.subscription?.vatNumber:''
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
    for (let i = output.length - 1; i > -1; i--) {
      if (!output[i].value && (output.key!=='surname')) {
        let err=true;
        handleCardElementChange(output[i].value, output[i].key);
      }
    };
    let err=false;
    const errOutput = Object.entries(errors).map(([key, value]) => ({key,value}));
    err=errOutput.find(r=>r.value?true:false);
    if(err){
      return false;
    }
    edit_billing_info(user?.token,user?.subscription?._id,card,dispatch);
  };
  return (
    <>
      <div className="mb-3">
        <h3>Billing Information</h3>
      </div>
      <div className="bg-white billing-form py-5  rounded">
        <form className="form px-60" onSubmit={handleSubmit}>
          <div className="text-end">
            <button type="submit" className="text-secondary mb-0 px-3 text-decoration-none">Edit</button>
          </div>
          <div className="row">
            <BillingInfo card={card} errors={errors} handleCardElementChange={(e, label) => handleCardElementChange(e, label)} />
          </div>
        </form>
      </div>
    </>
  )
}

export default BillingForm;