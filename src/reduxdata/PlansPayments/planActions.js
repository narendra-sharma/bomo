import axios from "axios";
import { GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW } from "./planTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading } from "../rootAction";
import { set_update_user } from "../User/userActions";

const { REACT_APP_BOMO_URL } = process.env;
const HEADERS = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
}
export const get_plans = async (dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}plans/list`;
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
export const pay_now = async (uToken,token,data,dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscribe/${token.id}`;
    let headers=HEADERS;
    headers.headers['x-access-token']=uToken;
    const res = await axios.post(url,data,headers);
    if (res.data && res.data.status) {
      // set_update_user(res.data.data);
      dispatch({
        type:PAY_NOW,
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
export const get_payment_history = async (dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}plans/list`;
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type:GET_PAYMENT_HISTORY,
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