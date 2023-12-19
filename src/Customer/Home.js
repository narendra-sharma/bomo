import React from "react";
import { useSelector } from "react-redux";

const Home = () => {

    const userrole = useSelector((state) => state.auth.role || '')

    const CustomerHome = () => {
        return (
            <>
                <div className="col-md-9 col-lg-10 ml-md-auto py-4 ms-md-auto">
                    <div className="main-content px-100 py-5">
                        <div className="mx-5 mb-4">
                            <div className="d-flex justify-content-end">
                                <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2">
                                    <div className="new-request rounded-pill px-4 py-2 fw-bold">New Request</div>
                                    <div className="request-date ms-2"><p className="mb-0"><span>21:43</span><span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                                </div>
                            </div>
                            <h3>Ready to Review</h3>
                        </div>
                        <div className="review-content bg-white d-flex justify-content-between align-items-center px-5 py-5 rounded">
                            <div className="d-flex align-items-center">
                                <div><p className="short0ad">short ad</p> </div>
                                <div><p>DIOR</p></div>
                                <div><p><span className="fw-bold">Status</span> <span className="d-block">To Review</span></p></div>
                                <div><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></div>
                                <div><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></div>
                            </div>
                            <div className="d-flex review-delivery rounded-pill">Review Delivery</div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    const AdminHome = () => {
        return (
            <>
                <div className="App">
                <p>Admin Home Page</p>
                </div>
            </>
        )
    }

    const DesignerHome = () => {
        return (
            <> 
                <div className="App">
                <p>Designer Home Page</p>
                </div>
            </>
        )
    }

    return (
        <>
            {userrole === 'Designer' ? (<DesignerHome />)
                :
                userrole === 'Customer' ? (<CustomerHome />)
                    :
                    userrole === 'SuperAdmin' ? (<AdminHome />)
                        :
                        (<p>No User Type Found!!!</p>)
            }
        </>
    )
}

export default Home;
