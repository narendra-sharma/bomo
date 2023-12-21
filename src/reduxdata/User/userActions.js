import axios from "axios";
import { LOG_OUT, SET_USER_TYPE, USER_UPDATE } from "./userTypes";
import { toast } from "react-toastify";
import { startLoading, stopLoading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

export const signUp = async (user, role, navigate, dispatch) => {
  dispatch(startLoading());
  try {
    const url = `${REACT_APP_BOMO_URL}signup/${role.toLowerCase()}`;
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
    dispatch(stopLoading());
  }
};

export const logIn = async (user, dispatch) => {
  dispatch(startLoading());
  try {
    const url = `${REACT_APP_BOMO_URL}login`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post(url, user, HEADERS);
    if (res.data && res.data.status) {
      toast.success('Successfully user logged-in!');
      localStorage.setItem('userDetails', JSON.stringify(res.data.data));
      dispatch(setUpdateUser(res.data.data));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    dispatch(stopLoading());
  }
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const setUserType = (usertype) => {
  return {
    type: SET_USER_TYPE,
    payload: usertype,
  };
};

export const setUpdateUser = (user) => {
  return {
    type: USER_UPDATE,
    payload: user,
  };
}

export const forgotPasswordReset = async (email, dispatch) => {
  dispatch(startLoading());
  try {
    const url = `${REACT_APP_BOMO_URL}forgot-password`;
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
    dispatch(stopLoading());
  }
};

export const resetPassword = async (newPassword, token, navigate, dispatch) => {
  dispatch(startLoading());
  try {
    const url = `${REACT_APP_BOMO_URL}reset-password/${token}`;
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
    dispatch(stopLoading());
  }
};
