import axios from "axios";
import { CUSTOMER_CARD, GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW } from "./planTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading, catch_errors_handle } from "../rootAction";
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
    // dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}plans/list`;
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({
        type: GET_PLANS,
        payload: res.data.prices
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    // dispatch(stop_loading());
  }
};
export const pay_now = async (uToken, token, data, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscribe/${token?.id?token?.id:'default'}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.post(url, data, headers);
    if (res.data && res.data.status) {
      dispatch({
        type: PAY_NOW,
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const edit_billing_info = async (role,uToken, sid, data, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}${role === 'customer_admin' ? `customer/address-update/${sid}` : `designer/editAddress` }`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.put(url, data, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully edit billing information.');
      get_user_subscription({...res.data.user,token:uToken},dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const cancel_subscription = async (uToken, sid, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/delete/${sid}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.post(url, {}, headers);
    if (res.data && res.data.status) {
      toast.success('Subscription cancelled successfully.');
      get_user_subscription({token:uToken},dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const pause_subscription = async (user, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/pause/${user?.subscription?._id}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = user?.token;
    const res = await axios.post(url, {pause:user?.subscription?.status==='paused'?false:true}, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully '+(user?.subscription?.status==='paused'?'resumed':'paused')+' subscription.');
      get_user_subscription({user,token:user?.token},dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const get_user_subscription = async (user, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/list`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = user?.token;
    const res = await axios.get(url, headers);
    if (res.data && res.data.status) {
      dispatch(set_update_user({...res.data.data,token:user.token}));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const get_payment_history = async (dispatch,uToken,page=1,limit=10) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/payment_history?page=${page}&limit=${limit}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.get(url, headers);
    if (res.data && res.data.status) {
      dispatch({
        type: GET_PAYMENT_HISTORY,
        payload: res.data
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const get_customer_card=async(token,dispatch)=>{
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/getMyCards`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = token;
    const res = await axios.get(url, headers);
    if (res.data && res.data.status) {
      dispatch({
        type: CUSTOMER_CARD,
        payload: res.data.data
      })
    } else {
      dispatch({
        type: CUSTOMER_CARD,
        payload: null
      })
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
}
export const isSubscription = async (user) => {
  const now = new Date().getTime();
  let isExpired = true;
  const expiry = user?.next_billing_date?new Date(user?.next_billing_date).getTime():'';
  if(!expiry || (expiry && (now > expiry))){
    isExpired = false;
  }else if (expiry && (now <= expiry)) {
    isExpired = true;
  }
  return isExpired;
}
