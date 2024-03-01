import React, { useEffect, useState } from "react";
import { Country } from 'country-state-city';
import AutocompleteInput from "./AutocompleteInput";
const BillingInfo = ({ card, errors, handleCardElementChange }) => {
  const {name,company,address,city,postalCode,country,vatNumber}=errors;
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);
  console.log(card);
  return (
    <>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="cc-name">Name<span className="text-danger">*</span></label>
          <input id="cc-name" defaultValue={card.name} type="text" name="name" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'name')} />
          {name &&
          name.type === "required" && (
            <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
              Enter the Name
            </p>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Surname</label>
          <input type="text" defaultValue={card.surname} name="surname" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'surname')} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Company <span className="text-danger">*</span></label>
          <input type="text" defaultValue={card.company} name="company" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'company')} />
          {company &&
            company.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Enter the Company
              </p>
            )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Address<span className="text-danger">*</span></label>
          <AutocompleteInput address={card?.address} handleCardElementChange={(value,label) => handleCardElementChange(value, label)}/>
          {address &&
            address.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Enter the Address
              </p>
            )}
          {address &&
            address.type === "srequired" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Please select the correct address from suggestions
              </p>
            )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>City<span className="text-danger">*</span></label>
          <input type="text" defaultValue={card.city} name="city" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'city')} />
          {city &&
            city.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Enter the City
              </p>
            )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Postal Code<span className="text-danger">*</span></label>
          <input type="text" defaultValue={card.postalCode} name="postalCode" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'postalCode')} />
          {postalCode &&
            postalCode.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Enter the Postal Code
              </p>
            )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Country<span className="text-danger">*</span></label>
          <select value={card.country} className={'form-select ' + (card.country === '' ? ' light-gray' : '')} aria-label="Default select example" onChange={(e) => handleCardElementChange(e.target.value, 'country')}>
            <option value="" disabled>Country</option>
            {(countries.length > 0) && countries.map((c) =>
              <option key={c.name} value={c.name}>{c.name}</option>
            )}
          </select>
          {country &&
            country.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg">
                Select the country
              </p>
            )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>VAT Number<span className="text-danger">*</span></label>
          <input type="text" defaultValue={card.vatNumber} name="vatNumber" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'vatNumber')} />
          {vatNumber &&
            vatNumber.type === "required" && (
              <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">
                Enter the VAT Number
              </p>
            )}
        </div>
      </div>
    </>
  )
}

export default BillingInfo;
