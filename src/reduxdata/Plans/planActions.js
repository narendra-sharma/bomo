import axios from "axios";
import { GET_PLANS } from "./planTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

export const get_plans = async (dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}plans/list`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type:GET_PLANS,
        payload:res.data.data
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    dispatch(stop_loading());
  }
};