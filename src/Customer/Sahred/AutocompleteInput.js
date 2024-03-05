import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
const { REACT_APP_GOOGLE_API_KEY } = process.env;
const AutocompleteInput = ({ address, handleCardElementChange }) => {
  const handlePlaceChanged = (place) => {
    if (place) {
      handleCardElementChange(place.formatted_address, 'address')
      let p = place.formatted_address.split(',');
      let address_comp = place.address_components;
      if (address_comp.length > 0) {
        const c = address_comp.find(res => (res.types.indexOf("country") >= 0));
        if (c) {
          handleCardElementChange(c?.long_name, 'country');
          p = p.filter(item => item.trim() !== c?.long_name);
        }
        const postcode = address_comp.find(res => (res.types.indexOf("postal_code") >= 0));
        if (postcode) {
          handleCardElementChange(postcode?.long_name, 'postalCode');
          let val = p.findIndex(item => item.includes(postcode?.long_name));
          if (val >= 0) {
            p[val] = p[val].replace(postcode?.long_name, '');
          }
        }
        let city = address_comp.find(res => (p.findIndex(r => r.includes(res.long_name) && r.includes(res.short_name)) >= 0));
        if (city) {
          handleCardElementChange(city?.long_name, 'city');
        }
      }
    }
  }
  const { ref } = usePlacesWidget({
    apiKey: REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      handlePlaceChanged(place);
    },
    options: {
      types: ["(regions)"]
    },
  });
  return (
    <input
      ref={ref}
      defaultValue={address}
      type="text"
      className="form-control"
      placeholder=""
      id="address"
      onChange={(e) => handleCardElementChange(e.target.value, 'address')}
      onInput={(e) => handleCardElementChange(e.target.value, 'address')}
    />
  )
}

export default AutocompleteInput;
