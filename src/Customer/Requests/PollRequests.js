import React, { useEffect, useState } from "react";
import poolImage from "../../images/pool-request-img.png"
import { connect, useDispatch } from "react-redux";
import { get_designer_pool_requestlist, poll_request_apply } from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";
import RequestDetails from "../../Modals/RequestsDetails";
import EmptyList from "../../Common/EmptyList";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../../Common/CountdownTimer";
import ApplySuccess from "../../Modals/ApplySuccess";
import { format } from "date-fns";

const { REACT_APP_BOMO_URL } = process.env;

const PollRequests = ({ user, pollrequests }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollData, setPollData] = useState();
  const [isvisible, setIsvisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [isPop,setIsPop] = useState(false);

  const toogleVisibility = () => {
    if (window.scrollY > 300) {
      setIsvisible(true);
    } else {
      setIsvisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  useEffect(() => {
    window.addEventListener('scroll', toogleVisibility);
    return () => {
      window.removeEventListener('scroll', toogleVisibility);
    }
  }, []);

  const handleApplyRequest = async (requestdata) => {
    let applyrequest = requestdata._id;
    await poll_request_apply(applyrequest, dispatch, user?.token);
    checkpool();
    setSelectedData(requestdata)
    setIsPop(true);
  };

  useEffect(() => {
    if (user?.token) {
      get_designer_pool_requestlist(dispatch, user?.token);
    }
  }, [dispatch, user?.token]);

  const checkpool = () => {
    const appliedrequest = pollrequests.filter(item => item?.applied);
    const notapplied = pollrequests.filter(item => !item?.applied);
    const updatedPoll = [...notapplied, ...appliedrequest];
    setPollData(updatedPoll);
  };

  useEffect(() => {
    checkpool();
  }, [pollrequests]);

  // const handleView = (request) => {
  //   localStorage.setItem('requestData', JSON.stringify(request));
  //   navigate('/details');
  // };

  return (
    <>
      {pollData?.length > 0 ? pollData?.map((request) => (
        <div className="col-md-6 col-lg-4 col-12 mb-3">
          <div className="bg-white poll-request-content px-2 px-md-3 py-3 rounded position-relative">
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">{request?.request_name}</h6>
              <p className="text-end"><span className="fw-bold">Expected Delivery</span>
                <span className="d-block">{request?.delivery_date ? format(new Date(request?.delivery_date),'dd/MM/yyyy') : 'No Date'}</span>
              </p>
            </div>
            <div className="row">
              <div className="col-md-11 col-lg-10 d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <ColorCode request={request} reqtype='poll' />
                  <span class="brand-poll-circle">
                     <img className="rounded-circle" src={`${REACT_APP_BOMO_URL}${request?.brand_profile?.logo}`} alt='imga' height="33" widht="36" />
                  </span>
                </div>
                <div><p><a href="javascript:void(0)" className="text-decoration-none color-black show-brief" onClick={() => { setToggle(true); setSelectedData(request); }}>+ Show full Brief</a></p></div>
                {request?.applied && <div className="poll-apply-sucess">
                 <div className="poll-request-popup d-flex justify-content-center align-items-start h-100">
                    <div className="poll-request-checked">
                    <i className="fa-solid fa-check"></i></div>
                  </div>
                </div>}
              </div>
            </div>
            <div className="row my-2">
              <div className="col-md-9 col-lg-8 d-flex align-items-center">
                <img src={poolImage} alt="not found" />
              </div>
              <div className="col-md-3 col-lg-4">
                <div className="text-end ">
                  <h5 className="fw-bold">$125</h5>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-lg-8 d-flex align-items-center">
                <div className="d-flex justify-content-betwwen">
                  <p className="text-mute"><span>Selection in</span> <span className="fw-bold">
                    <CountdownTimer requestDate={request?.accepted_date} duration={16 * 60 * 60 * 1000} reqtype="pool" />
                    </span>
                  </p>
                  <p className="text-mute"><span>{request?.designer_list?.length} applications</span></p>
                </div>
              </div>
              <div className="col-md-5 col-lg-4">
                <div className="status-btn">
                  <button className="btn pause-btn rounded-pill py-1 px-3 w-100"
                    onClick={() => handleApplyRequest(request)}
                    disabled={request?.applied}>{request?.applied ? 'APPLIED' : 'APPLY'}</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )) : (<EmptyList name="Requests Poll" />)}
      <div className="d-flex justify-content-center align-items-center">
        <div className="poll-request-btn mt-5 text-center">
          <p>Hit the end? Scoot back to the top for a refresh</p>
          <button className="rounded-pill btn mt-4 py-2 fw-bold w-100" onClick={scrollToTop}>
            Go to the Top
          </button>
        </div>
      </div>
      <RequestDetails show={toggle} handleClose={() => setToggle(false)} data={selectedData} requesttype="pool"/>
      <ApplySuccess show={isPop} handleClose={() => setIsPop(false)} data={selectedData}/>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    pollrequests: state.requests.pollrequests,
  };
};
export default connect(mapStateToProps)(PollRequests);
