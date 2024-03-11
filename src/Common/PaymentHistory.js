import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import CustomPagination from "./CustomPagination";
import { get_payment_history } from "../reduxdata/PlansPayments/planActions";
import EmptyList from "./EmptyList";
import { get_customers_payment_history } from "../reduxdata/rootAction";
const PaymentHistory = ({
  user,
  userrole,
  data,
  total,
  isPay,
  search,
  useFor,
}) => {
  const csvLinkRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userrole === "Super admin") {
      get_customers_payment_history(dispatch, user?.token, search, useFor);
    } else {
      get_payment_history(dispatch, user?.token);
    }
  }, [userrole, isPay, search]);

  const handleButtonClick = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  };
  const headers =
    userrole === "customer_admin"
      ? ["Date", "Status", "Amount($)"]
      : ["Date", "Status", "Amount($)", "Brand"];
  const [csvData, setCsvData] = useState([headers, []]);
  useEffect(() => {
    if (total > 0) {
      setCsvData([
        headers,
        ...data.map((item) =>
          userrole === "customer_admin"
            ? [
                format(new Date(item?.createdAt), "MM/dd/yyyy"),
                item.payment_status === "active" ? "COMPLETED" : "PENDING",
                item.amount / 100,
              ]
            : [
                format(new Date(item?.createdAt), "MM/dd/yyyy"),
                item.payment_status === "paid" ? "PAID" : "PENDING",
                item.amount / 100,
              ]
        ),
      ]);
    }
  }, [data, total]);
  const handlePage = (page, perPage) => {
    if (userrole === "Super admin") {
      get_customers_payment_history(
        dispatch,
        user?.token,
        search,
        useFor,
        page,
        perPage
      );
    } else {
      get_payment_history(dispatch, user?.token, page, perPage);
    }
  };
  return (
    <div className="payment-history-section review-main-content p-5 rounderd mt-5">
      <div
        className={`d-flex ${
          userrole !== "Super admin"
            ? "justify-content-between"
            : "justify-content-end"
        } align-item-center mb-5`}
      >
        {userrole !== "Super admin" && (
          <h5>
            <strong>Payments</strong> History
          </h5>
        )}
        <div>
          <button
            className="btn btn-outline-dark rounded-pill px-4 py-1"
            onClick={handleButtonClick}
          >
            Download CSV
          </button>
        </div>
        <CSVLink
          className="d-none"
          data={csvData}
          ref={csvLinkRef}
          filename={`payment_history_${format(new Date(), "MM/dd/yyyy")}.csv`}
        >
          Download
        </CSVLink>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless mb-0" collspacing-2="true">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Updated By</th>
              <th colSpan={4}></th>
            </tr>
          </thead>
          <tbody>
            {total > 0 ? (
              data.map((item, i) => (
                <tr key={i}>
                  <td>{format(new Date(item?.createdAt), "dd/MM/yyyy")}</td>
                  <td>
                    {item.payment_status === "paid" ? "COMPLETED" : "PENDING"}
                  </td>
                  <td>${item.amount / 100} </td>
                  <td>{item?.updated_by?.name}</td>
                  <td className="text-end">
                    <a
                      href={item?.invoice_link}
                      className="btn btn-outline-dark rounded-pill px-4 py-1"
                    >
                      Invoice
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyList name="Payment History" isTable />
            )}
          </tbody>
        </table>
        {total > 0 && (
          <CustomPagination
            total={total}
            onPageChange={(page, perPage) => handlePage(page, perPage)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userrole: state.auth.role,
    isPay: state.plan.isPay,
  };
};
export default connect(mapStateToProps)(PaymentHistory);
