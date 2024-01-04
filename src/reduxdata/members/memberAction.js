// project imports
import axios from "axios";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { MEMBERS_LIST } from "./mmebersTypes";
import { IS_ADD_EDIT } from "../Brand/brandTypes";
const { REACT_APP_BOMO_URL } = process.env;

// get all members list
export const getAllMembersList = async (dispatch, token, page, limit) => {
  dispatch(start_loading);
  const HEADERS = {
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const res = await axios.get(
      `${REACT_APP_BOMO_URL}customer/member-listing?${page}&limit=${limit}`,
      HEADERS
    );
    if (res?.data?.status === 200) {
      // store the data
      dispatch({ type: MEMBERS_LIST, payload: res?.data });
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  } finally {
    dispatch(stop_loading);
  }
};

// add a new memeber
export const addNewMember = async (dispatch, userData, token) => {
  dispatch(start_loading);
  const headers = {
    "x-access-token": token,
  };
  const url = userData?.id
    ? `${REACT_APP_BOMO_URL}/customer/update-member/${userData.id}`
    : `${REACT_APP_BOMO_URL}/customer/add-member`;
  try {
    const res = (await userData?.id)
      ? axios.put(url, userData.role, headers)
      : axios.post(url, userData, headers);
    if (res?.data?.status === 200) {
      toast.success(res.data.message);
      getAllMembersList(dispatch, token);
      change_add_edit(dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  } finally {
    dispatch(stop_loading());
  }
};

// delete an existing member

export const deleteExistingUser = async (id, dispatch, token) => {
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
    if (res?.data?.status === 200) {
      // do something
      toast.success(res.data.message);
      getAllMembersList(dispatch, token);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  } finally {
    dispatch(stop_loading);
  }
};

export const change_add_edit = (dispatch) => {
  dispatch({ type: IS_ADD_EDIT });
};
