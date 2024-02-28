import React from 'react'
import { Button, Modal } from "react-bootstrap";
import { approve_designer } from '../reduxdata/rootAction';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const ApproveDesigner = ({ isview, viewClose, details, user, designerstatus }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        approve_designer(user?.token,dispatch,details?.designer_detail?._id,designerstatus);
        viewClose();
    };

    return (
        <div>
            <Modal show={isview} onHide={viewClose} className="logout-popup approve-designer-popup">
                <Modal.Body>
                    <div className="px-4 py-4">
                        <h4 className="mb-0">{details?.designer_detail?.isDesignerApproved ? 'In-Active': 'Acitve'} {details?.name}</h4>
                        <p className="mt-2">do you really want to {details?.designer_detail?.isDesignerApproved ? 'In-Active': 'Acitve'}  {details?.name}</p>
                        <div className="d-flex gap-2 mt-5 pt-4">
                            <div className="col-md-6">
                                <Button
                                    variant="success"
                                    className="w-100 rounded-pill btn-outline-dark"
                                    onClick={handleSubmit}
                                >
                                    Yes
                                </Button>
                            </div>
                            <div className="col-md-6">
                                <Button
                                    variant="light"
                                    className="w-100 rounded-pill btn-outline-dark"
                                    onClick={() => {viewClose(); }}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isdesignerapprove: state.auth.isdesignerapprove
    }
};
export default connect(mapStateToProps)(ApproveDesigner);
