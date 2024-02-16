import React from 'react'
import { Modal } from 'react-bootstrap';
import pay_success from '../images/pay_success.png';
import { connect } from 'react-redux';

const DeliverSuccess = ({show,handleClose,data,user}) => {
    return (
        <Modal show={show} onHide={handleClose} className="logout-popup">
            <Modal.Body>
            <div className="px-4 py-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <img src={pay_success} alt='img not found' />
                    </div>
                    <span className="mb-0 fw-bold ">{user?.name}</span><span>, you succesfully delivered</span>
                    <h6 className="mb-5 text-dark">{data?.request_name}</h6>
                    <p className="text-mute">
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
      user: state.auth.user
    };
  };
  
export default connect(mapStateToProps)(DeliverSuccess);
