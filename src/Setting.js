import React, { useEffect, useState } from "react";
import userImage from "./images/user-img.png";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Updatepassword from "./Modals/Updatepassword";
import EditProfile from "./Modals/EditProfile";
import SubscriptionStatus from "./Customer/Sahred/SubscriptionStatus";
import BillingForm from "./Customer/Settings/BillingForm";
import SubscriptionSteps from "./Customer/Subscription/SubscriptionSteps";
import {
  delete_account,
  get_user_profile_details,
  isSubscription,
} from "./reduxdata/rootAction";
import NewRequestShared from "./Customer/Sahred/NewRequestShared";
import Delete from "./Modals/Delete";
import reelImage from "./images/reel-image.png";
import EditDesignerBio from "./Modals/EditDesignerBio";
import PaymentCardInfo from "./Customer/Settings/PaymentCardInfo";
import BankInfo from "./Customer/Settings/BankInfo";
import { format } from "date-fns";
import SharedRequest from "./Common/SharedRequest";
import { set_update_user } from "./reduxdata/User/userActions";

const Setting = ({ userrole, profiledetails }) => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [showchangePassword, setShowchangePassword] = useState(false);
  const [showchangeProfile, setShowchangeProfile] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSubscription = async () => {
    await isSubscription(user).then((r) => {
      setIsSubscribe(r);
    });
  };
  useEffect(() => {
    getSubscription();
  }, []);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      profiledetails &&
      profiledetails?.isDesignerApproved &&
      !user.isDesignerApproved
    ) {
      dispatch(
        set_update_user({
          ...user,
          isDesignerApproved: profiledetails?.isDesignerApproved,
        })
      );
    }
  }, [dispatch, profiledetails]);

  useEffect(() => {
    if (user?.token) {
      get_user_profile_details(user?.token, dispatch);
    }
  }, [dispatch, user?.token]);

  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper px-60 py-md-2 py-lg-5">
          {(userrole === "customer_admin" || userrole === "customer") &&
            user?.quantity > 0 &&
            isSubscribe && <SharedRequest />}

          <div className="review-main-content">
            <div className="mx-md-5 mx-sm-0 mb-4">
              <h3>Settings</h3>
            </div>
            {(userrole === "customer_admin" || userrole === "customer") &&
              isSubscribe && (
                <div className="d-flex justify-content-between align-item-center mb-5 rounded ps-5 px-4 py-4 subscribers">
                  <h5 className="mb-0">
                    <strong>
                      Subscribed for {user?.subscription?.quantity} pieces
                      /month
                    </strong>
                  </h5>
                  <div>
                    {userrole === "customer_admin" && (
                      <Link
                        to="/subscription"
                        className="text-dark text-decoration-none"
                      >
                        Modify my Subscription
                      </Link>
                    )}
                  </div>
                </div>
              )}
          </div>
          <div className="mb-5">
            {userrole !== "Super admin" ? (
              <div className="row">
                <div
                  className={
                    userrole === "customer_admin" || "customer"
                      ? "col-lg-4"
                      : "col-lg-6"
                  }
                >
                  <div className="review-main-content bg-white px-4 py-4 d-flex justify-content-between align-items-center rounded">
                    <div className="d-flex text-right justify-content-between align-items-center gap-3">
                      {user?.role === "superadmin" ? (
                        <img src={`${userImage}`} alt="img" />
                      ) : (userrole === "customer_admin" || "customer") &&
                        user?.colour ? (
                        <div
                          style={{
                            backgroundColor: user?.colour,
                            width: 30,
                            height: 30,
                            borderRadius: 25,
                          }}
                        ></div>
                      ) : userrole === "customer_admin" && !user?.colour ? (
                        <div
                          style={{
                            backgroundColor: "black",
                            width: 30,
                            height: 30,
                            borderRadius: 25,
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: user?.colour
                              ? user?.colour
                              : "#000000",
                          }}
                        ></div>
                      )}
                      <p className="mb-0 user-email  ms-1 ms-lg-2">
                        <b className=" d-md-block">Name</b>
                        <span className="d-block">{user?.name}</span>
                      </p>
                    </div>
                    <div className="d-flex text-right justify-content-between align-items-center">
                      <p className="mb-0 user-email  ms-1 ms-lg-2">
                        <b className="d-md-block">Role</b>
                        <span className="d-block">
                          {userrole === "customer_admin" ? "Admin" : userrole}
                        </span>
                      </p>
                    </div>
                    <div>
                      <Link
                        onClick={() => setShowchangeProfile(true)}
                        className="text-secondary mb-0 text-decoration-none"
                      >
                        edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    userrole === "customer_admin" || "customer"
                      ? "col-lg-3"
                      : "col-lg-6"
                  }
                >
                  <div className="review-main-content bg-white px-4 py-4 rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-0">
                          Password<span className="d-block">*********</span>
                        </h6>
                      </div>
                      <div>
                        <Link
                          onClick={() => setShowchangePassword(true)}
                          className="text-secondary mb-0 text-decoration-none"
                        >
                          edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {userrole == "Designer" && (
                  <div className="col-lg-5">
                    <div className="review-main-content bg-white px-4 design-status rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p class="mb-0 user-email ">
                            <b class=" d-md-block">Status</b>
                          </p>
                        </div>
                        <div className="d-flex gap-2 align-items-center py-2">
                          <div
                            className={
                              user?.isDesignerApproved == true
                                ? "designer-green"
                                : "designer-red "
                            }
                            style={{ width: 10, height: 10, borderRadius: 5 }}
                          ></div>
                          <p className="mb-0">
                            {user?.isDesignerApproved == true
                              ? "Active"
                              : "InActive"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(userrole === "customer_admin" || userrole === "customer") && (
                  <div className="col-lg-5">
                    <SubscriptionStatus user={user} isSetting={true} />
                  </div>
                )}
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="review-main-content bg-white px-4 py-4 d-flex align-items-center justify-content-between align-items-center rounded">
                    <div className="d-flex text-right justify-content-between align-items-center">
                      <p className="mb-0 user-email mx-1 mx-lg-2">
                        <b className="d-md-block">Email</b>
                        <span className="d-block">{user?.email}</span>
                      </p>
                      <p className="mb-0 user-email mx-1 mx-lg-2">
                        <b className="d-md-block">Password</b>
                        <span className="d-block">*********</span>
                      </p>
                    </div>
                    <div>
                      <Link
                        onClick={() => setShowchangeProfile(true)}
                        className="text-secondary mb-0 text-decoration-none"
                      >
                        edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {userrole === "customer_admin" && user?.plan_id ? (
            <div className="review-main-content">
              <div className="row ">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h3>Billing Information</h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <h3>Payment info</h3>
                  </div>
                </div>
              </div>
              <div className="row review-main-content setting-card-info gap-3">
                <div className="col-lg-6 col-md-6 d-flex bg-white rounded flex-column">
                  <BillingForm user={user} />
                </div>
                <div className="col-lg-6 col-md-6 bg-white rounded mt-4 mt-md-0 d-flex flex-column">
                  <PaymentCardInfo user={user} />
                </div>
              </div>
            </div>
          ) : (
            userrole === "customer_admin" && <SubscriptionSteps user={user} />
          )}
          {userrole === "Designer" ? (
            <>
              <div className="row review-main-content g-0 bg-white px-4 px-md-3 py-4 align-items-center rounded">
                <div className="text-end">
                  <Link
                    onClick={() => setShowBio(true)}
                    className="border-0 bg-transparent mx-3 text-muted text-decoration-none"
                  >
                    edit
                  </Link>
                </div>
                <div className="col-md-7 col-lg-7">
                  <p className="fw-bold">REEL</p>
                  <img src={reelImage} alt="imag" />
                </div>
                <div className="col-md-5 col-lg-5">
                  <div className="row reel-data review-content">
                    <div className="col-md-3 col-lg-3">
                      <p className="text-dark fw-bold">Bio</p>
                    </div>
                    <div className="col-md-9 col-lg-9">
                      <p className="text-mute">{profiledetails?.bio}</p>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <p className="text-dark">Website</p>
                    </div>
                    <div className="col-md-9 col-lg-9">
                      <p className="">
                        <Link
                          className="text-decoration-none"
                          to={`${profiledetails?.website}`}
                          target="_blank"
                        >
                          {profiledetails?.website}
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <p className="text-dark">Instagram</p>
                    </div>
                    <div className="col-md-9 col-lg-9">
                      <p className="">
                        <Link
                          className="text-decoration-none"
                          to={`${profiledetails?.instagram}`}
                          target="_blank"
                        >
                          {profiledetails?.instagram}
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-3 col-lg-3">
                      <p className="text-dark">Behance</p>
                    </div>
                    <div className="col-md-9 col-lg-9">
                      <p className="">
                        <Link
                          className="text-decoration-none"
                          to={`${profiledetails?.behance}`}
                          target="_blank"
                        >
                          {profiledetails?.behance}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 review-main-content">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h3>Billing Information</h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <h3>Bank Info</h3>
                  </div>
                </div>
              </div>
              <div className="row setting-card-info gap-3">
                <div className="col-lg-6 col-md-6 d-flex bg-white rounded flex-column">
                  <BillingForm user={user} />
                </div>
                <div className="col-lg-6 col-md-6 d-flex bg-white rounded flex-column">
                  <BankInfo />
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
          {userrole === "Designer" && (
            <>
              <div className="mt-2 bg-white rounded p-3 mt-4">
                <p>
                  All payments are made 3 days after the order and source files
                  are properly delivered
                </p>
                <p>
                  We use wise for all payments.Your account will get linked when
                  you receive your first payment
                </p>
              </div>
            </>
          )}
          {(userrole == "customer_admin" || userrole == "Designer") && (
            <div className="delete-account status-btn text-end mt-3">
              <button
                className="text-decoration-none btn border rounded-pill cancel-btn px-5 py-1"
                onClick={() => setShow(true)}
              >
                Delete account
              </button>
            </div>
          )}
        </div>
      </div>
      <Updatepassword
        show={showchangePassword}
        handleClose={() => setShowchangePassword(false)}
      />
      <EditProfile
        show={showchangeProfile}
        handleClose={() => setShowchangeProfile(false)}
      />
      <Delete
        heading="Account"
        name={""}
        show={show}
        handleClose={() => setShow(false)}
        DeleteBrand={() => delete_account(user?.token, navigate, dispatch)}
      />
      <EditDesignerBio
        data={profiledetails}
        show={showBio}
        handleClose={() => setShowBio(false)}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userrole: state.auth.role,
    profiledetails: state.auth.profiledetails,
  };
};
export default connect(mapStateToProps)(Setting);
