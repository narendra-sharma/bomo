import axios from "axios";
import { LOG_OUT, SET_USER_TYPE, USER_UPDATE } from "./userTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

export const signup = async (user, role, navigate, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/signup/${role.toLowerCase()}`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const res = await axios.post(url, user, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data.message);
      navigate('/login');
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    dispatch(stop_loading());
  }
};

export const login = async (user,role,dispatch) => {
  role=role.toLowerCase();
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/login`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post(url, user, HEADERS);
    if (res.data && res.data.status) {
      if(res.data.data.role===role){
        toast.success('Successfully user logged-in!');
        localStorage.setItem('userDetails', JSON.stringify(res.data.data));
        dispatch(set_update_user(res.data.data));
      }else{
        toast.error('Invalid credential.');
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(stop_loading());
  }
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const set_user_type = (usertype) => {
  return {
    type: SET_USER_TYPE,
    payload: usertype,
  };
};

export const set_update_user = (user) => {
  return {
    type: USER_UPDATE,
    payload: user,
  };
}

export const forgot_password_reset = async (email, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/forgot-password`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post(url, email, HEADERS);
    if (res.data && res.data.status) {
      toast.success('Please check your email inbox!!');
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(stop_loading());
  }
};

export const reset_password = async (newPassword, token, navigate, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/reset-password/${token}`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post(url,{password:newPassword.password}, HEADERS);
    if (res.data && res.data.status) {
      toast.success('Successfully updated password!');
      navigate('/login');
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(stop_loading());
  }
};