import React, { useEffect, useState } from "react";
import SearchInput from "../../Common/SearchInput";
import { connect, useDispatch } from "react-redux";
import { get_all_users } from "../../reduxdata/rootAction";
import AllDesignerList from "./AllDesignerList";
import userImage from "../../images/user-img.png";
import reelImage from "../../images/reel-image.png" 
import { Link } from "react-router-dom";

const AllDesigners = ({ user, users, inactiveUsers, total, inactiveTotal }) => {
  const dispatch = useDispatch();
  const role = 'designer';
  const [search, setSearch] = useState(null)
  useEffect(() => {
    get_all_users(dispatch, user?.token, role, 1, 10, search, true);
    get_all_users(dispatch, user?.token, role, 1, 10, search, false);
  }, [search]);
  return (
    <>
      <div className="ml-md-auto py-4 ms-md-auto rightside-wrapper">
        <div className="main-content-wraaper admin-payments px-60 py-md-2 py-lg-3">
          <h3 className="fw-bold mb-3">Designers</h3>
          {/* <button className="rounded-pill rounded-pill py-1 px-2 btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#view-design-popup">view all customer</button> */}
          <SearchInput placeholder="Browse Designers..." handleSearch={(val) => setSearch(val)} />
          <div className="mt-5 review-main-content">
            <AllDesignerList active user={user} users={users} total={total} search={search} />
            <AllDesignerList user={user} users={inactiveUsers} total={inactiveTotal} search={search} />
          </div>
         
        </div>
       
      </div>
      <div className="modal view-as-customer-popup fade" id="view-design-popup" tabindex="-1" role="dialog" aria-labelledby="view-design-popupLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="view-customer-content view-design-content px-4 py-4">
                <div className="row mb-4">
                  <div className="col-md-12 col-12">
                    <p className="text-center">
                      <button className="rounded-pill rounded-pill py-2 px-3 btn btn-outline-dark">
                          view as designer
                      </button>
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Active Request</p>
                      <div className="monthly-revenue-price text-center py-4">
                          <h2 className="text-mute fw-bold mb-0">2</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Total Paid</p>
                      <div className="monthly-revenue-price text-center py-4">
                          <h2 className="text-mute mb-0">$1750</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Pending to be Paid</p>
                      <div className="monthly-revenue-price text-center py-4">
                          <h2 className="text-mute mb-0">$250</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Number of Requests Failed</p>
                      <div className="monthly-revenue-price text-center py-4">
                          <h2 className="text-mute mb-0">2</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Number of aplications</p>
                      <div className="monthly-revenue-price text-center py-4">
                          <h2 className="text-mute mb-0">120</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Number of assigned Requests</p>
                      <div className="monthly-revenue-price text-center py-4">
                        <h2 className="text-mute mb-0">16</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Number of Requests Delivered</p>
                      <div className="monthly-revenue-price text-center py-4">
                        <h2 className="text-mute mb-0">12</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">% Reviews Requested</p>
                      <div className="monthly-revenue-price text-center py-4">
                        <h2 className="text-mute mb-0">55%</h2>
                      </div>
                    </div>
                  </div>
                  <div className="active-request-section d-flex flex-column rounded mb-4">
                    <div className="bg-white p-2 rounded">
                      <p className="fw-bold">Average Req Completion Time</p>
                      <div className="monthly-revenue-price text-center py-4">
                        <h2 className="text-mute mb-0">17 hour</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row review-main-content bg-white px-4 px-md-3 py-4 align-items-center rounded mb-4">
                  <div className="col-md-5">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div className="d-flex text-right justify-content-between align-items-center">
                        <img src={userImage} alt="Bomo logo" />
                      </div>
                      <div>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                        <b className=" d-md-block">Name</b> <span className="d-block">Designerito</span></p>
                      </div>
                      <div>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                        <b className=" d-md-block">Email</b> <span className="d-block">designerito@como.com</span></p>
                      </div>
                      <div>
                        <p className="mb-0 user-email  ms-1 ms-lg-2">
                        <b className=" d-md-block">Country</b> <span className="d-block">USA</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <p className="mb-0 user-email  ms-1 ms-lg-2 text-end">
                    <b className=" d-md-block">Signup Date</b> <span className="d-block">22/07/2023m</span></p>
                  </div>
                </div>
                <div className="row review-main-content bg-white px-4 px-md-3 py-4 align-items-center rounded">
                  <div className="col-md-7 col-lg-7">
                    <p className="fw-bold">REEL</p>
                    <img src={reelImage}/>
                  </div>
                  <div className="col-md-5 col-lg-5">
                    <div className="row reel-data review-content">
                      <div className="col-md-3 col-lg-3">
                        <p className="text-dark fw-bold">Bio</p>
                      </div>
                      <div className="col-md-9 col-lg-9">
                        <p className="text-mute">Lorem ipsum dolor sit amet consectetur adipiscing elit sollicitudin, turpis nibh etiam per hendrerit nisi mauris duis, nisl lacus massa consequat porttitor fringilla convallis</p>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <p className="text-dark">Website</p>
                        </div>
                      <div className="col-md-9 col-lg-9">
                        <p className=""><Link className="text-decoration-none">Lorem ipsum</Link> </p>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <p className="text-dark">Instagram</p>
                        </div>
                      <div className="col-md-9 col-lg-9">
                        <p className=""><Link className="text-decoration-none">Lorem ipsum </Link></p>
                      </div>
                      <div className="col-md-3 col-lg-3">
                        <p className="text-dark">Behance</p>
                        </div>
                      <div className="col-md-9 col-lg-9">
                        <p className=""><Link className="text-decoration-none">Lorem ipsum </Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.member.users,
    inactiveUsers: state.member.inactiveUsers,
    total: state.member.total,
    inactiveTotal: state.member.inactiveTotal
  };
};
export default connect(mapStateToProps)(AllDesigners);