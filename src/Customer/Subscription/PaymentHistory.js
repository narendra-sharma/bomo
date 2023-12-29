import React from "react";

const PaymentHistory = () => {
  return (
    <div className="payment-history-section review-main-content p-4 p-md-5 rounderd mt-5">
      <div className="d-flex justify-content-between align-item-center mb-5">
        <h5><strong>Payments</strong> History</h5>
        <div><button className="btn btn-outline-dark rounded-pill px-4 py-1">Download Csv</button></div>
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
            <tr>
              <td>17/10/2022</td>
              <td>COMPLETED</td>
              <td>$2400 </td>
              <td className="text-end"><button className="btn btn-outline-dark rounded-pill px-4 py-1">Invoice</button></td>
            </tr>
            <tr>
              <td>17/10/2022</td>
              <td>COMPLETED</td>
              <td>$2400 </td>
              <td className="text-end"><button className="btn btn-outline-dark rounded-pill px-4 py-1">Invoice</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory;