import React, { useState, useEffect } from "react";
import PaymentHistory from "./Common/PaymentHistory";
import SearchInput from "./Common/SearchInput";
import { connect, useSelector } from "react-redux";

const Payments = ({user,pdata,ptotal,cdata,ctotal,ddata,dtotal}) => {
  const userrole = useSelector((state) => state.auth.role);
  const [search,setSearch]=useState(null);
  const handleSearch = (value) => { 
    setTimeout( ()=>{
       setSearch(value);
    },1000);
  };
  
  return (
    <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
      <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
        <h3 className="fw-bold mb-3">Payments</h3>
        {userrole === 'Super admin' ? <>
          <SearchInput placeholder="Browse Payment..." handleSearch={handleSearch} />
          <div className="mt-5 review-main-content">
            <h3>{dtotal>0 && dtotal} Designers</h3>
            <PaymentHistory data={ddata} total={dtotal} search={search} useFor="designer"/>
          </div>
          <div className="mt-5 review-main-content">
            <h3>{ctotal>0 && dtotal}  Customers</h3>
            <PaymentHistory data={cdata} total={ctotal} search={search} useFor="customer"/>
          </div>
        </>
        : <PaymentHistory data={pdata} total={ptotal}/>}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pdata: state.plan.payments,
    ptotal: state.plan.total,
    cdata: state.requests.customersPayments,
    ctotal: state.requests.customerTotal,
    ddata: state.requests.designerPayments,
    dtotal: state.requests.designerTotal,
  };
};
export default connect(mapStateToProps)(Payments);
