import React from "react";
import { Link } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import { Button } from "react-bootstrap";
const PastRequest = () => {
  const data=[1,2,3,4,5];
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
                    {data.map((request,i)=><tr>
                      <td className="text-center"><p className="short0ad">Short Ad</p></td>
                      <td><p>DIOR</p></td>
                      <td><p className="fw-bold">Adss23</p></td>
                      <td><p><span className="fw-bold">Status</span> <span className="d-block">Delivered</span></p></td>
                      <td><p><span className="fw-bold">Delivery Date</span> <span className="d-block">17/03/2023</span></p></td>
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
export default PastRequest;