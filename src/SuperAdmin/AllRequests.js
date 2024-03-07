import React, { useEffect, useState } from "react";
import SearchInput from "../Common/SearchInput";
import { useDispatch, connect } from "react-redux";
import PendingRequest from "../Customer/Requests/PendingRequest";
import AllActiveRequests from "./AllDesigners/AllActiveRequests";
import AllDrafts from "./AllDrafts";
import AllReviews from "./AllReviews";
import AcceptedRequest from "../Customer/Requests/AcceptedRequest";
import LateRequests from "./LateRequests";
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
            handleSearch={(val) => setSearch(val)}
          />
          <div className="mt-5 review-main-content">
            <LateRequests />
            
            <AcceptedRequest search={search} />

            <PendingRequest search={search} />
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <AllActiveRequests />
              <AllReviews />
              <div class="accordion-item mb-5">
                <div className="row">
                  <div className="col-md-12">
                    <h3 class="accordion-header" id="panelsStayOpen-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                        <span className="mb-4 d-inline-block position-relative">Active Requests</span>
                        <div className="late-request-section">
                          <div className="light-gray py-3 px-4 rounded d-flex mb-3">
                            <p className="request-status fw-bold mb-0">4 Request</p>
                            <div className="ms-4">
                              <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-left arrow" ></span> 12h - Priority</p>
                            </div>
                          </div>
                          <div className="bg-white py-3 px-4 rounded d-flex">
                            <p className="active-request-status fw-bold mb-0">
                              8 Request
                            </p>
                            <div className="ms-4">
                              <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-right arrow" ></span> 12h - Priority</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h3>
                  </div>

                  <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div class="accordion-body p-0">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="late-request-section light-gray py-3 px-4 rounded d-flex">
                            <p className="request-status fw-bold mb-0">4 Request</p>
                            <div className="ms-4">
                              <p className="mb-0 fw-bold">Delivery <span className="fas fa-angle-left arrow" ></span> 2h - Priority</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row g-0 light-gray">
                        <div className="col-md-6">
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                      <div className="row g-0 bg-white">
                        <div className="col-md-12">
                          <div className="late-request-section bg-white py-3 px-4 d-flex">
                            <p className="request-status active-request-status fw-bold mb-0">8 Request</p>
                            <div className="ms-4">
                              <p className="mb-0 fw-bold -status">Delivery <span className="fas fa-angle-right arrow" ></span> 22h - Priority</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
                          <div className="review-content px-4  mb-3">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <p className="">edit</p>{" "}
                                    </td>
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
              <AllDrafts search={search} />
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
