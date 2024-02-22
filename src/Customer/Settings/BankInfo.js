import React, { useState } from "react";
import visa from '../../images/visa.png';
import stripe from '../../images/stripe.png';
import paypal from '../../images/paypal.png';
import oro from '../../images/oro.png';
import gpay from '../../images/gpay.png';
import { connect } from 'react-redux';
import { add_user_account, uploadImage } from "../../reduxdata/rootAction";
import { useDispatch } from "react-redux";
const { REACT_APP_BOMO_URL } = process.env;

const BankInfo = ({ user, imagepath }) => {
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: '',
    accountNumber: '',
    dob: '',
    gender: '',
    phone: '',
    idnumber: '',
    documentfront: '',
    documentback: '',
    frontImageName: '',
    backImageName: ''
  });
  const [errors, setErrors] = useState({
    accountHolderName: '',
    accountNumber: '',
    dob: '',
    gender: '',
    phone: '',
    idnumber: '',
    documentfront: '',
    documentback: '',
    frontImageName: '',
    backImageName: ''
  });
  const arr = [visa, gpay, paypal, oro, stripe];
  const selections = [
    { id: 1, gender: "Male", value: "male" },
    { id: 2, gender: "Female", value: "female" },
  ];
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const handleInfoChange = async (e) => {
    const { name, value, files } = e.target;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'image/gif'];
    switch (name) {
      case 'accountHolderName':
        setErrors({ ...errors, accountHolderName: !value ? `Account Holder Name is Required` : null });
        setBankInfo({ ...bankInfo, accountHolderName: value });
        break;
      case 'accountNumber':
        setErrors({ ...errors, accountNumber: !value ? `Account Number is Required` : null });
        setBankInfo({ ...bankInfo, accountNumber: value });
        break;
      case 'dob':
        const today = new Date();
        const dobdate = new Date(value);
        const ageDiffrence = today.getFullYear() - dobdate.getFullYear();
        const isover13year = ageDiffrence >= 13;
        setErrors({ ...errors, dob: !value ? 'DOB is Required' : !isover13year ? 'Age must be at least 13 years old' : null });
        setBankInfo({ ...bankInfo, dob: value });
        break;
      case 'phone':
        setErrors({ ...errors, phone: !value ? 'Phone Number is Required' : value?.length > 9 ? 'Phone Number is Invalid' : null });
        setBankInfo({ ...bankInfo, phone: `+34${value}` });
        break;
      case 'idnumber':
        setErrors({ ...errors, idnumber: value === '' ? 'Id Number is Required' : value?.length > 10 ? 'Id Number is Invalid' : '' });
        setBankInfo({ ...bankInfo, idnumber: value });
        break;
      case 'documentfront':
        const frontdoc = files[0];
        setErrors({ ...errors, documentfront: frontdoc === undefined ? 'Upload your Front Document' : '' });
        if (!allowedFileTypes.includes(frontdoc.type)) {
          setErrors({ ...errors, documentfront: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
        } else if (allowedFileTypes.includes(frontdoc.type)) {
          await uploadImage(frontdoc, dispatch,);
          setBankInfo({...bankInfo, documentfront: imagepath});
        }
        break;
      case 'documentback':
        const backdoc = files[0];
        setErrors({ ...errors, documentback: backdoc === undefined ? 'Upload your Back Document' : '' });
        if (!allowedFileTypes.includes(backdoc.type)) {
          setErrors({ ...errors, documentback: 'Invalid file type. Please upload PNG, JPEG, JPG, MP4, or GIF files.' });
        } else if (allowedFileTypes.includes(backdoc.type)) {
          await uploadImage(backdoc, dispatch);
          setBankInfo({...bankInfo, documentback: imagepath});
        }
        break;
      case 'gender':
        setErrors({ ...errors, gender: value === '' ? 'Select your Gender' : '' });
        setBankInfo({ ...bankInfo, gender: value });
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    let valid = true;

    const fieldsToValidate = [
      { name: 'accountHolderName', validation: (value) => value === '' ? 'Account Holder Name is Required' : '' },
      { name: 'accountNumber', validation: (value) => value === '' ? 'Account Number is Required' : '' },
      { name: 'dob', validation: (value) => value === '' ? 'DOB is Required' : '' },
      { name: 'phone', validation: (value) => value === '' ? 'Phone Number is Required' : '' },
      { name: 'idnumber', validation: (value) => value === '' ? 'Id Number is Required' : '' },
      { name: 'documentfront', validation: (value) => value === undefined ? 'Upload your Front Document' : '' },
      { name: 'documentback', validation: (value) => value === undefined ? 'Upload your Back Document' : '' },
      { name: 'gender', validation: (value) => value === '' ? 'Select your Gender' : '' },
    ];

    fieldsToValidate.forEach(({ name, validation }) => {
      const value = bankInfo[name];
      const error = validation(value);
      if (error) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        valid = false;
      }
    });

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    const cityname = user?.address?.address?.split(',');
    const getcity = cityname ? cityname[1].trim() : '';

    if (isValid) {
      const selectedDateObject = new Date(bankInfo?.dob);

      const year = selectedDateObject.getFullYear().toString();
      const month = (selectedDateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = selectedDateObject.getDate().toString().padStart(2, '0');

      const accountdetail = {
        accountHolderName: bankInfo?.accountHolderName,
        accountNumber: bankInfo?.accountNumber,
        day: day,
        month: month,
        year: year,
        gender: bankInfo?.gender,
        phone: bankInfo?.phone,
        idnumber: bankInfo?.idnumber,
        documentfront: bankInfo?.documentfront,
        documentback: bankInfo?.documentback,
        frontImageName: bankInfo?.documentfront?.split('/').pop(),
        backImageName: bankInfo?.documentback?.split('/').pop(),
        firstname: user?.name,
        email: user?.email,
        city: user?.address?.city,
        state: getcity,
        address: user?.address?.address,
        postal_code: user?.address?.postalCode,
      };
      await add_user_account(dispatch, accountdetail, user?.token);
      setIsShow(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h3>Bank Info</h3>
      </div>
      <div className="bg-white billing-form payment-info pt-3 py-5 rounded">
        {(user?.account_id && !isShow) &&
          <div className="px-4 py-4 ms-5">
            <h5 class="mb-0 fw-bold text-dark">You are Connected to Stripe</h5>
            <div className="row d-flex align-items-center justtify-content-end mx-1 mb-2 status-btn">
              <button type="button" className="w-auto new-request rounded-pill btn border rounded-pill pause-btn" onClick={() => setIsShow(true)}>Edit Account</button>
            </div>
          </div>}
        {!user?.account_id || isShow ?
          <div>
            <form>
              <div className="text-end">
                <button type="submit" className="border-0 bg-transparent mx-3 text-muted" onClick={handleSubmit}>edit</button>
              </div>
              <div className="d-flex align-items-center mb-3 ms-5">
                {arr?.map((r, i) => <img key={i} src={r} className="me-1" alt="imag" />)}
              </div>
              <div className="px-60">
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="expiry">Account Number<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="accountNumber"
                        defaultValue={bankInfo.accountNumber}
                        onChange={handleInfoChange}
                      />
                      {errors.accountNumber && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.accountNumber}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">DOB<span className="text-danger">*</span></label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        defaultValue={bankInfo.dob}
                        onChange={handleInfoChange}
                      />
                      {errors.dob && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.dob}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">Gender<span className="text-danger">*</span></label>
                      <select type="select" name="gender" className="form-control" defaultValue={bankInfo?.gender} onChange={handleInfoChange} >
                        <option value="" disabled>Select</option>
                        {selections.map((item) =>
                        (<option key={item.id} value={item?.value} >
                          {item?.gender}
                        </option>
                        ))}
                      </select>
                      {errors.gender && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.gender}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">Phone Number<span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text">+34</span>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          defaultValue={bankInfo.phone}
                          onChange={handleInfoChange}
                        />
                      </div>
                      {errors.phone && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">Id Number<span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name="idnumber"
                        defaultValue={bankInfo.idnumber}
                        onChange={handleInfoChange}
                      />
                      {errors.idnumber && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.idnumber}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">Front Document<span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control"
                        name="documentfront"
                        defaultValue={bankInfo.documentfront}
                        onChange={handleInfoChange}
                      />
                      {errors.documentfront && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.documentfront}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cvc">Back Document<span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control"
                        name="documentback"
                        defaultValue={bankInfo.documentback}
                        onChange={handleInfoChange}
                      />
                      {errors.documentback && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.documentback}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          : <div></div>}
      </div>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    imagepath: state.auth.image_path
  };
};

export default connect(mapStateToProps)(BankInfo);
