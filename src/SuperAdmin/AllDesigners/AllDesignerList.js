import React from "react";
import { useDispatch } from "react-redux";
import { get_all_users } from "../../reduxdata/rootAction";
import CustomPagination from "../../Common/CustomPagination";
import { format } from "date-fns";

const AllDesignerList = ({ active, user, users, total, search }) => {
  const dispatch = useDispatch();
  const role = 'designer';
  return (<div className="review-content mb-4">
    <div className="d-flex align-items-center mb-3">
      <h3 className="mb-0">{total>0 && <span className="bg-white p-2 mr-2">{total}</span>}Designers</h3>
      <p className="mb-0 ms-2">{active ? 'Active this month' : 'Haven’t been active this month'}</p>
    </div>

    {(users.length > 0) ? users.map(item=><div key={item?._id} className="table-responsive designer-table bg-white rounded p-3 mb-3">
      <table className="table table-borderless mb-0">
        <tbody>
          <tr>
            <td>
              <p>
                <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark">View as designer</button>
              </p>
            </td>
            <td><p className="fw-bold">{item?.name}</p></td>
            <td><p><span className="fw-bold">Date added</span> <span className="d-block">{item?.createdAt && format(new Date(item?.createdAt), 'dd/MM/yyyy')}</span></p></td>
            <td><p><span className="fw-bold">Contact </span> <span className="d-block">{item?.email}</span></p></td>
            <td><p><span className="fw-bold">Active Requests</span> <span className="d-block">2</span></p></td>
            <td><p><span className="fw-bold">Completed Requests</span> <span className="d-block">44</span></p></td>
            <td><p><span>expand</span></p></td>
          </tr>
        </tbody>
      </table>
    </div>)
      : <div className="w-100 text-center py-2">
        <p className="py-2 my-2 text-muted">Designers List is empty!</p>
      </div>}

    <div className="review-content add-member px-4 py-2 rounded mb-3">
      {total > 0 && (
        <CustomPagination
          total={total}
          onPageChange={(newPage, newLimit) => {
            get_all_users(dispatch, user?.token, role, newPage, newLimit, search, active);
          }}
        />
      )}
    </div>
  </div>
  )
}
export default AllDesignerList;