import axios from "axios";
import { GET_PROFILE_DETAILS, GET_SINGLE_DESIGNER_DETAILS, LOG_OUT, SET_USER_TYPE, USER_UPDATE } from "./userTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;
export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
export const catch_errors_handle = (error,dispatch) => {
  if (error.response) {
    toast.error(error.response.data.message);
    if (error.response.status === 401) {
      localStorage.removeItem("userDetails");
      dispatch(set_update_user(''));
    }
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
    dispatch(catch_errors_handle(error,dispatch));
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
      if (
        res?.data?.data?.role === "Team Member" ||
        res?.data?.data?.role === "team_member" ||
        res.data.data.role === role
      ) {
        if (
          res?.data?.data?.role === "Team Member" ||
          res?.data?.data?.role === "team_member"
        ) {
          dispatch(set_user_type("Team Member"));
          localStorage.setItem("USERTYPE", JSON.stringify("Team Member"));
        }
        toast.success("Successfully user logged-in!");
        dispatch(set_update_user(res.data.data));
      } else {
        toast.error("Invalid credential.");
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};



export const set_user_type = (usertype) => {
  return {
    type: SET_USER_TYPE,
    payload: usertype,
  };
};

export const set_update_user = (user) => {
  if(user?.subscription && user?.subscription?.length>0){
    let sub=user?.subscription?.find(r=>r.type==='primary');
    user.subscription=sub;
  }
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
    dispatch(catch_errors_handle(error,dispatch));
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
    dispatch(catch_errors_handle(error,dispatch));
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
      toast.success("Password changed successfully.");
      navigate("/settings");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
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
      toast.success("Profile updated successfully.");
      dispatch(set_update_user({...res.data.data,token:token}));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
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
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_single_designer_details = async (dispatch, userId, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/single_designer_detail?id=${userId}`;
    const HEADERS = {
      headers:{
        "x-access-token": token
      }
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_SINGLE_DESIGNER_DETAILS, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const edit_designer_info = async (dispatch, token, infodata) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}designer/editDetails`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,  
      },
    };
    const designerdata = {
      bio: infodata.bio,
      website: infodata.website,
      instagram: infodata.instagram,
      behance: infodata.behance
    };
    const res = await axios.put(url,JSON.stringify(designerdata),HEADERS);
    if (res.data && res.data.status){
      toast.success(res.data?.message);
      get_user_profile_details(token,dispatch);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_user_profile_details = async (token, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}profile/detail`;
    const HEADERS = {
      headers:{
        "x-access-token": token
      }
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_PROFILE_DETAILS, payload: res.data.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};


