import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { assign_admin_request, deliever_request_details, get_admin_assign_requestlist } from "../../reduxdata/rootAction";
import EmptyList from "../../Common/EmptyList";
import ColorCode from "../../Common/ColorCode";
import { format } from "date-fns";
import CustomPagination from "../../Common/CustomPagination";
import ViewAsDesigner from "../../Modals/ViewAsDesigner";
import ExpandRequest from '../../Modals/ExpandRequest';

const AssignRequest = ({ assignrequests, user, totalassigns }) => {
    const dispatch = useDispatch();
    const [assignData, setAssignData] = useState([]);
    const [view, setView] = useState(null);
    const [show, setShow] = useState(false);
    const [expand, setExpand] = useState(false);
    const [reqdata, setReqdata] = useState({});
    const handleDesignerClick = (designer, requestId) => {
        if (assignData.find(request => request._id === requestId)) {
            const updatedAssignData = assignData.map(request => {
                if (request._id === requestId) {
                    if (!request.top_designers) {
                        request.top_designers = [];
                    }

                    const isDesignerinToplist = request.top_designers.some(d => d._id === designer._id);
                    if (isDesignerinToplist) {
                        request.top_designers = request.top_designers.filter(d => d._id !== designer._id);
                        console.log(request?.top_designers);
                        if (request.primary_designer.includes(designer._id)) {
                            request.primary_designer = request.primary_designer.filter(d => d !== designer._id);
                        } else if (request.backup_designer.includes(designer._id)) {
                            request.backup_designer = request.backup_designer.filter(d => d !== designer._id);
                        }
                    } else {
                        request.top_designers.push(designer);
                    }

                    // request.primary_designer = request.primary_designer.filter(d => d._id !== designer._id);
                    // request.backup_designer = request.backup_designer.filter(d => d !== designer._id);
                    if (request.top_designers.length <= 6) {
                        console.log("Top Designers",request?.top_designers);
                        request.top_designers.forEach((designer,index) => {
                            if (index < 3) {
                                const primarydesigners = request.top_designers.slice(0, 3).map((item) => item?._id);
                                request.primary_designer = primarydesigners;
                                console.log(request.primary_designer);
                            } else if (index >= 3 && index < 6) {
                                const backupdesigners = request.top_designers.slice(3).map((item) => item?._id);
                                request.backup_designer = backupdesigners;
                                console.log(request?.backup_designer);
                            }
                        });

                        // if (request.primary_designer.length < 3) {
                        //     request.primary_designer.push([...new Set([...request.primary_designer, designer._id])]);
                        // } else if (request.primary_designer.length >= 3 && request.primary_designer.length < 6) {
                        //     request.backup_designer.push([...new Set([...request.backup_designer, designer._id])]);
                        // }
                        // request.top_designers = [...new Set([...request.top_designers, designer])];
                    }
                }
                return request;
            });
            setAssignData(updatedAssignData);
        }
    };

    const handleAssignrequest = (requestdetail) => {
        const PrimaryDesigners = [...new Set([...requestdetail.primary_designer.flat(Infinity)])];
        const BackupDesigners = [...new Set([...requestdetail.backup_designer.flat(Infinity)])];

        const assignRequestData = {
            request_id: requestdetail._id,
            primary_designer: PrimaryDesigners,
            backup_designer: BackupDesigners
        }
        assign_admin_request(assignRequestData, dispatch, user?.token);
    };

    useEffect(() => {
        get_admin_assign_requestlist(dispatch, user?.token, 1, 10);
    }, [dispatch, user?.token]);

    useEffect(() => {
        setAssignData(assignrequests);
    }, [assignrequests]);

    return (
        <>
            <div className="review-content bg-white px-3 px-md-4 py-3 rounded mb-3 design-list-section">
                <div className="row">
                    <div className="col-lg-12">
                        <small className="text-muted fw-bold">
                            {totalassigns} requests left{" "}
                        </small>
                    </div>
                </div>
                {totalassigns > 0 ? assignData?.map((request, index) => (
                    <div className="row" key={index}>
                        <div className="col-lg-6">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>12h</p>
                                            </td>
                                            <td className="text-center" style={{ width: "120px" }}>
                                                <ColorCode request={request} />
                                            </td>
                                            <td style={{ width: "77px" }}>
                                                <p>
                                                    <span className="fw-bold">Delivery</span>{" "}
                                                    <span className="d-block">{!request?.delivery_date
                                                        ? "No Date"
                                                        : format(new Date(request?.delivery_date), 'dd/MM/yyyy')}</span>
                                                </p>
                                            </td>
                                            <td style={{ width: "100px" }}>
                                                <p>
                                                    <span className="fw-bold">{request?.user_id?.company}</span>{" "}
                                                    <span className="d-block">{request?.request_name}</span>
                                                </p>
                                            </td>
                                            <td style={{ width: "120px" }}>
                                                <p>
                                                    <span className="cursor-pointer" onClick={() => { setExpand(true); dispatch(deliever_request_details(request)); }}>Expand Request</span>{" "}
                                                </p>
                                            </td>
                                            <td style={{ width: "137px" }}>
                                                <div className="d-flex align-items-center gap-1">
                                                    <p>
                                                        Assign Designers{" "}

                                                    </p>
                                                    <p><i className="fa-solid fa-chevron-right pr-0"></i></p>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <p className="text-center mb-1">Top 6 Talent</p>
                            <ul className="talented-designer  rounded list-unstyled">
                                {request?.top_designers?.map((item) =>
                                (<li className="mb-1" key={item._id}>
                                    <Link className="text-decoration-none text-dark fw-bold">
                                        <p>
                                            <i className="fa-solid fa-check-circle text-success" onClick={() => handleDesignerClick(item, request._id)}></i>{" "}
                                            <span onClick={() => { setView(item); setShow(true); }}>{item?.name}</span>
                                        </p>
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <ul className="talented-designer designer-list rounded list-unstyled">
                                {request.designer_list.map((item) => (
                                    <li className="mb-1">
                                        <Link className="text-decoration-none text-dark fw-bold">
                                            <p onClick={() => { setView(item); setShow(true); }}>
                                                <i className={request?.top_designers?.some(d => d._id === item._id) ? "fa-solid fa-check-circle text-success" : "fa-solid fa-circle-minus"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDesignerClick(item, request._id)
                                                    }}></i>{" "}
                                                {item?.name}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {request?.top_designers?.length > 0 ? <div className="col-lg-1 align-self-center">
                            <button className="btn btn-sm btn-outline-dark rounded-pill" onClick={() => handleAssignrequest(request)}>
                                Assign
                            </button>
                        </div> : ""}
                    </div>)) : <EmptyList name="Assign Request" />}

            </div>
            <ExpandRequest show={expand} handleClose={() => { setExpand(false); dispatch(deliever_request_details(null)); }} reqtype='assign' />
            {totalassigns > 0 && (
                <CustomPagination
                    total={totalassigns}
                    onPageChange={(newPage, newLimit) => {
                        get_admin_assign_requestlist(dispatch, user?.token, newPage, newLimit);
                    }}
                />
            )}
            <ViewAsDesigner view={view} show={show} handleClose={() => { setShow(false); setView(null); }} />
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
