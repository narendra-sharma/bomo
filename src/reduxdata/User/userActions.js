import axios from "axios";
import {
  GET_OVERALL_STATS,
  GET_PROFILE_DETAILS,
  GET_SINGLE_DESIGNER_DETAILS,
  LOG_OUT,
  SET_SWITCH_TYPE,
  SET_USER_TYPE,
  UPLOAD_IMAGE_FILE_SUCCESS,
  USER_UPDATE,
} from "./userTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;
const roles = [
  { id: 1, label: "Admin", value: "customer_admin" },
  { id: 2, label: "Member", value: "customer" },
];
export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
export const catch_errors_handle = (error, dispatch) => {
  if (error.response) {
    toast.error(error.response.data.message, {
      toastId: "errors1",
    });
    if (error.response.status === 401) {
      localStorage.removeItem("userDetails");
      dispatch(set_update_user(""));
    }
  } else {
    toast.error(error.message, {
      toastId: "errors1",
    });
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
      if (
        res?.data?.data?.role === "customer" ||
        res?.data?.data?.role === "customer" ||
        res.data.data.role === role
      ) {
        if (
          res?.data?.data?.role === "customer" ||
          res?.data?.data?.role === "customer"
        ) {
          dispatch(set_user_type("customer"));
          localStorage.setItem("USERTYPE", JSON.stringify("customer"));
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
    dispatch(catch_errors_handle(error, dispatch));
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

export const set_switch_type = (userSwitch) => {
  return {
    type: SET_SWITCH_TYPE,
    payload: userSwitch,
  };
};

export const set_update_user = (user) => {
  if (user?.subscription && user?.subscription?.length > 0) {
    let sub = user?.subscription?.find((r) => r?.type === "primary");
    user.subscription = sub;
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
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const reset_password = async (
  newPassword,
  token,
  isMember,
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
      toast.success(
        `Successfully ${isMember ? "created" : "updated"} password!`
      );
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
      toast.success("Password changed successfully.");
      navigate("/settings");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  }
};

export const profile_update = async (data, token, dispatch, navigate, user) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}profile/update`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const res = await axios.post(
      url,
      { name: data.name, colour: data?.colour },
      HEADERS
    );
    const usercolor = data?.colour;
    if (user) {
      user.colour = usercolor;
      localStorage.setItem("userDetails", JSON.stringify(user));
      dispatch({
        type: USER_UPDATE,
        payload: user,
      });
    }
    if (res.data && res.data.status) {
      const usercolor = data?.colour;
      if (user) {
        user.colour = usercolor;
        localStorage.setItem("userDetails", JSON.stringify(user));
        dispatch({
          type: USER_UPDATE,
          payload: user,
        });
      }
      toast.success("Profile updated successfully.");
      dispatch(set_update_user({ ...res.data.data, token: token }));
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

export const get_single_designer_details = async (dispatch, userId, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/single_designer_detail?id=${userId}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_SINGLE_DESIGNER_DETAILS, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
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
      behance: infodata.behance,
    };
    const res = await axios.put(url, JSON.stringify(designerdata), HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_user_profile_details(token, dispatch);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const approve_designer = async (
  token,
  dispatch,
  designerId,
  approvestatus
) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/designer-action`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const designerdata = {
      designer_id: designerId,
      status: approvestatus,
    };
    const res = await axios.put(url, JSON.stringify(designerdata), HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_single_designer_details(dispatch, designerId, token);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_user_profile_details = async (token, dispatch) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}profile/detail`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_PROFILE_DETAILS, payload: res.data.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const uploadImage = async (imageFile, dispatch, imgtype) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append("proof", imageFile);
    const url = `${REACT_APP_BOMO_URL}designer/imageProof`;
    const res = await axios.post(url, formData);

    if (res.data && res.data.status) {
      const imagePath = res.data.path;
      if (imgtype === "front") {
        dispatch({
          type: UPLOAD_IMAGE_FILE_SUCCESS,
          payload: imagePath,
          imgtype: "front",
        });
      } else if (imgtype === "back") {
        dispatch({
          type: UPLOAD_IMAGE_FILE_SUCCESS,
          payload: imagePath,
          imgtype: "back",
        });
      }
      return res.data.path;
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const add_user_account = async (dispatch, accountdata, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}designer/addAccount`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };

    const accountdetail = {
      account_holder_name: accountdata.accountHolderName,
      account_number: accountdata.accountNumber,
      email: accountdata.email,
      city: accountdata.city,
      state: accountdata.state,
      line1: accountdata.address,
      postal_code: accountdata.postal_code,
      day: accountdata.day,
      month: accountdata.month,
      year: accountdata.year,
      first_name: accountdata.firstname,
      last_name: accountdata.lastname,
      gender: accountdata.gender,
      phone: accountdata.phone,
      id_number: accountdata.idnumber,
      document_front: accountdata.documentfront,
      document_back: accountdata.documentback,
      frontImageName: accountdata.frontImageName,
      backImageName: accountdata.backImageName,
    };

    const res = await axios.post(url, accountdetail, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res?.data?.message);
      get_user_profile_details(token, dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_overall_stats = async (dispatch, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/overall_stats`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_OVERALL_STATS, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const switch_to_designer = async (dispatch, userId, token, naviagte) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/switch_to_designer?id=${userId}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.post(url, {}, HEADERS);
    if (res.data && res.data.status) {
      if (res?.data?.data?.role === "designer") {
        if (res?.data?.data?.role === "designer") {
          dispatch(set_user_type("Designer"));
          localStorage.setItem("USERTYPE", JSON.stringify("Designer"));
          localStorage.setItem("path", "/");
        }
        toast.success("Successfully switch to designer");
        dispatch(set_update_user(res.data.data));
        localStorage.setItem("SWITCHTYPE", res.data.data.superadminToDesigner);
        dispatch({
          type: SET_SWITCH_TYPE,
          payload: res.data.data.superadminToDesigner,
        });
      } else if (res?.data?.data?.role === "customer_admin") {
        if (res?.data?.data?.role === "customer_admin") {
          dispatch(set_user_type("customer_admin"));
          localStorage.setItem("USERTYPE", JSON.stringify("customer_admin"));
        }
        localStorage.setItem("path", "/");
        toast.success("Successfully switch to customer");
        dispatch(set_update_user(res.data.data));
        localStorage.setItem("SWITCHTYPE", res.data.data.superadminToCustomer);
        dispatch({
          type: SET_SWITCH_TYPE,
          payload: res.data.data.superadminToCustomer,
        });
        naviagte("/");
      } else {
        toast.error("Invalid Data.");
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

export const switch_to_superadmin = async (dispatch, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/switch_to_superadmin`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.post(url, {}, HEADERS);
    if (res.data && res.data.status) {
      if (res?.data?.data?.role === "superadmin") {
        if (res?.data?.data?.role === "superadmin") {
          dispatch(set_user_type("Super admin"));
          localStorage.setItem("USERTYPE", JSON.stringify("Super admin"));
          localStorage.removeItem("SWITCHTYPE");
        }
        toast.success("Successfully switch to SuperAdmin");
        dispatch(set_update_user(res.data.data));
      } else {
        toast.error("Invalid Data.");
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
