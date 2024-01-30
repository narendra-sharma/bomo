import React from 'react';
import designImage from "../../images/nine-sixteen.png";
import designImage2 from "../../images/sixteen-nine.png";
import designImage3 from "../../images/sixteen-nine2.png";
import { useEffect } from 'react';
import { get_approve_delivery_list } from '../../reduxdata/rootAction';
import { useDispatch, connect } from 'react-redux';
import ColorCode from '../../Common/ColorCode';
import { format } from 'date-fns';
import { useState } from 'react';
import ExpandRequest from '../../Modals/ExpandRequest';

const ApproveDelivery = ({ user, approvelist }) => {
    const [show,setShow]=useState(false);
    const dispatch = useDispatch();
    console.log(approvelist);
    useEffect(() => {
        get_approve_delivery_list(user?.token, dispatch);
    }, [dispatch]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <small className="text-muted fw-bold">
                    5 requests left{" "}
                </small>
            </div>
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        {approvelist?.map((request) => (
                            <tbody>
                                <tr>
                                    <td>
                                        <p>12h</p>
                                    </td>
                                    <td className="text-center">
                                        <ColorCode request={request} />
                                    </td>
                                    <td>
                                        <p>
                                            <span className="fw-bold">Cratat</span>{" "}
                                            <span className="d-block">{request?.request_name}</span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span className="fw-bold">Delivery</span>{" "}
                                            <span className="d-block">{!request?.delivery_date
                                                ? "No Date"
                                                : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <p>
                                            <span onClick={() => setShow(true)}>Expand Request</span>{" "}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                            <div className="delivery-status fw-bold">
                                                <p>9:16</p>
                                            </div>
                                            <div className="bar-code">
                                                <img src={designImage} alt="Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                            <div className="delivery-status fw-bold">
                                                <p>16:9</p>
                                            </div>
                                            <div className="bar-code">
                                                <img src={designImage2} alt="Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="statusbar-section d-flex align-items-center justify-content-between">
                                            <div className="delivery-status fw-bold">
                                                <p>.aep</p>
                                            </div>
                                            <div className="bar-code">
                                                <img src={designImage3} alt="Image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-outline-success rounded-pill">
                                                Approve Delivery
                                            </button>
                                            <i className="fa-solid fa-circle-xmark cancel"></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <ExpandRequest show={show} handleClose={() => setShow(false)} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        approvelist: state.requests.superadminapprovelist,
    };
};
export default connect(mapStateToProps)(ApproveDelivery);