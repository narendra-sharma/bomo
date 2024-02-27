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
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: value === '' ? `Bio is Required` : null });
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
            if(!formData?.bio || formData?.bio?.trim() ===''){
                setErrors({...errors, bio:'Bio is Required'});
                return;
            }
       
        const designerdata = {
            bio: formData.bio,
            website: formData.website,
            instagram: formData.instagram,
            behance: formData.behance
        };
         await edit_designer_info(dispatch, user?.token, designerdata);
        handleClose();
    };

    useEffect(()=> {
        if(show){
            setFormData({
                bio: data?.bio || '',
                website: data?.website || '',
                instagram: data?.instagram || '',
                behance: data?.behance || ''
            });
        };
        setErrors({ bio:''});
    },[show]);

    useEffect(() => {
        return () => {
            setErrors({ bio:null});
        };
    },[]);
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
                                <input type="text" name="bio" className="form-control" placeholder="bio" value={formData.bio} onChange={handleInputChange} />
                                {errors.bio && <p className="d-flex flex-start text-danger error-msg mb-1 mb-md-0">{errors.bio}</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="website" className="form-control" placeholder="website" value={formData.website} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="instagram" className="form-control" placeholder="instagram" value={formData.instagram} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-row position-relative">
                                <input type="text" name="behance" className="form-control" placeholder="behance" value={formData.behance} onChange={handleInputChange} />
                            </div>
                        </div>
                    </form>
                    <div className="text-end">

                        <Button variant="secondary" className="rounded-pill px-4" onClick={() => handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" className="rounded-pill px-4 ms-3" onClick={(e) => handleSubmit(e, formData)} >
                            Update Bio
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user
    };
  };

export default connect(mapStateToProps)(EditDesignerBio);

