import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AcceptRequest from "../Modals/AcceptRequest";
import { useDispatch } from "react-redux";
const PendingRequest = ({ allRequest, token }) => {
  const [showAcceptModal, setshowAcceptModal] = useState([]);
  return (
    <div className="row mb-4">
      <h3 className="mb-3">Pending Requests</h3>
      <div className="col-md-12">
        <div className="col-md-12">
          <div className="review-content py-3 px-4 rounded mt-4">
            {allRequest &&
              allRequest.map((item, index) => {
                return (
                  <div className="table-responsive" key={index}>
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <p className="short0ad">{item?.request_type}</p>{" "}
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Cratat</span>{" "}
                              <span className="d-block">
                                {item?.user_id?.company}
                              </span>{" "}
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Status</span>{" "}
                              <span className="d-block">{item?.status}</span>
                            </p>
                          </td>

                          <td>
                            <p>
                              <span className="fw-bold">Delivery</span>{" "}
                              <span className="d-block">
                                {!item?.delivery_date
                                  ? "No Date"
                                  : item?.delivery_date}
                              </span>
                            </p>
                          </td>
                          <td>
                            <p>
                              <span className="fw-bold">Request by</span>{" "}
                              <span className="d-block">
                                {item?.request_name}
                              </span>
                            </p>
                          </td>
                          <td>
                            <button
                              className="btn btn-success w-full h-25"
                              onClick={() => setshowAcceptModal(item?._id)}
                            >
                              Accept Request
                            </button>
                            {showAcceptModal == item?._id && (
                              <AcceptRequest
                                heading={item?.request_name}
                                showAcceptModal={showAcceptModal}
                                setshowAcceptModal={setshowAcceptModal}
                                id={item?._id}
                                token={token}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequest;
