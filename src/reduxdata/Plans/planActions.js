import axios from "axios";
import { GET_PLANS, PAY_NOW } from "./planTypes";
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
    if(error.response){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
    }
  } finally {
    dispatch(stop_loading());
  }
};
export const pay_now = async (token,data,dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}add_subscription_details/${token.id}`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    
    const res = await axios.post(url,data,HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type:PAY_NOW
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if(error.response){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
    }
  } finally {
    dispatch(stop_loading());
  }
};