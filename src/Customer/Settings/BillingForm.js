import React, { useEffect, useState } from "react";
import BillingInfo from "../Sahred/BillingInfo";
import { edit_billing_info } from "../../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import EditBillData from "../../Modals/EditBillData";
const BillingForm = ({ user }) => {
  const dispatch = useDispatch();
  const [card, setCard] = useState({
    name: '',
    surname: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    vatNumber: ''
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
  useEffect(() => {
    if (user?.address) {
      setCard({
        name: user?.address ? user?.address?.name : (user?.name && (user?.name.split(' ').length > 0)) ? user?.name.split(' ')[0] : '',
        surname: user?.address ? user?.address?.surname : (user?.name && (user?.name.split(' ').length > 1)) ? user?.name.split(' ')[1] : '',
        company: user?.address ? user?.address?.company : user?.company,
        address: user?.address ? user?.address?.address : '',
        city: user?.address ? user?.address?.city : '',
        postalCode: user?.address ? user?.address?.postalCode : '',
        country: user?.address ? user?.address?.country : '',
        vatNumber: user?.address ? user?.address?.vatNumber : ''
      })
    }
  }, [user?.address]);
  const [show, setShow] = useState(false);
  const handleCardElementChange = (event, label) => {
    setCard((prev) => ({ ...prev, [label]: event }));
    setErrors((prev) => ({ ...prev, [label]: (!event || event == null && (label !== 'surname')) ? { type: 'required' } : '' }))
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
    return err
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkAllErrors()) {
      return;
    }
    setShow(true);
  };
  const handleConfirm = () => {
    edit_billing_info(user?.role, user?.token, user?.address?._id, card, dispatch);
    setShow(false);
  };
  return (
    <>
      <div className="mb-3">
        <h3>Billing Information</h3>
      </div>
      <div className="bg-white billing-form py-5 pt-3 rounded">
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
      <EditBillData show={show} handleClose={() => setShow(false)} heading={'Edit Billing Info'} onConfirm={handleConfirm} />
    </>
  )
}

export default BillingForm;