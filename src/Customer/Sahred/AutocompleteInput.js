import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
const { REACT_APP_GOOGLE_API_KEY} = process.env;
const AutocompleteInput = ({ address,handleCardElementChange }) => {
  const handlePlaceChanged = (place) => { 
    if(place) {
      handleCardElementChange(place.formatted_address, 'address')
      console.log(place);
      let p=place.formatted_address.split(',');
      if(p.length>1){
        handleCardElementChange(p[1].trim(), 'city');
        let pst=p[2].trim();
        pst=pst.split(' ');
        if(pst.length>1){
          handleCardElementChange(pst[1].trim(), 'postalCode')
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
      />
  )
}

export default AutocompleteInput;
