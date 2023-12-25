import React from "react";
import { Link } from "react-router-dom";
import dropdownImage from '../images/dropdown-img.png';
const PastRequest = () => {
    return(
        <>
          <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
            <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
              <div className="mx-md-3 mx-lg-5 mb-4">
                <div className="d-flex justify-content-md-end">
                  <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                  <Link className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
                    <div className="request-date ms-2"><p className="mb-0"><span>21:43</span><span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                  </div>
                </div>  
              </div>
              <div className="review-main-content past-request-section mb-5">
                <div className="mx-md-5 mx-sm-0 mb-4"><h3 >Past Requests</h3></div>
                <div className="review-content bg-white px-4 px-md-4 py-5 rounded">
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="mx-md-4 mx-sm-0 fw-bold">November 2023</h5>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">Logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              </tr>
                          </tbody>
                        </table>
                      </div>
                    </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                          <td className="text-center"><p className="short0ad brand-element">Brand Element</p></td>
                            <td>
                              <p>DIOR</p>
                            </td>
                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                            
                            <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            </tr>
                        </tbody>
                      </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <Link className="text-decoration-none">
                        <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad transition">Transition</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                      <Link className="text-decoration-none">
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                              <td className="text-center"><p className="short0ad typography">typography</p></td>
                                <td>
                                  <p>DIOR</p>
                                </td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                <td><img src={dropdownImage} alt="" /></td>
                              
                                </tr>
                            </tbody>
                          </table>
                        </div>
                        </Link>

                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                          <td className="text-center"><p className="short0ad icon">Icon</p></td>
                            <td>
                              <p>DIOR</p>
                            </td>
                            <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                            <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                            </tr>
                        </tbody>
                      </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad loop">loop</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">Logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad brand-element">Brand Element</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad transition">Transition</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="mx-md-4 mx-sm-0 fw-bold">September 2023</h5>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad transition">transition</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4"> 
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">Logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">Logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td className="text-center"><p className="short0ad typography">typography</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                            </tr>
                          </tbody>
                        </table>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad icon">Icon</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad loop">logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>

                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                              <td className="text-center"><p className="short0ad transition">Transition</p></td>
                                <td>
                                  <p>DIOR</p>
                                </td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                                </tr>
                            </tbody>
                          </table>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">Logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="mx-md-4 mx-sm-0 fw-bold">August 2023</h5>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad intro">intro</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4"> 
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad brand-element">brand element</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad transition">Transition</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td className="text-center"><p className="short0ad logo">logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                            
                            </tr>
                          </tbody>
                        </table>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad transition">transition</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad logo">logo</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>

                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                              <td className="text-center"><p className="short0ad typography">typography</p></td>
                                <td>
                                  <p>DIOR</p>
                                </td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                                </tr>
                            </tbody>
                          </table>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad icon">icon</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>

                    </div>
                    <div className="col-md-4">
                    <Link className="text-decoration-none">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                            <td className="text-center"><p className="short0ad loop">loop</p></td>
                              <td>
                                <p>DIOR</p>
                              </td>
                              <td><p><span className="fw-bold">Delivery</span> <span className="d-block">17/03</span></p></td>
                              <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                              <td><img src={dropdownImage} alt="" /></td>
                              
                              </tr>
                          </tbody>
                        </table>
                      </div>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
    )
}
export default PastRequest;