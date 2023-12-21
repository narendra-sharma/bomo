import axios from "axios";
import { LOG_OUT, SET_USER_TYPE, USER_UPDATE } from "./userTypes";
import { toast } from "react-toastify";
import { stopLoading } from "../Loader/loaderActions";

const { REACT_APP_BOMO_URL } = process.env;

export const signUp = (user, role, navigate) => {
  return () => {
    try {
      const url = `${REACT_APP_BOMO_URL}signup/${role.toLowerCase()}`;
      const HEADERS = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      axios.post(url, user, HEADERS)
        .then(res => {
          stopLoading();
          if (res.data && res.data.status) {
            toast.success(res.data.message);
            navigate('/login');
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(err => {
          stopLoading();
          console.log(err);
          toast.error(err)
        })
    } catch (error) {
      stopLoading();
      toast.error(error.message);
    }
  }
};

export const logIn = async (user,navigate) => {
  try {

    const url = `${REACT_APP_BOMO_URL}login`;
      const HEADERS = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      axios.post(url, user, HEADERS)
        .then(res => {
          console.log("login data ===>", res.data);
          stopLoading();
          if(res.data && res.data.status) {
            toast.success('Successfully user logged-in!');
            localStorage.setItem('userDetails',JSON.stringify(res.data.data));
            navigate('/');
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(err => {
          stopLoading();
          console.log(err);
          toast.error(err.message)
        })

    // const response = await axios.get(`${REACT_APP_BOMO_URL}/login?email=${user.email}&password=${user.password}`);
    // return {
    //   type: LOG_IN,
    //   payload: response.data,
    // };
  } catch (error) {
    stopLoading();
    toast.error(error.message);
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
