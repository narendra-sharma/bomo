import React from 'react'
import { Modal } from 'react-bootstrap';
import pay_success from '../images/pay_success.png';
import { connect } from 'react-redux';

const RequestSuccess = ({view,viewClose,datadetail,newrequest}) => {
    return (
        <Modal show={view} onHide={viewClose} className="logout-popup">
            <Modal.Body>
                <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <span className="mb-0 fw-bold ">{datadetail?.name}</span><span>, you succesfully created</span>
                    <h5 className="mb-2">{newrequest?.request.request_name}</h5>    
                    <p className="">
                        We are reviewing the assests,
                        <br />
                       we'll only let you if any layer is missing
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => {
    return {
        newrequest: state.requests.newrequest
    }
}

export default connect(mapStateToProps)(RequestSuccess);
