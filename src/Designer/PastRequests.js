import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { get_past_requests_for_designer } from "../reduxdata/rootAction";
import { useDispatch } from "react-redux";
import ColorCode from "../Common/ColorCode";
import { format } from "date-fns";
const PastRequest = ({designerpastrequests,user}) => {
  const data=[1,2,3,4,5];
  const dispatch = useDispatch();
  useEffect(()=> {
    get_past_requests_for_designer(dispatch,user?.token);
  },[dispatch,user?.token]);
  console.log(designerpastrequests);

  return (<div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
    <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
      <div className="review-main-content designer-past-request past-request-section">
        <div className="mx-md-5 mx-sm-0 mb-4"><h3 >Past Requests</h3></div>
        <div className="review-content bg-white px-4 px-md-4 py-5 rounded">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    {designerpastrequests?.data?.map((request,i)=><tr>
                      <td className="text-center"><ColorCode request={request}/></td>
                      <td><p>{request?.request_name}</p></td>
                      <td><p className="fw-bold">Adss23</p></td>
                      <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                      <td><p><span className="fw-bold">Delivery Date</span> <span className="d-block">
                           {request?.delivery_date ? format(new Date(request?.delivery_date),'dd/MM/yyyy') : 'No Date'}
                        </span></p></td>
                      <td className="text-left" ><h6 className="fw-bold">$125</h6></td>
                      <td className="text-end">
                        <Button variant="light" className="btn px-4 fw-bold feedback-request rounded-pill">
                          View Request
                        </Button>
                      </td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    designerpastrequests: state.requests.designerpastrequests
  }
};

export default connect(mapStateToProps)(PastRequest);