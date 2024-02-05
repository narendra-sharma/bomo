import React from "react";
import "./spinner.css";
import { useSelector } from 'react-redux';

 const LoadingSpinner=()=> {
  const loading = useSelector((state) => state.loader.isLoading || '')
  return (loading && <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>  
  );
}

export default LoadingSpinner;