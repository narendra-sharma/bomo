import React from "react";
import { Link } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
import { Button } from "react-bootstrap";
const PastRequest = () => {
  const data=[1,2,3,4,5];
  return (<div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
    <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
      <div className="review-main-content past-request-section mb-5">
        <div className="mx-md-5 mx-sm-0 mb-4"><h3 >Past Requests</h3></div>
        <div className="review-content bg-white px-4 px-md-4 py-5 rounded">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <tbody>
                    {data.map((request,i)=><tr>
                      <td className="text-center"><p className="short0ad logo">Short Ad</p></td>
                      <td><p>DIOR</p></td>
                      <td><h5>Adss23</h5></td>
                      <td><p><span className="h5 fw-bold">Status</span> <span className="d-block">Delivered</span></p></td>
                      <td><p><span className="h5 fw-bold">Delivery Date</span> <span className="d-block">17/03/2023</span></p></td>
                      <td><h3>$125</h3></td>
                      <td>
                        <Button variant="light" className="w-100 rounded-pill btn-outline-dark">
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