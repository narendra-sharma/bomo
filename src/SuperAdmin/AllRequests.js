import React from "react";
import SearchInput from "../Common/SearchInput";
import { Link } from "react-router-dom";

const AllRequests = () => {
    const handleSearch = (value) => { };
    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
                    <h3 className="fw-bold mb-3">All Request</h3>
                    <SearchInput placeholder="Browse Payment..." handleSearch={handleSearch} />
                    <div className="mt-5 review-main-content">
                        <h3 class="mb-3">Late Requests</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                                    <p className="request-status fw-bold mb-0">1 Request</p>
                                    <div className="ms-4">
                                      <p className="mb-0 fw-bold">From ACTIVE REQUESTS</p>
                                     </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="review-content bg-red  py-3 px-4 rounded mt-4">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                    <tr>
                                       <td> 
                                           <div className=""><Link className="rounded-pill text-decoration-none">View as Customer</Link></div>
                                        </td>
                                        <td className="text-center"><p className="short0ad">short ad</p> </td>
                                        <td><p>DIOR</p></td>
                                        <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                                        <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                        <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                        
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AllRequests;
