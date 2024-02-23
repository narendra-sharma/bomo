import React from "react";
import { Modal } from "react-bootstrap";
import reelImage from "../images/reel-image.png";
import ColorCode from "../Common/ColorCode";
import { useDispatch, connect } from 'react-redux';
import { image_download, poll_request_apply } from "../reduxdata/rootAction";
import FileSaver, { saveAs } from "file-saver";

// const reelImage = React.lazy(() => import('../images/reel-image.png'));
const { REACT_APP_BOMO_URL } = process.env;

const RequestDetails = ({ show, handleClose, data, user, filePath }) => {
    const dispatch = useDispatch();
    const handleApplyRequest = (requestdata) => {
        let applyrequest = requestdata._id;
        poll_request_apply(applyrequest, dispatch, user?.token);
        handleClose();
    };

    const handleDownload = async (imageUrl) => {
        // const downloadUrl = `${imageUrl}`;
        // const imagefile = await image_download(dispatch, downloadUrl);

        fetch(`${REACT_APP_BOMO_URL}${imageUrl}`,
            { mode: 'no-cors' })
            .then(response => response.blob())
            .then(blob => {
                var blob = new Blob([blob], {type: "image/*"});
                FileSaver.saveAs(blob, "hello world.txt");
            });

        // const response = await fetch(imagefile);
        // const blob = await response.blob();
        // const blobWithType = new Blob([blob]);

        // const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        // saveAs(blobWithType, filename);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" className="designer-request-poll">
            <Modal.Body>
                <div className=" px-5 py-5 px-md-5 review-content ">
                    <div className="row align-items-center">
                        <div className="col-md-7 col-12 mb-4 designer-active-request">
                            <span class="deadline-date status position-relative ps-3">Selection in <span class="fw-bold"><span>14 hour</span></span></span>
                        </div>
                        <div className="col-md-5 col-12 mb-4">
                            <div class="d-flex justify-content-end align-items-center designer-active-request ">
                                <p>{data?.designer_list?.length} applications</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-12">
                            <div className="mb-4">
                                <h2 className="h3 fw-bold">{data?.request_name}</h2>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <ColorCode request={data} />
                                <p class="short0ad dor rounded-pill">{data?.brand_profile?.brandname}</p>
                                <p className="brand-assets-btn rounded bg-white request-poll-active" onClick={() => handleDownload(`${data?.brand_profile?.brandassests}`)}>Brand Assets</p>
                            </div>
                        </div>
                        <div className="col-md-6 delivery-date-content">
                            <div class="text-end mb-3">
                                <div className="d-flex justify-content-end align-items-center">
                                    <div><span class="fw-bold"> Delivery Date</span>
                                        <span class="d-block">Mon 10 - 9:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3 position-relative">
                                <img src={reelImage} alt="reel imag" width="100%" />
                                <div className="project-btn">
                                    <div class="project-assets-btn mt-4 fw-bold  rounded-pill px-3 py-1 text-center" onClick={() => handleDownload(`${data?.brand_profile?.logo}`)}>
                                        Project Assets
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                    <thead>
                                        <th style={{ width: "240px" }}><p>Description</p></th>
                                        <th style={{ width: "105px" }}><p><span className="fw-bold d-block">Reference</span> </p></th>
                                        <th style={{ width: "100px" }}><p><span className="fw-bold d-block">Deliverables</span></p></th>
                                        <th style={{ width: "100px" }}><p><span className="fw-bold d-block">Format</span></p> </th>
                                        <th><p><span className="fw-bold d-block">Alpha Background</span></p> </th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span className="d-block">{data?.description}</span>
                                                </p>
                                            </td>
                                            <td><p><span className="fw-bold d-block">{data?.references}</span> </p></td>
                                            <td><p><span className="fw-bold d-block">{data?.size}</span></p></td>
                                            <td><p><span className="fw-bold d-block">{data?.file_type}</span></p> </td>
                                            <td><p>{data?.transparency}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 row justify-content-between">
                                <div className="col-md-8 status-btn">
                                    <button className="btn pause-btn rounded py-1 w-100" onClick={() => handleApplyRequest(data)}>APPLY</button>
                                </div>
                                <div className="col-md-4"><h5 class="fw-bold mb-0 text-end">$125</h5></div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        filePath: state.requests.filePath
    };
};
export default connect(mapStateToProps)(RequestDetails);



