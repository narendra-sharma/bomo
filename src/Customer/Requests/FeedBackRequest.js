import React, { useEffect } from "react";
import dropdownImage from '../../images/dropdown-img.png';
import { connect, useDispatch } from "react-redux";
import { get_feedback_review_requestlist } from "../../reduxdata/rootAction";
import ColorCode from "../../Common/ColorCode";

const FeedBackRequest = ({user,feedbacklists}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        get_feedback_review_requestlist(dispatch,user?.token);
    },[]);
    console.log(feedbacklists);
    return (
        <div className="review-content bg-white px-3 py-5 rounded">
                <div className="table-responsive">
                  <table className="table table-borderless feedback-queue">
                    {feedbacklists?.updated_feedback_queue?.map((request)=>(
                        <tbody>
                        <tr>
                          <td><p className="serial-number">{request?.priority}</p></td>
                          <td className="text-center"><ColorCode request={request}/></td>
                          <td>
                            <p>DIOR</p>
                          </td>
                          <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                          <td><p><span className="fw-bold">Delivery</span> <span className="d-block">Monday 17/03</span></p></td>
                          <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                          <td><img src={dropdownImage} alt="" /></td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        feedbacklists: state.requests.feedbacklists,
    };
};
export default connect(mapStateToProps)(FeedBackRequest);
