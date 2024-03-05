// project imports
import axios from "axios";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { MEMBERS_LIST, USERS_LIST, SINGLE_USER_DATA } from "./mmebersTypes";
import { IS_ADD_EDIT } from "../Brand/brandTypes";
import { catch_errors_handle } from "../rootAction";
import { USER_UPDATE } from "../User/userTypes";
import { set_update_user } from "../User/userActions";

const { REACT_APP_BOMO_URL } = process.env;

// get all members list
export const get_all_members = async (
  dispatch,
  token,
  page = 1,
  limit = 10
) => {
  dispatch(start_loading);
  const HEADERS = {
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const res = await axios.get(
      `${REACT_APP_BOMO_URL}customer/member-listing?page=${page}&limit=${limit}`,
      HEADERS
    );
    if (res?.data?.status) {
      // store the data
      dispatch({ type: MEMBERS_LIST, payload: res?.data });
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

// add a new memeber
export const add_new_member = async (dispatch, userData, token, memberdata, user) => {
  dispatch(start_loading);
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };
  const url = memberdata?.id
    ? `${REACT_APP_BOMO_URL}customer/edit`
    : `${REACT_APP_BOMO_URL}customer/add-member`;
  try {
    const res = !memberdata?.id
      ? await axios.post(url, userData, headers)
      : await axios.post(url, { customer_id: memberdata?.id, role: memberdata?.role, name:memberdata?.name, colour: memberdata?.colour, email: memberdata?.email }, headers);
    if (res?.data?.status) {
      toast.success(res.data?.message);
      get_all_members(dispatch, token);
      change_add_edit(dispatch);
      if(user?._id === memberdata?.id){
        const usercolor = memberdata?.colour;
        if (user) {
          user.colour = usercolor;
          localStorage.setItem("userDetails", JSON.stringify(user));
          dispatch({
            type: USER_UPDATE,
            payload: user,
          });
        }
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

// delete an existing member

export const delete_existing_user = async (id, dispatch, token) => {
  dispatch(start_loading);
  try {
    const res = await axios.delete(
      `${REACT_APP_BOMO_URL}customer/remove-member?customer_id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      }
    );
    if (res?.data?.status) {
      // do something
      toast.success(res.data.message);
      get_all_members(dispatch, token);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const change_add_edit = (dispatch) => {
  dispatch({ type: IS_ADD_EDIT });
};
export const get_all_users = async (
  dispatch,
  token,
  user_type,
  page = 1,
  limit = 10,
  search,
  active
) => {
  dispatch(start_loading);
  const HEADERS = {
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const res = await axios.get(
      `${REACT_APP_BOMO_URL}superAdmin/${
        user_type === "designer" && active
          ? "active_designer_listing"
          : user_type === "designer" && !active
          ? "inactive_designer_listing"
          : "customer_listing"
      }?page=${page}&limit=${limit}${search ? "&search=" + search : ""}`,
      HEADERS
    );
    if (res?.data?.status) {
      // store the data
      res.data.role = user_type;
      res.data.active = active;
      dispatch({ type: USERS_LIST, payload: res?.data });
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_single_data = async (dispatch, customerId, token) => {
  dispatch(start_loading);
  try {
    const res = await axios.get(
      `${REACT_APP_BOMO_URL}superAdmin/single_customer_detail?id=${customerId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": token,
        },
      }
    );
    if (res?.data?.status) {
      dispatch({ type: SINGLE_USER_DATA, payload: res?.data });
    }
  } catch (error) {
  } finally {
    dispatch(stop_loading);
  }
};
