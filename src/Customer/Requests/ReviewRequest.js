import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ColorCode from '../../Common/ColorCode';
import { format } from 'date-fns';
import ReviewDelivery from '../../Modals/ReviewDelivery';
import EmptyList from '../../Common/EmptyList';
import { useDispatch } from 'react-redux';
import { get_edit_request_data, get_review_request_data } from '../../reduxdata/rootAction';
import DayMonth from '../../Common/DayMonth';

const ReviewRequest = ({ feedbacklists }) => {
    const dispatch = useDispatch();
    const [isshow,setIsshow]=useState(false);
    const [data,setData]=useState([]);

    return (
        <div className="review-content bg-white px-3 px-md-5 py-5 rounded">
            <div className="table-responsive">
                <table className="table table-borderless">
                    {feedbacklists?.design_for_review?.length > 0 ? feedbacklists?.design_for_review?.map((request)=> (
                         <tbody>
                         <tr>
                             <td className="text-center" width="130px"><ColorCode request={request} /></td>
                             <td><p>{request?.brand_profile?.brandname ? request?.brand_profile?.brandname : '-'}</p></td>
                             <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status && 'To Review'}</span></p></td>
                             <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : <DayMonth deliverydate={request?.delivery_date}/>}</span></p></td>
                             <td><p><span className="fw-bold">Request by</span> <span className="d-block">{request?.user_id?.name}</span></p></td>
                             <td className="pull-right"> 
                                <div className="review-delivery">
                                <Link className="rounded-pill text-decoration-none" onClick={()=>{dispatch(get_review_request_data(request)); setIsshow(true);setData(request);}}>Review Delivery</Link>
                                </div>
                             </td>
                         </tr>
                     </tbody>
                    )) : (<EmptyList name="Ready to Review" heading="list" />)}
                </table>
            </div>
            <ReviewDelivery show={isshow} handleClose={()=> {setIsshow(false);}} detail={data}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        feedbacklists: state.requests.feedbacklists,
    };
};
export default connect(mapStateToProps)(ReviewRequest);
