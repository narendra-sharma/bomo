import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ColorCode from '../../Common/ColorCode';
import { format } from 'date-fns';

const ReviewRequest = ({ feedbacklists }) => {
    return (
        <div className="review-content bg-white px-3 px-md-5 py-5 rounded">
            <div className="table-responsive">
                <table className="table table-borderless">
                    {feedbacklists?.design_for_review?.map((request) => (
                        <tbody>
                            <tr>
                                <td className="text-center"><ColorCode request={request} /></td>
                                <td><p>DIOR</p></td>
                                <td><p><span className="fw-bold">Status</span> <span className="d-block">{request?.status}</span></p></td>
                                <td><p><span className="fw-bold">Delivery</span> <span className="d-block">{!request?.delivery_date ? 'No Date' : format(new Date(request?.delivery_date),'dd/MM/yyyy')}</span></p></td>
                                <td><p><span className="fw-bold">Request by</span> <span className="d-block">Pepín Noob</span></p></td>
                                <td className="pull-right"> <div className="review-delivery"><Link className="rounded-pill text-decoration-none">Review Delivery</Link></div></td>
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
        feedbacklists: state.requests.feedbacklists,
    };
};
export default connect(mapStateToProps)(ReviewRequest);
