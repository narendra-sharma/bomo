import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import userImage from './images/user-img.png';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { get_designer_active_requestslist, get_designer_assigned_requestlist, switch_to_superadmin } from "./reduxdata/rootAction";
import CountdownTimer from "./Common/CountdownTimer";
const roles = [
  { id: 1, label: "Admin", value: "customer_admin" },
  { id: 2, label: "Member", value: "customer" },
];
const Header = ({ user, userrole, totalassigns, activerequest, isSwitch }) => {
  const [cuser, setCuser] = useState(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = user?.role === 'designer' ? user?.role : ''

  let local = localStorage.getItem('userDetails');
  local = local ? JSON.parse(local) : null;
  const ischeck = localStorage.getItem('SWITCHTYPE');

  useEffect(() => {
    setCuser(local);
  }, [local]);

  useEffect(() => {
    if (userRole) {
      get_designer_active_requestslist(dispatch, user?.token);
      get_designer_assigned_requestlist(dispatch, user?.token);
    };
  }, [dispatch, userRole]);

  const requestsWithEarliestDeadlines = activerequest.filter(request => {
    const requestDateInMs = new Date(request?.req_mail_date).getTime() + 20 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const timeDifference = requestDateInMs - currentTime;
    if (timeDifference > 0 && timeDifference < 2 * 60 * 60 * 1000) {
      return request;
    }
  });

  const handleSwitch = async () => {
    await switch_to_superadmin(dispatch, user?.token);
  };

  return (
    <div className="ml-md-auto px-0 ms-md-auto rightside-wrapper">
      <nav className="px-60 py-3 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn py-0 d-lg-none" id="open-sidebar">
              <span className="toggle-btn"></span>
            </button>
            {(userrole !== 'Designer') ? <div className="mx-md-5">
              <h4 className="mb-0">
                {(userrole === 'customer_admin') || user?.parent ? <>{user?.company || user?.parent?.company}
                  <span className="fw-bold"> Workspace</span></> : (userrole === 'Designer') ? '' : 'Super Admin Panel'
                }
              </h4>
            </div>
              : <>
                <div className="designer-header">
                  <div className="row d-flex justify-content-between align-items-center">
                    {requestsWithEarliestDeadlines?.map((request) =>

                      <div className="col-md-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link>{request?.request_name}</Link>
                          <Button variant="unset" className="btn w-100 rounded-pill deliver-now-btn ms-2 ">Deliver in <CountdownTimer requestDate={request?.req_mail_date} /></Button>
                        </div>
                      </div>

                    )}
                  </div>
                </div>
              </>}
            <div className="d-flex text-right justify-content-between align-items-center">
              {user?.role === 'customer' ?
                <div className="cursor-pointer" onClick={() => navigate('/settings')}
                  style={{
                    backgroundColor: user?.colour,
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                  }}
                ></div>
                : ((userrole === 'customer_admin') && (user?.colour)) ?
                  <div className="cursor-pointer" onClick={() => navigate('/settings')}
                    style={{
                      backgroundColor: user?.colour,
                      width: 30,
                      height: 30,
                      borderRadius: 25,
                    }}
                  ></div>
                  : ((userrole === 'customer_admin') && (!user?.colour)) ?
                    <div className="cursor-pointer" onClick={() => navigate('/settings')}
                      style={{
                        backgroundColor: "black",
                        width: 30,
                        height: 30,
                        borderRadius: 25,
                      }}
                    ></div> :
                    <img src={`${userImage}`} alt="img" />}
              <p className="mb-0 user-email ms-1 ms-lg-2">
                <b className="d-none d-md-block cursor-pointer" onClick={() => navigate('/settings')}>{cuser?.name}</b>
                <span className="d-block cursor-pointer" onClick={() => navigate('/settings')}>{(userrole === 'customer_admin') ? 'Admin' : (cuser?.parent ? roles.find(r => r.value === cuser?.role).label : userrole)}</span>
              </p>
              {(userrole !== 'Designer') ? <div></div> : <>
                <div className="header-request-btn position-relative">
                  <Button variant="unset" className="rounded-pill btn btn-outline-dark ms-2" disabled={((userrole === 'Designer') && !cuser?.isDesignerApproved)} onClick={() => { navigate('/acceptance-request') }}>Requests</Button>
                  {totalassigns > 0 && <div className="request-count"><span className="counter-digit">{totalassigns}</span></div>}
                </div>
              </>}
              {(userrole === 'Designer' || userrole === 'customer_admin') && isSwitch && ischeck ?
                <div className="header-request-btn position-relative">
                  <button variant="unset" className="rounded-pill btn btn-outline-dark ms-2" onClick={() => handleSwitch()}>SwitchToSuperAdmin</button>
                </div> : <div></div>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userrole: state.auth.role,
    isSwitch: state.auth.isSwitch,
    totalassigns: state.requests.totalassigns,
    activerequest: state.requests.activerequest,
  };
};

export default connect(mapStateToProps)(Header);
