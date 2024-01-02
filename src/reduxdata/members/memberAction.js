// project imports
import axios from "axios";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { error } from "jquery";
const { REACT_BOMO_URL } = process.env;

// get all members list
export const getAllMembersList = async (dispatch) => {
  dispatch(start_loading);
  try {
    const res = await axios.get(`${REACT_BOMO_URL}`);
    if (res?.data?.status === 200) {
      // store the data
    } else {
      toast.error("Something went wrong please try again");
    }
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(stop_loading);
  }
};

// add a new memeber
export const addNewMember = async (
  user,
  role,
  navigate,
  dispatch,
  userData
) => {
  dispatch(start_loading);
  try {
    const res = await axios.post(`${REACT_BOMO_URL}`, userData, {
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res?.data?.status === 200) {
      // do something

      toast.success("User added succesfully");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    dispatch(stop_loading());
  }
};

// delete an existing member

export const deleteExistingUser = async (id, dispatch) => {
  dispatch(start_loading);
  try {
    const res = await axios.delete(`${REACT_BOMO_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res?.data?.status === 200) {
      // do something

      toast.success("User deleted succesfully");
    } else {
      toast.error("Something went wrong try again later!");
    }
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(stop_loading);
  }
};

// update an existing user
export const updateUser = async (userDetails, dispatch) => {
  dispatch(start_loading);
  try {
    const res = axios.put(`${REACT_BOMO_URL}`, userDetails, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res?.data?.status === 200) {
      // do soemthing
      toast.success("User updated succesfully");
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error(error);
  } finally {
    toast.error(error);
  }
};
