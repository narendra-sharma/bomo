// project imports
import axios from "axios";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { error } from "jquery";
import { MEMBERS_LIST } from "./mmebersTypes";

const { REACT_APP_BOMO_URL } = process.env;

// get all members list
export const getAllMembersList = async (
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
      `${REACT_APP_BOMO_URL}page=${page}&limit=${limit}`,
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
  try {
    const res = await axios.post(`${REACT_APP_BOMO_URL}`, userData, {
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });
    if (res?.data?.status === 200) {
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
    dispatch(stop_loading());
  }
};

// delete an existing member

export const deleteExistingUser = async (id, dispatch, token) => {
  dispatch(start_loading);
  try {
    const res = await axios.delete(`${REACT_APP_BOMO_URL}${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });
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

// update an existing user
export const updateUser = async (id, role, dispatch, token) => {
  dispatch(start_loading);
  try {
    const res = axios.put(`${REACT_APP_BOMO_URL}${id}`, role, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });
    if (res?.data && res?.data?.status) {
      // do soemthing
      toast.success(res.data.message);
      getAllMembersList(dispatch, token);
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  } finally {
    toast.error(error);
  }
};
