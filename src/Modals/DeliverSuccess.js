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
                    <h5><span className="fw-bold">{user?.name}</span><span className="fw-500">, you succesfully delivered</span></h5>
                    <h5 className="fw-bold">{data?.request_name}</h5>
                    <p className="">
                       Well done! Files are being reviewed, just sit back and relax.
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
