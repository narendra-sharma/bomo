import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import { CSVLink } from "react-csv";
import CustomPagination from "./CustomPagination";
import { get_payment_history } from "../reduxdata/PlansPayments/planActions";
const PaymentHistory = ({user}) => {
  const csvLinkRef = useRef();
  const userrole = useSelector((state) => state.auth.role)
  const data = [
    { date: new Date(), status: "COMPLETED", amount: "240", brand: 'Craft' },
    { date: new Date(), status: "COMPLETED", amount: "240", brand: 'Craft' },
    { date: new Date(), status: "COMPLETED", amount: "240", brand: 'Craft' },
  ];
  const dispatch=useDispatch();
  useEffect(()=>{
    get_payment_history(dispatch,user?.token);
  },[])
  const handleButtonClick = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  };
  const headers = userrole === 'customer_admin' ? ['Date', 'Status', 'Amount($)'] : ['Date', 'Status', 'Amount($)', 'Brand'];
  const csvData = [headers, ...data.map(item => userrole === 'customer_admin' ? [format(item.date, 'MM/dd/yyyy'), item.status, item.amount] : [format(item.date, 'MM/dd/yyyy'), item.status, item.amount, item.brand])];
  const total = 3;
  return (
    <div className="payment-history-section review-main-content p-5 rounderd mt-5">
      <div className={`d-flex ${userrole !== 'Super admin' ? 'justify-content-between' : 'justify-content-end'} align-item-center mb-5`}>
        {userrole !== 'Super admin' && <h5><strong>Payments</strong> History</h5>}
        <div><button className="btn btn-outline-dark rounded-pill px-4 py-1" onClick={handleButtonClick}>Download Csv</button></div>
        <CSVLink className="d-none" data={csvData} ref={csvLinkRef} filename={`payment_history_${format(new Date(), 'MM/dd/yyyy')}.csv`}>
          Download me
        </CSVLink>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless mb-0" collspacing-2="true">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th colSpan={4}></th>
            </tr>
          </thead>
          <tbody>
            {(data.length > 0) ? data.map((item, i) => <tr key={i}>
              <td>{format(item.date, 'MM/dd/yyyy')}</td>
              <td>{item.status}</td>
              <td>${item.amount} </td>
              <td className="text-end"><button className="btn btn-outline-dark rounded-pill px-4 py-1">Invoice</button></td>
            </tr>)
              : <tr>
                <td colSpan="100%" className="text-center py-5">
                  <p className="py-5 my-5 text-muted">Payment History is empty!</p>
                </td>
              </tr>}
          </tbody>
        </table>
        {total > 0 && <CustomPagination total={total} onPageChange={(page, perPage) => get_payment_history(dispatch,user?.token,page, perPage)} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(PaymentHistory);