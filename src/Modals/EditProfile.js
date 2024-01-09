import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { profile_update } from "../reduxdata/rootAction";
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const EditProfile = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: '',
  });

  const [usernameError, setUsernameError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === '') {
      setUsernameError('Username is Required');
    } else {
      setUsernameError(null);
    }

    if (formData.username) {
            const tokendata = JSON.parse(localStorage.getItem('userDetails'));
           const usertoken = tokendata.token;
           const userDataForm = {
             name: formData.username,
           }
        await profile_update(
          userDataForm,
          usertoken,
          navigate,
          dispatch
        );
        handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      setUsernameError(value === '' ? 'Username is Required' : null);
    }
  };

  useEffect(() => {
    if (show) {
      const storedUsername = JSON.parse(localStorage.getItem('userDetails'));
      setFormData({
        username: storedUsername.name || '',
      });
      setUsernameError(null);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="logout-popup py-3">
        <Modal.Header className="pt-4" closeButton>
          <Modal.Title><h5 className="mb-0 text-dark fw-bold">Edit Profile</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form_control"
                placeholder="Username"
              />
              {usernameError ? <p class="mt-1 error fw-bold">{usernameError}</p> : null}
            </div>
          </form>
          <div className="text-end">
            <Button variant="secondary"  className ="rounded-pill px-4" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className ="rounded-pill px-4 ms-3" onClick={(e) => handleSubmit(e, formData)}>
              Update Profile
            </Button>
          </div>
          </Modal.Body>
      </Modal>
    </>
  );
};

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