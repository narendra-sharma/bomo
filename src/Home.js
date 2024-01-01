import React from "react";
import { useSelector } from "react-redux";
import SuperAdminHome from "./DashBoards/SuperAdminHome";
import DesignerHome from "./DashBoards/DesignerHome";
import CustomerHome from "./DashBoards/CustomerHome";
import designImage from "./images/nine-sixteen.png";
import designImage2 from "./images/sixteen-nine.png";
import designImage3 from "./images/sixteen-nine2.png";

const Home = () => {
  const userrole = useSelector((state) => state.auth.role || '')
  return (
    <>
      {userrole === 'Designer' ? <DesignerHome />
      :userrole === 'Customer' ? <CustomerHome />
      :userrole === 'SuperAdmin' ? <SuperAdminHome/>
      : <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
          <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
            <div className="review-main-content">
            <div className="mb-5">
              <div className=" d-flex align-items-center mb-3">
                <h3 className="mb-0">Approve Request</h3>
                <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                  <small>12  Action Needed</small>
                </div>
              </div>
              <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                <div className="row">
                  <div className="col-lg-12">
                  <small className="text-muted fw-bold">12 requests left </small>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad">short ad</p> </td>
                            
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p>Ad ss23 Winter</p></td>
                            <td><p><span className="fw-bold">Expand Request</span> </p></td>
                            <td><i class="fa-solid fa-circle-check checked-circle"></i> <i class="fa-solid fa-circle-xmark cancel"></i></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad">short ad</p> </td>
                            
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p>Ad ss23 Winter</p></td>
                            <td><p><span className="fw-bold">Expand Request</span> </p></td>
                            <td><i class="fa-solid fa-circle-check checked-circle"></i> <i class="fa-solid fa-circle-xmark cancel"></i></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad">short ad</p> </td>
                            
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p>Ad ss23 Winter</p></td>
                            <td><p><span className="fw-bold">Expand Request</span> </p></td>
                            <td><i class="fa-solid fa-circle-check checked-circle"></i> <i class="fa-solid fa-circle-xmark cancel"></i></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad">short ad</p> </td>
                            
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p>Ad ss23 Winter</p></td>
                            <td><p><span className="fw-bold">Expand Request</span> </p></td>
                            <td><i class="fa-solid fa-circle-check checked-circle"></i> <i class="fa-solid fa-circle-xmark cancel"></i></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className=" d-flex align-items-center mb-3">
                <h3 className="mb-0">Assign Request</h3>
                <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                  <small>2  Action Needed</small>
                </div>
              </div>
              <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                <div className="row">
                  <div className="col-lg-12">
                  <small className="text-muted fw-bold">2 requests left </small>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad loop">loop</p> </td> 
                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03/2023</span></p></td>
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p><span>Expand Request</span> </p></td>
                            <td><p>Assign Request <i class="fa-solid fa-chevron-right"></i></p></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad">short ad</p> </td>

                            <td><p>Ad ss23 Winter</p></td>
                            <td><p><span className="fw-bold">Expand Request</span> </p></td>
                            <td><i class="fa-solid fa-circle-check checked-circle"></i> <i class="fa-solid fa-circle-xmark cancel"></i></td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className=" d-flex align-items-center mb-3">
                <h3 className="mb-0">Approve Delivery</h3>
                <div className="action-need ms-3 bg-white text-dark rounded-pill px-3 py-1">
                  <small>5 Action Needed</small>
                </div>
              </div>
              <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3">
                <div className="row">
                  <div className="col-lg-12">
                  <small className="text-muted fw-bold">5 requests left </small>
                  </div>
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><p>12h</p></td>
                            <td className="text-center"><p className="short0ad typography">typography</p> </td> 
                            <td><p><span className="fw-bold">Cratat</span> <span className="d-block">Dior</span></p></td>
                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03/2023</span></p></td>
                            <td><p><span>Expand Request</span> </p></td>
                            <td>
                              <div className="statusbar-section d-flex align-items-center justify-content-between">
                                <div className="delivery-status fw-bold"><p>9:16</p></div>
                                  <div className="bar-code">
                                  <img src={designImage} alt="Image" />
                                  </div>
                              </div>
                            </td>
                            <td>
                              <div className="statusbar-section d-flex align-items-center justify-content-between">
                                <div className="delivery-status fw-bold"><p>16:9</p></div>
                                  <div className="bar-code">
                                  <img src={designImage2} alt="Image" />
                                  </div>
                              </div>
                            </td>
                            <td>
                              <div className="statusbar-section d-flex align-items-center justify-content-between">
                                <div className="delivery-status fw-bold"><p>.aep</p></div>
                                  <div className="bar-code">
                                  <img src={designImage3} alt="Image"/>
                                  </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button className="btn btn-sm btn-outline-success rounded-pill">Approve Delivery</button>
                                <i class="fa-solid fa-circle-xmark cancel"></i>
                              </div>
                            </td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div className=" d-flex align-items-center mb-3">
                <h3 className="mb-0">overall start</h3>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-2"></div>
                <div className="col-lg-2"></div>
                <div className="col-lg-2"></div>

              </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Home;
