import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { review_delivery_request_customer_admin } from "../reduxdata/rootAction";


const FeedBackSubmit = ({ show, handleClose, details, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, setFormdata] = useState({
        feedback: ''
    });
    const [errors, setErrors] = useState({
        feedback: ''
    });
    const [data,setData] = useState(null);
    useEffect(() => {
        setData({
            _id: details?._id,
            request_name: details?.request_name,
            request_type: details?.request_type, 
            delivery_date: details?.delivery_date,
            description: details?.description,
            size: details?.size,
            file_type: details?.file_type,
            transparency: details?.transparency,
            references: details?.references,
            brandname: details?.brand_profile?.brandname,
            status: 'rejected'
        });
    },[details]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: value === '' ? 'Specify what needs to be modified' : null });
        setFormdata({ ...formdata, [name]: value });
    };

    const handleFeedback = (e,status) => {
        e.preventDefault();
        const checkerrors = {};
        Object.keys(formdata).forEach((name) => {
            if (formdata[name] === '') {
                checkerrors[name] = 'Specify what needs to be modified'
            }
        });
        setErrors({...errors, checkerrors});
        if (Object.keys(checkerrors).length>0) {
            return;
        }
        const specifyData = {
            _id: details._id,
            reviewstatus: status,
            message: formdata.feedback
        };
        review_delivery_request_customer_admin(dispatch, user?.token, specifyData);
    };
    console.log(data);
    const handleRequest = () => {
        navigate('/request-expand', { state: data });
        console.log(data);
    };

    useEffect(() => {
        return () => { setFormdata({ feedback: '' }); setErrors({ feedback: null }); };
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose} size="xl" className="logout-popup">
            <Modal.Body className="py-5">
                <div className="py-5 px-60 ">
                    <div className="w-50 m-auto my-5">
                        <h5 className="mb-0 fw-bold">Specify what needs to be modified</h5>
                        <textarea name="feedback" className="form-control feedback-submit-popup extra-grren rounded border border-dark my-4 p-4 w-100"
                            placeholder="Is the animation true to the brief? 
                              Are color changes needed?
                              Fonts and typography need adjustments?
                              Flow, timing, clarity. The more specific the better." value={formdata.feedback} onChange={handleInputChange}>
                        </textarea>
                        {errors.feedback && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.feedback}</p>}
                        <div className="d-flex gap-3 justify-content-center mt-3 pt-4">
                            <div className="col-md-8">
                                <Button variant="light" className="w-100 rounded-pill btn-outline-dark" onClick={(e) => {handleFeedback(e,'rejected');handleRequest();}}>
                                    Add Feedback
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};
export default connect(mapStateToProps)(FeedBackSubmit);