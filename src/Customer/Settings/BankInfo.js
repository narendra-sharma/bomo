import React, { useState } from "react";
import visa from '../../images/visa.png';
import stripe from '../../images/stripe.png';
import paypal from '../../images/paypal.png';
import oro from '../../images/oro.png';
import gpay from '../../images/gpay.png';

const BankInfo = () => {
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: '',
    accountNumber: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    accountHolderName: '',
    accountNumber: '',
    email: ''
  });
  const arr = [visa, gpay, paypal, oro, stripe];

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'accountHolderName':
        setErrors({ ...errors, accountHolderName: value === '' ? `Account Holder Name is Required` : null });
        setBankInfo({ ...bankInfo, accountHolderName: value });
        break;
      case 'accountNumber':
        setErrors({ ...errors, accountNumber: value === '' ? `Account Number is Required` : null });
        setBankInfo({ ...bankInfo, accountNumber: value });
        break;
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setErrors({ ...errors, email: value === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null });
        setBankInfo({ ...bankInfo, email: value });
        break;

      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkerrors = Object.keys(bankInfo).reduce((errors, key) => {
      const value = bankInfo[key];
      switch (key) {
        case 'accountHolderName':
          errors[key] = value.trim() === '' ? 'Account Holder Name is Required' : null;
          break;
        case 'accountNumber':
          errors[key] = value.trim() === '' ? 'Account Number is Required' : null;
          break;
        case 'email':
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          errors[key] = value.trim() === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null;
          break;

        default:
          break;
      }
      return errors;
    }, {});
    setErrors(checkerrors);

    if (Object.values(checkerrors).some((error) => error !== null)) {
      return;
    }
    console.log("Form submitted successfully");
  };

  return (
    <>
      <div className="mb-3">
        <h3>Bank Info</h3>
      </div>
      <div className="bg-white billing-form payment-info pt-3 py-5 rounded">
        <form>
          <div className="text-end">
            <button type="submit" className="border-0 bg-transparent mx-3 text-muted" onClick={handleSubmit}>edit</button>
          </div>
          <div className="d-flex align-items-center mb-3 ms-5">
            {arr?.map((r, i) => <img key={i} src={r} className="me-1" alt="imag" />)}
          </div>
          <div className="px-60">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="cc-number">Account Holder Name<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="accountHolderName"
                    defaultValue={bankInfo.accountHolderName}
                    onChange={handleInfoChange}
                  />
                  {errors.accountHolderName && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.accountHolderName}</p>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="expiry">Account Number<span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="accountNumber"
                    defaultValue={bankInfo.accountNumber}
                    onChange={handleInfoChange}
                  />
                  {errors.accountNumber && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.accountNumber}</p>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="cvc">Email<span className="text-danger">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    defaultValue={bankInfo.email}
                    onChange={handleInfoChange}
                  />
                  {errors.email && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.email}</p>}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
};

export default BankInfo;
