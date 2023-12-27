import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { profile_update } from "../reduxdata/rootAction";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

const EditProfile = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: '',
  });

  const [usernameError, setUsernameError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === '') {
      setUsernameError('Username is Required*');
    } else {
      setUsernameError(null);
    }

    if (formData.username) {
        try {
            const tokendata = JSON.parse(localStorage.getItem('userDetails'));
           const usertoken = tokendata.token;
           const userDataForm = {
             name: formData.username,

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
    }
  };

  useEffect(() => {
    if (show) {
      const storedUsername = JSON.parse(localStorage.getItem('userDetails'));
      console.log(storedUsername.name);
      setFormData({
        username: storedUsername.name || '',
      });
      setUsernameError(null);
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