import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { superadmin_approve_delivery } from "../reduxdata/rootAction";

const RejectRequest = ({ show, handleClose, detail, user }) => {
    const dispatch = useDispatch();
    const [formdata,setFormdata] = useState({
        message:''
    });

    const [errors,setErrors]=useState({
        message: ''
    });

    const handleInputChange = (e) => {
        const {name,value}=e.target;
        setErrors({...errors, [name]:value===''?'Specify your Needs':null});
        setFormdata({...formdata, [name]:value});
    };

    const handleSubmit = (e,status) => {
        e.preventDefault();
        const checkerrors={};
        Object.keys(formdata).forEach((name)=> {
            if(formdata[name]===''){
                checkerrors[name]='Specify your Needs';
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
        superadmin_approve_delivery(dispatch,user?.token,specifyData);
        handleClose();
    };

    useEffect(() => {
        return () => { setFormdata({message:''}); setErrors({ message:null}); };
    },[show]);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="px-4 py-4">
                    <h4 className="mb-0">Specify what needs to be adjusted</h4>
                    <div className="form-group col-md-12 mt-2">
                        <input type="text" name="message" className="form-control" value={formdata.message} onChange={handleInputChange} />
                        {errors.message && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.message}</p>}
                    </div>
                    <div className="d-flex gap-2 mt-3">
                        <div className="col-md-6">
                            <Button
                                variant="success"
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


