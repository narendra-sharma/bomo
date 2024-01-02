import React, { useEffect } from "react";
import PaymentHistory from "./Common/PaymentHistory";
import SearchInput from "./Common/SearchInput";
import { connect, useSelector } from "react-redux";

const Payments = ({user}) => {
  const userrole = useSelector((state) => state.auth.role)
  const handleSearch = (value) => { };
  
  return (
    <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
      <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
        <h3 className="fw-bold mb-3">Payments</h3>
        {userrole === 'Super admin' ? <>
          <SearchInput placeholder="Browse Payment..." handleSearch={handleSearch} />
          <div className="mt-5 review-main-content">
            <h3>5 Designers</h3>
            <PaymentHistory />
          </div>
          <div className="mt-5 review-main-content">
            <h3>15 Customers</h3>
            <PaymentHistory />
          </div>
        </>
        : <PaymentHistory />}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(Payments);
