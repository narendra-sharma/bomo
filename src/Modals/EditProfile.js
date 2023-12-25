import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { profile_update } from "../reduxdata/rootAction";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

const EditProfile = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
  });

  const [usernameError, setUsernameError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === '') {
      setUsernameError('Username is Required*');
    } else {
      setUsernameError(null);
    }

    if (formData.role === '') {
      setRoleError('Role is Required*');
    } else {
      setRoleError(null);
    }
    if (formData.username && formData.role) {
        try {
            const tokendata = JSON.parse(localStorage.getItem('userDetails'));
           const usertoken = tokendata.token;
           const userDataForm = {
             name: formData.username,
             role: formData.role
           }
        await profile_update(
          userDataForm,
          usertoken,
          navigate
        );
        handleClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      setUsernameError(value === '' ? 'Username is Required*' : null);
    } else if (name === 'role') {
      setRoleError(value === '' ? 'Role is Required*' : null);
    }
  };

  useEffect(() => {
    if (!show) {
      setFormData({
        username: '',
        role: '',
      });
      setUsernameError(null);
      setRoleError(null);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-control form-control-lg"
                placeholder="Username"
              />
              {usernameError ? <p>{usernameError}</p> : null}
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-control form-control-lg"
                placeholder="Role"
              />
              {roleError ? <p>{roleError}</p> : null}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e, formData)}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// export default EditProfile;
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      user: state.auth.user,
    };
  };
  
  const mapDispatchToProps = () => {
    return {
        profile_update,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);