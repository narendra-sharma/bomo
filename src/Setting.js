import React, { useEffect, useState } from "react";
import userImage from './images/user-img.png';
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Updatepassword from "./Modals/Updatepassword";
import EditProfile from "./Modals/EditProfile";
import SubscriptionStatus from "./Customer/Sahred/SubscriptionStatus";
import BillingForm from "./Customer/Settings/BillingForm";
import PaymentCardInfo from "./Customer/Settings/PaymentCardInfo";
import SubscriptionSteps from "./Customer/Subscription/SubscriptionSteps";
import { delete_account, isSubscription } from "./reduxdata/rootAction";
import NewRequestShared from "./Customer/Sahred/NewRequestShared";
import Delete from "./Modals/Delete";

const Setting = ({ userrole }) => {
  const user=JSON.parse(localStorage.getItem('userDetails'));
  const [showchangePassword, setShowchangePassword] = useState(false);
  const [showchangeProfile, setShowchangeProfile] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSubscription = async () => {
    await isSubscription(user).then(r => {
      setIsSubscribe(r);
    });
  }
  useEffect(() => {
    getSubscription();
  }, []);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
        
          {userrole === 'customer_admin' && user.quantity && isSubscribe && <div className="mx-md-3 mx-lg-5 mb-4 row">
            <NewRequestShared />
          </div>}
          <div className="review-main-content mb-5">
            <div className="mx-md-5 mx-sm-0 mb-4">
              <h3>Settings</h3>
            </div>
            {userrole === 'customer_admin' && isSubscribe && <div className="d-flex justify-content-between align-item-center mb-5 rounded ps-5 px-4 py-4 subscribers">
              <h5><strong>Subscribed for {user?.subscription?.quantity} pieces /month</strong></h5>
              <div><Link to="/subscription" className="text-dark text-decoration-none">Modify my Subscription</Link></div>
            </div>}
          </div>
          <div className="mb-5">
            <div className="row">
              <div className={userrole === 'customer_admin' ? 'col-lg-4' : 'col-lg-6'}>
                <div className="review-main-content bg-white px-4 py-4 d-flex justify-content-between align-items-center rounded">
                  <div className="d-flex text-right justify-content-between align-items-center">
                    <img src={userImage} alt="Bomo logo" />
                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                      <b className=" d-md-block">Name</b>
                      <span className="d-block">{user?.name}</span></p>
                  </div>
                  <div className="d-flex text-right justify-content-between align-items-center">
                    <p className="mb-0 user-email  ms-1 ms-lg-2">
                      <b className="d-md-block">Role</b>
                      <span className="d-block">{(userrole === 'customer_admin') ? 'Customer' : userrole}</span></p>
                  </div>
                  <div><Link onClick={() => setShowchangeProfile(true)} className="text-secondary mb-0 px-3 text-decoration-none">edit</Link></div>
                </div>
              </div>
              <div className={userrole === 'customer_admin' ? 'col-lg-3' : 'col-lg-6'}>
                <div className="review-main-content bg-white px-4 py-4 rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div><h6 className="mb-0">
                      Password<span className="d-block">*********</span>
                    </h6></div>
                    <div><Link onClick={() => setShowchangePassword(true)} className="text-secondary mb-0 px-3 text-decoration-none">edit</Link></div>
                  </div>
                </div>
              </div>
              {userrole === 'customer_admin' && <div className="col-lg-5">
                <SubscriptionStatus user={user} isSetting={true} />
              </div>}
            </div>
          </div>
          {userrole === 'customer_admin' && user?.plan_id ? <div className="review-main-content">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex flex-column">
                <BillingForm user={user} />
              </div>
              {/* <div className="col-lg-6 col-md-6 mt-4 mt-md-0 d-flex flex-column">
                <PaymentCardInfo user={user} />
              </div> */}
            </div>
          </div>
            : userrole === 'customer_admin' && <SubscriptionSteps user={user} />
          }

          <div className="delete-account status-btn text-end mt-3">
            <button className="text-decoration-none btn border rounded-pill cancel-btn px-5 py-2" onClick={() => setShow(true)}>Delete account</button>
          </div>
          </div>
        </div>
        <Updatepassword show={showchangePassword} handleClose={() => setShowchangePassword(false)} />
        <EditProfile show={showchangeProfile} handleClose={() => setShowchangeProfile(false)} />
        <Delete heading='Account' name={''} show={show} handleClose={() => setShow(false)} DeleteBrand={() => delete_account(user?.token, navigate, dispatch)} />
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    userrole: state.auth.role,
  };
};
export default connect(mapStateToProps)(Setting);