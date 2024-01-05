import axios from "axios";
import { LOG_OUT, SET_USER_TYPE, USER_UPDATE } from "./userTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

export const catch_errors_handle = (error, dispatch) => {
  if (error.response) {
    if (error.status === 401) {
      dispatch(set_update_user(null));
      localStorage.removeItem("userDetails");
      localStorage.clear();
      window.location.reload();
    }
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message);
  }
};

export const signup = async (user, role, navigate, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/signup/${role.toLowerCase()}`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const res = await axios.post(url, user, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data.message);
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const login = async (user, role, dispatch) => {
  role = role.toLowerCase();
  role = role.replace(" ", "");
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/login`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(url, user, HEADERS);
    if (res.data && res.data.status) {
      if (res.data.data.role === role) {
        toast.success("Successfully user logged-in!");
        dispatch(set_update_user(res.data.data));
      } else {
        toast.error("Invalid credential.");
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
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
  localStorage.setItem("userDetails", JSON.stringify(user));
  return {
    type: USER_UPDATE,
    payload: user,
  };
};

export const forgot_password_reset = async (email, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/forgot-password`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(url, email, HEADERS);
    if (res.data && res.data.status) {
      toast.success("Please check your email inbox!!");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const reset_password = async (
  newPassword,
  token,
  navigate,
  dispatch
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}auth/reset-password/${token}`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      url,
      { password: newPassword.password },
      HEADERS
    );
    if (res.data && res.data.status) {
      toast.success("Successfully updated password!");
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const update_password = async (
  newPassword,
  token,
  navigate,
  dispatch
) => {
  try {
    const url = `${REACT_APP_BOMO_URL}profile/update-password`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const res = await axios.post(
      url,
      {
        currentPassword: newPassword.currentUserPassword,
        newPassword: newPassword.newUserPassword,
      },
      HEADERS
    );
    if (res.data && res.data.status) {
      toast.success("Successfully Change password!");
      navigate("/setting");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  }
};

export const profile_update = async (data, token, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}profile/update`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const res = await axios.post(url, { name: data.name }, HEADERS);
    if (res.data && res.data.status) {
      toast.success("Successfully Update Profile!");
      dispatch(set_update_user({...res.data.data,token:token}));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
export const delete_account = async (token, navigate, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}user/delete`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const res = await axios.post(url, {}, HEADERS);
    if (res.data && res.data.status) {
      localStorage.removeItem("userDetails");
      localStorage.clear();
      dispatch(set_update_user(null));
      toast.success("Successfully deleted account!");
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
