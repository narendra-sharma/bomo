import React, { useEffect, useState } from "react";
import SearchInput from "../Common/SearchInput";
import { useDispatch, connect } from "react-redux";
import PendingRequest from "../Customer/Requests/PendingRequest";
const AllRequests = ({ user }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null)
  
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
          <h3 className="fw-bold mb-3">All Request</h3>
          <SearchInput
            placeholder="Browse Request..."
            handleSearch={(val)=>setSearch(val)}
          />
          <div className="mt-5 review-main-content">
            <div className="row mb-4">
              <h3 className="mb-3">Late Requests</h3>
              <div className="col-md-12">
                <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                  <p className="request-status fw-bold mb-0">1 Request</p>
                  <div className="ms-4">
                    <p className="mb-0 fw-bold">From ACTIVE REQUESTS</p>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="review-content late-request bg-red py-3 px-4 rounded mt-4">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <div className="">
                              <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark">
                                View as Customer
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            <p className="short0ad">short ad</p>{" "}
                          </td>
                          <td>
                            <p>DIOR</p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block">To Review</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">Monday 17/03</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Request by</span>{" "}
                              <span className="d-block">Pepín Noob</span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                  <p className="request-status fw-bold mb-0">1 Request</p>
                  <div className="ms-4">
                    <p className="mb-0 fw-bold">From ACTIVE REQUESTS</p>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="review-content late-request bg-red py-3 px-4 rounded mt-4">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <div className="">
                              <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark">
                                View as Customer
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            <p className="short0ad">short ad</p>{" "}
                          </td>
                          <td>
                            <p>DIOR</p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block">To Review</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">Monday 17/03</span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Request by</span>{" "}
                              <span className="d-block">Pepín Noob</span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <PendingRequest search={search}/>

            <div className="row mb-4">
              <h3 className="mb-3">Active Requests</h3>
              <div className="col-md-12">
                <div className="late-request-section bg-white py-3 px-4 rounded d-flex mb-3">
                  <p className="request-status fw-bold mb-0">1 Request</p>
                  <div className="ms-4">
                    <p className="mb-0 fw-bold">Delivery 12h - Priority</p>
                  </div>
                </div>
                <div className="late-request-section bg-white py-3 px-4 rounded d-flex">
                  <p className="active-request-status fw-bold mb-0">
                    8 Request
                  </p>
                  <div className="ms-4">
                    <p className="mb-0 fw-bold">Delivery 12h - Priority</p>
                  </div>
                </div>
              </div>
              <div className="bg-white py-3">
                <div className="col-md-12">
                  <div className="late-request-section bg-white py-3 px-4 rounded d-flex mb-3">
                    <p className="request-status fw-bold mb-0">1 Request</p>
                    <div className="ms-4">
                      <p className="mb-0 fw-bold">Delivery 12h - Priority</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="review-content py-3 px-4 rounded mt-4">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="text-center">
                              <p className="short0ad">short ad</p>{" "}
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Cratat</span>{" "}
                                <span className="d-block">DIOR</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Status</span>{" "}
                                <span className="d-block">To Review</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Delivery</span>{" "}
                                <span className="d-block">17/03/2023</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Request by</span>{" "}
                                <span className="d-block">Pepín Noob</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="review-content py-3 px-4 rounded mt-4">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="text-center">
                              <p className="short0ad">short ad</p>{" "}
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Cratat</span>{" "}
                                <span className="d-block">DIOR</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Status</span>{" "}
                                <span className="d-block">To Review</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Delivery</span>{" "}
                                <span className="d-block">17/03/2023</span>
                              </p>
                            </td>
                            <td>
                              <p>
                                <span className="fw-bold">Request by</span>{" "}
                                <span className="d-block">Pepín Noob</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(AllRequests);
