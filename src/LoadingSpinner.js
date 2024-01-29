import React from "react";
import "./spinner.css";
import { useSelector } from 'react-redux';

 const LoadingSpinner=()=> {
  const loading = useSelector((state) => state.loader.isLoading || '')
  return (loading && <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="text-muted text-center mt-3"><b>Loading Wait...</b></p>
    </div>  
  );
}

export default LoadingSpinner;