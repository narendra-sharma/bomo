// project imports
import axios from "axios";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { MEMBERS_LIST } from "./mmebersTypes";
import { IS_ADD_EDIT } from "../Brand/brandTypes";
import { catch_errors_handle } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

// get all members list
export const get_all_members = async (dispatch, token, page, limit) => {
  dispatch(start_loading);
  const HEADERS = {
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const res = await axios.get(
      `${REACT_APP_BOMO_URL}customer/member-listing?page=1&limit=10`,
      HEADERS
    );
    console.log("ressss", res);
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
export const add_new_member = async (dispatch, userData, token) => {
  console.log("ACTIONNNN", token);
  dispatch(start_loading);
  const headers = {
    headers: {
      "x-access-token": token,
    },
  };
  const url = userData?._id
    ? `${REACT_APP_BOMO_URL}customer/update-member/${userData.id}`
    : `${REACT_APP_BOMO_URL}customer/add-member`;
  try {
    const res = (await userData?._id)
      ? axios.put(url, userData.role, headers)
      : axios.post(url, userData, headers);
    if (res?.data?.status) {
      toast.success(res.data.message);
      get_all_members(dispatch, token);
      change_add_edit(dispatch);
    } else {
      toast.error(res.data.message);
      console.log("Inside else");
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
