import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { get_admin_assign_requestlist, get_admin_pending_requestlist, get_edit_request_data, superadmin_approve_delivery } from "../reduxdata/rootAction";

const RejectRequest = ({ show, handleClose, detail, user, reqstatus, onRejected }) => {
    const dispatch = useDispatch();
    const [formdata,setFormdata] = useState({
        message:''
    });

    const [errors,setErrors]=useState({
        message: ''
    });

    const handleInputChange = (e) => {
        const {name,value}=e.target;
        setErrors({...errors, [name]:value===''?'Specify your needs':null});
        setFormdata({...formdata, [name]:value});
    };

    const handleSubmit = async (e,status) => {
        e.preventDefault();
        const checkerrors={};
        Object.keys(formdata).forEach((name)=> {
            if(formdata[name]===''){
                checkerrors[name]='Specify your needs';
            }
        });
        setErrors(checkerrors);
        if(Object.keys(checkerrors).length>0){
            return;
        }
        const specifyData = { 
            _id: detail._id,
            deliverystatus: status,
            message: formdata.message
        };
        await superadmin_approve_delivery(dispatch,user?.token,specifyData,reqstatus);
        dispatch(get_edit_request_data(detail));
        
        setTimeout(() => {
            get_admin_pending_requestlist(dispatch, user?.token);
            get_admin_assign_requestlist(dispatch, user?.token);
            dispatch(get_edit_request_data(null));
         },3000);
        handleClose();
    };

    useEffect(() => {
        return () => { setFormdata({message:''}); setErrors({ message:null}); };
    },[show]);
    
    return (
        <Modal show={show} onHide={handleClose}  className="logout-popup rejected-popup modal-border">
            <Modal.Body>
                <div className="px-4 py-4">
                    <h5 className="mb-0 fw-bold">Specify what needs to be adjusted</h5>
                    <div className="form-group col-md-12 mt-2">
                        <textarea type="text" name="message" className="form-control bg-light-white" value={formdata.message} onChange={handleInputChange}></textarea>
                        {errors.message && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.message}</p>}
                    </div>
                    <div className="d-flex gap-2 mt-3">
                        <div className="col-md-6">
                            <Button
                                variant="light"
                                className="w-100 rounded-pill btn-outline-dark"
                                onClick={(e) => handleSubmit(e,'rejected')}
                            >
                                Send Reject
                            </Button>
                        </div>
                        <div className="col-md-6">
                            <Button
                                variant="light"
                                className="w-100 rounded-pill btn-outline-dark"
                                onClick={() => handleClose()}
                            >
                                No
                            </Button>
                        </div>
                    </div>
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
export default connect(mapStateToProps)(RejectRequest);


