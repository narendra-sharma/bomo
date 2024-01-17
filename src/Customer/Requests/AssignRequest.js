import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { get_admin_assign_requestlist } from "../../reduxdata/rootAction";
import EmptyList from "../../Common/EmptyList";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";
import CustomPagination from "../../Common/CustomPagination";

const AssignRequest = ({ assignrequests, user, totalassigns }) => {
    const dispatch = useDispatch();
    const [topDesigners, setTopDesigners] = useState({});
    const [primaryDesigners, setPrimaryDesigners] = useState([]);
    const [backupDesigners, setBackupDesigners] = useState([]);

    const handleDesignerClick = useCallback((item,requestId) => {
        setPrimaryDesigners((prevPrimaryDesigners) => {
            const currentPrimaryDesigners = prevPrimaryDesigners[requestId] || [];
            if (currentPrimaryDesigners.length < 3 && !currentPrimaryDesigners.some(designer => designer._id === item._id)) {
                const newPrimaryDesigners = [...currentPrimaryDesigners,item];
                return {
                    ...prevPrimaryDesigners,
                    [requestId]: newPrimaryDesigners,
                }
            }
            return prevPrimaryDesigners;
        });

        setBackupDesigners((prevBackupDesigners) => {
            const currentBackupDesigners = prevBackupDesigners[requestId] || [];
            if (currentBackupDesigners.length > 3 && currentBackupDesigners.length <= 6 && !currentBackupDesigners.some(designer => designer._id === item._id)) {
                const newBackupDesigners = [...currentBackupDesigners,item];
                return {
                    ...prevBackupDesigners,
                    [requestId]: newBackupDesigners,
                };
            }
            return prevBackupDesigners;
        });

        setTopDesigners((prevTopDesigners) => {
            const currentTopDesigners = prevTopDesigners[requestId] || [];
            if (currentTopDesigners.length < 6 && !currentTopDesigners.some(designer => designer._id === item._id)) {
                const newTopDesigners = [...currentTopDesigners, item];
                return {
                    ...prevTopDesigners,
                    [requestId]: newTopDesigners,
                };
            }
            return prevTopDesigners;
        });
    }, []);
    console.log(backupDesigners);

    const handleAssign = (request) => {
        const requestData = {
            request_id: request._id,
            primary_designer: [topDesigners],
            backup_designer: [backupDesigners]
        }
        console.log("RequestData", requestData);
    }

    useEffect(() => {
        get_admin_assign_requestlist(dispatch, user?.token, 1, 5);
    }, [dispatch, user?.token]);

    return (
        <>
            {totalassigns > 0 ? assignrequests.map((request) => (
                <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3 design-list-section">
                    <div className="row">
                        <div className="col-lg-12">
                            <small className="text-muted fw-bold">
                                2 requests left{" "}
                            </small>
                        </div>
                        <div className="col-lg-5 g-0">
                            <div className="table-responsive">
                                <table className="table table-borderless">
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
                                                    <span className="fw-bold">Delivery</span>{" "}
                                                    <span className="d-block">{!request?.delivery_date
                                                        ? "No Date"
                                                        : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    <span className="fw-bold">{request.request_name}</span>{" "}
                                                    <span className="d-block">{request?.status}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    <span>Expand Request</span>{" "}
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    Assign Request{" "}
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <p className="text-center mb-1">Top 6 Talent</p>
                            <ul className="talented-designer  rounded list-unstyled">
                                {(topDesigners[request._id] || []).map((item) =>
                                (<li className="mb-1" key={item._id}>
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-circle-minus"></i>{" "}
                                            {item.name}
                                        </p>
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-5 g-0">
                            <ul className="talented-designer designer-list rounded list-unstyled">
                                {request.designer_list.map((item) => (
                                    <li className="mb-1">
                                        <Link className="text-decoration-none text-dark fw-bold"
                                            onClick={() => handleDesignerClick(item,request._id)}>
                                            <p>
                                                <i className="fa-solid fa-circle-minus"></i>{" "}
                                                {item.name}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-1 align-self-center">
                            <button className="btn btn-sm btn-outline-dark rounded-pill" onClick={() => handleAssign(request)}>
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )) : <EmptyList name="Assign Request" />}
            {totalassigns > 0 && (
                <CustomPagination
                    total={totalassigns}
                    onPageChange={(newPage, newLimit) => {
                        get_admin_assign_requestlist(dispatch, user?.token, newPage, newLimit);
                    }}
                />
            )}
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        assignrequests: state.requests.assignrequests,
        totalassigns: state.requests.totalassigns,
    };
};
export default connect(mapStateToProps)(AssignRequest);
