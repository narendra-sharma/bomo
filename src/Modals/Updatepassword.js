import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Button, Modal } from "react-bootstrap"
import { update_password } from "../reduxdata/rootAction";
import { connect } from 'react-redux';

const Updatepassword = ({show, handleClose}) => {
//   let [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });
  const [passworderror, setPassworderror] = useState(null);
  const [newpassworderror, setNewpassworderror] = useState(null);
  const [confirmpassworderror, setconfirmPassworderror] = useState(null);

const navigate = useNavigate();
//   const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.oldpassword === '') {
      setPassworderror('Old Password is Required*');
    } else {
      setPassworderror(null)
    }

    if (formData.newpassword ==='') {
        setNewpassworderror("New Password is Required*");
    }else if (formData.newpassword.length < 5) {
        setNewpassworderror("Password length should be more than 5*")
      } else {
        setNewpassworderror(null);
    }

    if (formData.confirmpassword ==='') {
        setconfirmPassworderror("Confirm your password*");
    } else if (formData.confirmpassword !== formData.newpassword) {
        setconfirmPassworderror("Password doesn't match*");
    } else {
        setconfirmPassworderror(null);
    }

    if ((formData.newpassword === formData.confirmpassword) && (formData.oldpassword)) {
      try {
           const tokendata = JSON.parse(localStorage.getItem('userDetails'));
           const usertoken = tokendata.token;
           const userDataForm = {
             currentUserPassword: formData.oldpassword,
             newUserPassword: formData.newpassword
           }
        await update_password(
          userDataForm,
          usertoken,
          navigate
        );
        console.log('Password changed!');
        handleClose();
      } catch (error) {
        console.error('Error updating password:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'oldpassword') {
        setPassworderror(value === '' ? 'Old Password is Required*' : null);
      } else if (name === 'newpassword') {
        setNewpassworderror(value === '' ? 'New Password is Required*' : null);
        if(value === formData.oldpassword){
          setNewpassworderror('Create Different Password*')
      } else if (value.length < 5) {
          setNewpassworderror("Password length should be more than 5*");
        } else {
          setNewpassworderror(null);
        }
      } else if (name === 'confirmpassword') {
        setconfirmPassworderror(value === '' ? 'Confirm your password*' : null);
        if (value !== formData.newpassword) {
          setconfirmPassworderror("Password doesn't match*");
        } else {
          setconfirmPassworderror(null);
        }
      }
  };

  useEffect(() => {
    if (!show) {
      setFormData({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
      });
      setPassworderror(null);
      setNewpassworderror(null);
      setconfirmPassworderror(null);
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                <div className="mb-3">
                  <input type="password" name="oldpassword" value={formData.oldpassword} onChange={handleInputChange} className="form-control form-control-lg" placeholder="Old Password" />
                  {passworderror ? <p>{passworderror}</p> : null}
                </div>
                <div className="mb-3">
                  <input type="password" name="newpassword" value={formData.newpassword} onChange={handleInputChange} className="form-control form-control-lg" placeholder="New Password" />
                  {newpassworderror ? <p>{newpassworderror}</p> : null}
                </div>
                <div className="mb-3">
                  <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} className="form-control form-control-lg" placeholder="Confirm Password" />
                  {confirmpassworderror ? <p>{confirmpassworderror}</p> : null}
                </div>
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e, formData)}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = () => {
  return {
    update_password,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Updatepassword);

