import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { get_all_users, switch_to_designer } from "../../reduxdata/rootAction";
import CustomPagination from "../../Common/CustomPagination";
import { format } from "date-fns";
import EmptyList from "../../Common/EmptyList";
import ViewAsDesigner from "../../Modals/ViewAsDesigner";

const AllDesignerList = ({ active, user, users, total, search }) => {
  const dispatch = useDispatch();
  const role = 'designer';
  const [view, setView] = useState(null);
  const [show, setShow] = useState(false);

  const handleswitchto_designer = async (userId) => {
    await switch_to_designer(dispatch,userId,user?.token);
  };

  return (
  <div className="review-content mb-4">
    <div className="d-flex align-items-center mb-3">
      <h3 className="mb-0 counter-number d-flex align-items-center ">{total > 0 && <span className="bg-white rounded-circle  mr-2">{total}</span>}Designers</h3>
      <p className="mb-0 ms-2" style={{alignSelf:'center', lineHeight: '23px'}}>{active ? 'Active this month' : 'Haven’t been active this month'}</p>
    </div>
    <div  className="table-responsive designer-table mb-3">
      <table className="table table-borderless mb-0">
        <tbody>
    {(users.length > 0) ? users.map(item => 

          <tr key={item?._id}> 
            <td>
              <p>
                <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark" onClick={() => handleswitchto_designer(item?._id)}>View as designer</button>
              </p>
            </td>
            <td><p className="fw-bold">{item?.name}</p></td>
            <td><p><span className="fw-bold">Date added</span> <span className="d-block">{item?.createdAt && format(new Date(item?.createdAt), 'dd/MM/yyyy')}</span></p></td>
            <td><p><span className="fw-bold">Contact </span> <span className="d-block">{item?.email}</span></p></td>
            <td><p><span className="fw-bold">Active Requests</span> <span className="d-block">{item?.active_requests}</span></p></td>
            <td><p><span className="fw-bold">Completed Requests</span> <span className="d-block">{item?.completed_requests}</span></p></td>
            <td><p><span className="cursor-pointer" onClick={() => { setView(item); setShow(true); }}>expand</span></p></td>
          </tr>
        )
      : <EmptyList name="Designers" />}
      </tbody>
      </table>
    </div>

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

    <ViewAsDesigner view={view} show={show} handleClose={()=>{setShow(false);setView(null);}} />
  </div>
  )
}
export default AllDesignerList;