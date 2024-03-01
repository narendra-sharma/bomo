import React, { useEffect, useState } from "react";
import PauseSubscription from "../../Modals/PauseSubscription";
import CancelSubscription from "../../Modals/CancelSubscription";
import FinalCancel from "../../Modals/FinalCancel";
import { isSubscription } from "../../reduxdata/rootAction";

const SubscriptionStatus = ({ user, isSetting, subscribedUser }) => {
  let getSubscriptionId = subscribedUser?.subscription?.filter((item) => item.type == 'primary');
  const [pause, setPause] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [final, setFinal] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const getSubscription = async () => {
    await isSubscription(user).then(r => {
      setIsSubscribe(r);
    });
  }
  useEffect(() => {
    getSubscription();
  }, []);
  const Status = () => {
    return <>
      <b>{isSetting && 'Subscription'} Status</b>
      {
        !subscribedUser ? <span className={`d-block  ${(isSubscribe) ? ((user?.subscription?.status) === 'active' ? 'ACTIVE' : 'INACTIVE') : (user?.next_billing_date ? 'EXPIRED' : 'INACTIVE')}`}>{(isSubscribe) ? (user?.subscription?.status === 'active' ? 'ACTIVE' : 'INACTIVE') : (user?.next_billing_date ? 'EXPIRED' : 'INACTIVE')}</span> :
          <span className={`d-block  ${(isSubscribe) ? ((user?.subscription?.status) === 'active' ? 'ACTIVE' : 'INACTIVE') : (user?.next_billing_date ? 'EXPIRED' : 'INACTIVE')}`}>{(isSubscribe) ? (getSubscriptionId && getSubscriptionId[0]?.status === 'active' ? 'ACTIVE' : 'INACTIVE') : (user?.next_billing_date ? 'EXPIRED' : 'INACTIVE')}</span>
      }
    </>
  }
  return (
    <div className={`review-content bg-white rounded px-4  ${isSetting ? 'px-md-4 py-4' : 'px-md-5 py-5'}`}>
      <div className="row">
        <div className="col-lg-6 col-6">
          {isSetting ?
            <h6 className="position-relative ps-sm-0 ps-2 mb-0">
              <Status />
            </h6>
            : <p className="status subscription-status position-relative ps-sm-0 ps-2">
              <Status />
            </p>}
        </div>
        {isSubscribe && user?.role === 'customer_admin' && (user?.subscription?.status !== 'inactive') && <div className={`col-lg-6  ${isSetting && 'text-end'}`}>
          <div className="status-btn d-flex justify-content-end">
            {!subscribedUser ? <button className="btn border rounded-pill pause-btn" onClick={() => setPause(true)}>{user?.subscription?.status === 'paused' ? 'RESUME' : 'PAUSE'} </button> : <button className="btn border rounded-pill pause-btn" onClick={() => setPause(true)}>{getSubscriptionId && getSubscriptionId[0]?.status == 'active' ? 'Pause' : "Resume"}</button>}
            {(user?.subscription?.status === 'active') && <button className="btn border rounded-pill cancel-btn" onClick={() => setCancel(true)}>CANCEL</button>}
          </div>
        </div>}
      </div>
      <PauseSubscription show={pause} handleClose={() => setPause(false)} user={user} subscribedUser={subscribedUser} />
      <CancelSubscription show={cancel} handleClose={() => setCancel(false)} final={() => setFinal(true)} pause={() => setPause(true)} />
      <FinalCancel show={final} handleClose={() => setFinal(false)} user={user} />
    </div>
  )
}

export default SubscriptionStatus;