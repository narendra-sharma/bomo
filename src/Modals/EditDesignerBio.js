import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { edit_designer_info } from "../reduxdata/rootAction";
import { connect, useDispatch } from "react-redux";


const EditDesignerBio = ({ data, show, handleClose, user }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        bio: '',
        website: '',
        instagram: '',
        behance: '',
    });
    const [errors, setErrors] = useState({
        bio: '',
        website: '',
        instagram: '',
        behance: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: value === '' ? `${name} is Required` : null });
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit =  (e) => {
        e.preventDefault();
        
        const checkerrors = {};
        Object.keys(formData).forEach((name)=> {
            if(formData[name]===''){
                checkerrors[name] = `${name} is Required`;
            }
        });
        setErrors(checkerrors);
        if(Object.keys(checkerrors).length>0){
            return;
        }
        const designerdata = {
            bio: formData.bio,
            website: formData.website,
            instagram: formData.instagram,
            behance: formData.behance
        };
        edit_designer_info(dispatch, user?.token, designerdata);
        handleClose();
    }

    useEffect(()=> {
        if(user){
            setFormData({
                bio: user?.bio,
                website: user?.website,
                instagram: user?.instagram,
                behance: user?.behance, 
            })
        };
    },[user]);

    useEffect(() => {
        return () => {
            setErrors({ bio:null, instagram:null, website:null, behance:null});
        };
    },[show]);
    return (
        <>
            <Modal show={show} onHide={handleClose} className="logout-popup">
                <Modal.Header className="pt-4" closeButton>
                    <Modal.Title><h5 className="mb-0 text-dark fw-bold">Update Detail</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <form class="mb-4">
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="bio" className="form-control" placeholder="bio" defaultValue={formData.bio} onChange={handleInputChange} />
                                {errors.bio && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.bio}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="website" className="form-control" placeholder="website" defaultValue={formData.website} onChange={handleInputChange} />
                                {errors.website && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.website}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="instagram" className="form-control" placeholder="instagram" defaultValue={formData.instagram} onChange={handleInputChange} />
                                {errors.instagram && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.instagram}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="behance" className="form-control" placeholder="behance" defaultValue={formData.behance} onChange={handleInputChange} />
                                {errors.behance && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.behance}</p>}
                            </div>
                        </div>
                    </form>
                    <div className="text-end">

                        <Button variant="secondary" className="rounded-pill px-4" onClick={() => handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" className="rounded-pill px-4 ms-3" onClick={(e) => handleSubmit(e, formData)} >
                            Update Bio
                            {/* {isLoading ? 'Updating.....' : 'Update Password'} */}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
    };
  };

export default connect(mapStateToProps)(EditDesignerBio);

