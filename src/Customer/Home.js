import React from "react";

const Home = () => {

    return (
        <>
         <div className="col-md-9 col-lg-10 ml-md-auto py-4 ms-md-auto">
             <div className="main-content-wraaper px-60 py-5">
                <div className="review-main-content mb-5">
                    <div className="mx-5 mb-4">
                        <div className="d-flex justify-content-end">
                            <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2">
                                <div className="new-request rounded-pill px-4 py-2 fw-bold">New Request</div>
                                <div className="request-date ms-2"><p className="mb-0"><span>21:43</span><span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                            </div>
                        </div>
                        <div><h3 >Ready to Review</h3></div>
                    </div>
                    <div className="review-content bg-white d-flex justify-content-between align-items-center px-5 py-5 rounded">
                        <div className="d-flex align-items-center">
                            <div><p className="short0ad">short ad</p> </div>
                            <div><p>DIOR</p></div>
                            <div><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></div>
                            <div><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></div>
                            <div><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></div>
                        </div>
                        <div className="d-flex review-delivery"><a href="#" className="rounded-pill text-decoration-none">Review Delivery</a></div>

                    </div>
                </div>
                <div className="review-main-content mb-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="mx-5 mb-4">
                                <div><h3 >Active Requests</h3></div>
                            </div>

                            <div className="review-content bg-white px-4 py-5 rounded">
                                <div className="table-responsive">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="text-center"><p className="short0ad">short ad</p></td>
                                                <td>
                                                    <p>DIOR</p>
                                                </td>
                                                <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center"><p className="short0ad web-animation">Web animation</p></td>
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
                        <div className="col-lg-6 col-md-6">
                            <div className="mx-5 mb-4">
                                <div><h3 >Feedback Queue</h3></div>
                            </div>

                            <div className="review-content bg-white px-4 py-5 rounded">
                                <div className="table-responsive">
                                    <table className="feedback-queue">
                                        <tbody>
                                            <tr>
                                                <td><p className="serial-number">1</p></td>
                                                <td className="text-center"><p className="short0ad transition">transition</p></td>
                                                <td>
                                                    <p>DIOR</p>
                                                </td>
                                                <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="serial-number">2</p></td>
                                                <td className="text-center"><p className="short0ad brand-element">brand element</p></td>
                                                <td><p>DIOR</p></td>
                                                <td><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></td>
                                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                            </tr>
                                            <tr>
                                                <td><p className="serial-number">3</p></td>
                                                <td className="text-center"><p className="short0ad typography">typography</p></td>
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
                <div className="review-main-content mb-5">
                    <div className="mx-5 mb-4">
                        <div><h3 >Draft</h3></div>
                    </div>
                    <div className="review-content bg-white px-5 py-5 rounded">
                        <div className="bg-gray-light draft-table table-responsive">
                        <table className="table mb-0">
                            <tbody>
                                <tr>
                                    <td><p className="short0ad loop text-center">Loop</p> </td>
                                    <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                    <td><p><span className="fw-bold">Delivery</span> <span className="d-block">-</span></p></td>
                                    <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                    <td className="text-center"><p>DIOR</p></td>
                                    <td className="text-center"><p><a href="#" className="text-decoration-none">continue editing</a></p></td>
                                </tr>

                                <tr>
                                    <td><p className="short0ad brand-element text-center">brand element</p> </td>
                                    <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                    <td><p><span className="fw-bold">Delivery</span> <span className="d-block">-</span></p></td>
                                    <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                    <td className="text-center"><p>DIOR</p></td>
                                    <td className="text-center"><p><a href="#" className="text-decoration-none">continue editing</a></p></td>
                                </tr>

                                <tr>
                                    <td><p className="short0ad ui-animation text-center">UI animation</p> </td>
                                    <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                    <td><p><span className="fw-bold">Delivery</span> <span className="d-block">-</span></p></td>
                                    <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                    <td className="text-center"><p>DIOR</p></td>
                                    <td className="text-center"> <p><a href="#" className="text-decoration-none">continue editing</a></p></td>
                                </tr>

                                <tr>
                                    <td><p className="short0ad text-center">Short ad</p> </td>
                                    <td><p><span className="fw-bold">Status</span> <span className="d-block">Draft</span></p></td>
                                    <td><p><span className="fw-bold">Delivery</span> <span className="d-block">-</span></p></td>
                                    <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                    <td className="text-center"><p>DIOR</p></td>
                                    <td className="text-center"><p><a href="#" className="text-decoration-none">continue editing</a></p></td>
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

export default Home;
