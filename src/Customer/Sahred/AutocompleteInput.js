import React, { useEffect, useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
const { REACT_APP_GOOGLE_API_KEY} = process.env;
const AutocompleteInput = ({ address,handleCardElementChange }) => {
  const [loading,setLoading]=useState(false);  
  const inputRef = useRef();
  const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) {
      handleCardElementChange(place.formatted_address, 'address')
      let p=place.formatted_address.split(',');
      if(p.length>1){
        handleCardElementChange(p[1].trim(), 'city');
        let pst=p[2].trim();
        pst=pst.split(' ');
        handleCardElementChange(pst[1].trim(), 'postalCode')
      }
    }
  }
  useEffect(()=>{
     if(loading){
        // setTimeout(() => {
        //   setLoading(false);
        // }, 2000);
     }
  },[loading]);
  return (
    <>
        {loading ?<span>KKKLoading...</span>
        :<LoadScript 
          googleMapsApiKey={REACT_APP_GOOGLE_API_KEY} 
          libraries={["places"]}
          onError={()=>setLoading(true)}
        >
            <StandaloneSearchBox
              onLoad={ref => inputRef.current=ref}
              onPlacesChanged={() => handlePlaceChanged()}
            >
              <div className="mb-0">
                <input
                  defaultValue={address}
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="address"
                  onChange={(e) => handleCardElementChange(e.target.value, 'address')}
                />
              </div>
            </StandaloneSearchBox>
        </LoadScript>}
    </>
  )
}

export default AutocompleteInput;
