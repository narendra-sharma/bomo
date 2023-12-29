import React, { useEffect, useRef, useState } from "react";
import { Country } from 'country-state-city';
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
const { REACT_APP_GOOGLE_API_KEY} = process.env;
const BillingInfo = ({ card, errors, handleCardElementChange }) => {
  const {name,company,address,city,postalCode,country,vatNumber}=errors;
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);
  const inputRef = useRef();
  const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) {
      handleCardElementChange(place.formatted_address, 'address')
      let p=place.formatted_address.split(',');
      handleCardElementChange(p[1].trim(), 'city')
      let pst=p[2].trim();
      pst=pst.split(' ');
      handleCardElementChange(pst[1].trim(), 'postalCode')
    }
  }
  return (
    <>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="cc-name">Name</label>
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
          <label>Company</label>
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
          <label>Address</label>
          <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY} libraries={["places"]}>
            <StandaloneSearchBox
              onLoad={ref => inputRef.current = ref}
              onPlacesChanged={() => handlePlaceChanged()}
            >
              <div className="mb-0">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  onChange={(e) => handleCardElementChange(e.target.value, 'address')}
                />
              </div>
            </StandaloneSearchBox>
          </LoadScript>
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
          <label>City</label>
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
          <label>Postal Code</label>
          <input type="text" defaultValue={card.poatalCode} name="postalCode" className="form-control" onChange={(e) => handleCardElementChange(e.target.value, 'postalCode')} />
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
          <label>Country</label>
          <select defaultValue={card.country} className={'form-select ' + (card.country === '' ? ' light-gray' : '')} aria-label="Default select example" onChange={(e) => handleCardElementChange(e.target.value, 'country')}>
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
          <label>VAT number</label>
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