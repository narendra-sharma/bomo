import React, { useEffect, useState } from "react";
import userImage from '../../images/user-img.png';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Updatepassword from "../../Modals/Updatepassword";
import EditProfile from "../../Modals/EditProfile";
import SubscriptionStatus from "../Sahred/SubscriptionStatus";
import BillingForm from "./BillingForm";
import PaymentCardInfo from "./PaymentCardInfo";
import SubscriptionSteps from "../Subscription/SubscriptionSteps";

const Setting = ({ user, userrole }) => {
    const [cuser, setCuser] = useState(null);
    const [plan, setPlan] = useState(null);
    useEffect(() => {
        setCuser(user);
    }, [user])

    const [showchangePassword, setShowchangePassword] = useState(false);
    const [showchangeProfile, setShowchangeProfile] = useState(false);
    const handleShow = () => {
        setShowchangePassword(true);
    }
    const handleClose = () => {
        setShowchangePassword(false);
    }

    const handleProfileShow = () => {
        setShowchangeProfile(true);
    }
    const handleProfileClose = () => {
        setShowchangeProfile(false);
    }

    return (
        <>
            <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
                <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
                    <div className="mx-md-3 mx-lg-5 mb-4 row">
                        <div className="d-flex justify-content-md-end">
                            <div className="request-content d-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 mb-md-0">
                                <Link className="new-request rounded-pill px-4 py-2 fw-bold text-decoration-none text-dark">New Request</Link>
                                <div className="request-date ms-2"><p className="mb-0"><span>21:43</span>
                                    <span className="d-block">Wed 01 Nov, 2023 </span></p></div>
                            </div>
                        </div>
                    </div>
                    <div className="review-main-content mb-5">
                        <div className="mx-md-5 mx-sm-0 mb-4">
                            <h3>Settings</h3>
                        </div>
                        <div className="d-flex justify-content-between align-item-center mb-5 rounded ps-5 px-4 py-4 subscribers">
                            <h5><strong>Subscribed for 12 pieces /month</strong></h5>
                            <div><Link className="text-dark text-decoration-none">Modify my Subscription</Link></div>

                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="review-main-content bg-white px-4 py-4 d-flex justify-content-between align-items-center rounded">
                                    <div className="d-flex text-right justify-content-between align-items-center">
                                        <img src={userImage} alt="Bomo logo" />
                                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                                            <b className=" d-md-block">Name</b>
                                            <span className="d-block">{cuser?.name}</span></p>
                                    </div>
                                    <div className="d-flex text-right justify-content-between align-items-center">

                                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                                            <b className="d-md-block">Role</b>
                                            <span className="d-block">{userrole}</span></p>
                                    </div>
                                    <div><Link onClick={handleProfileShow} className="text-secondary mb-0 px-3 text-decoration-none">edit</Link></div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="review-main-content bg-white px-4 py-4 rounded">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><h6 className="mb-0">
                                            Password<span className="d-block">*********</span>
                                        </h6></div>
                                        <div><Link onClick={handleShow} className="text-secondary mb-0 px-3 text-decoration-none">edit</Link></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <SubscriptionStatus plan={plan} isSetting={true} />
                            </div>
                        </div>
                    </div>
                    {user?.plan ? <div className="review-main-content">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 d-flex flex-column">
                                <BillingForm />
                            </div>
                            <div className="col-lg-6 col-md-6 d-flex flex-column">
                                <PaymentCardInfo/>
                            </div>
                        </div>
                    </div>
                    :<SubscriptionSteps plan={user?.plan}/>
                    }

                    {user?.plan && <div className="delete-account status-btn text-end mt-3">
                        <button className="text-decoration-none btn border rounded-pill cancel-btn px-5 py-2">Delete account</button>
                    </div>}
                </div>
                <Updatepassword show={showchangePassword} handleClose={handleClose} />
                <EditProfile show={showchangeProfile} handleClose={handleProfileClose} />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userrole: state.auth.role,
    };
};
export default connect(mapStateToProps)(Setting);