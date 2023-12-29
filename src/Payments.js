import React from "react";
import PaymentHistory from "./Common/PaymentHistory";
import SearchInput from "./Common/SearchInput";
import { useSelector } from "react-redux";

const Payments = () => {
  const userrole = useSelector((state) => state.auth.role)
  const handleSearch = (value) => { };
  return (
    <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
      <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
        <h2>Payments</h2>
        {userrole === 'Super admin' ? <>
          <SearchInput placeholder="Browse Payment..." handleSearch={handleSearch} />
          <div className="mt-5">
            <h3>5 Designers</h3>
            <PaymentHistory />
          </div>
          <div className="mt-5">
            <h3>15 Customers</h3>
            <PaymentHistory />
          </div>
        </>
        : <PaymentHistory />}
      </div>
    </div>
  )
}

export default Payments;
