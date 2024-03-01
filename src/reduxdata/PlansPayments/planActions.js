import axios from "axios";
import { CUSTOMER_CARD, GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW, SUBSCRIPTION_INFO } from "./planTypes";
import { toast } from "react-toastify";
import { start_loading, stop_loading, catch_errors_handle, change_add_edit } from "../rootAction";
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
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    // dispatch(stop_loading());
  }
};
let pay = false;
export const pay_now = async (uToken, token, data, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscribe/${token?.id ? token?.id : 'default'}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.post(url, data, headers);
    if (res.data && res.data.status) {
      dispatch({
        type: PAY_NOW,
      })
      pay = true;
      get_user_subscription({ ...res.data.user, token: uToken }, dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const edit_billing_info = async (role, uToken, sid, data, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}${role === 'customer_admin' ? `customer/address-update/${sid}` : `designer/editAddress`}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.put(url, data, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully edit billing information.');
      get_user_subscription({ ...res.data.user, token: uToken }, dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
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
      get_user_subscription({ token: uToken }, dispatch);
      get_payment_history(dispatch, uToken, 1, 10);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
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
    const res = await axios.post(url, { pause: user?.subscription?.status === 'paused' ? false : true }, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully ' + (user?.subscription?.status === 'paused' ? 'resumed' : 'paused') + ' subscription.');
      get_user_subscription({ user, token: user?.token }, dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const pause_subscription_superadmin = async (user, dispatch, subId, token, getSubscriptionId) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}superAdmin/pause_subscription/${subId}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = token;
    const res = await axios.post(url, { pause: getSubscriptionId[0]?.status === 'paused' ? false : true, user_id: user?._id }, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully ' + (user?.subscription[0]?.status === 'paused' ? 'resumed' : 'paused') + ' subscription.');
      get_user_subscription_details(user?._id, token, dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
}
export const get_user_subscription = async (user, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/list`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = user?.token;
    const res = await axios.get(url, headers);
    if (res.data && res.data.status) {
      let u = res.data.data;
      if (u && u?.subscription?.length > 0 && pay) {
        let sub = u?.subscription?.find(r => r.type === 'primary');
        u.next_billing_date = sub?.next_billing_date;
        pay = false;
      }
      dispatch(set_update_user({ ...u, token: user.token }));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
};

export const get_user_subscription_details = async (userId, token, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/subscription/list?user_id=${userId}`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = token;
    const res = await axios.get(url, headers);
    if (res.data && res.data.status) {
      dispatch({
        type: SUBSCRIPTION_INFO,
        payload: res.data?.data
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
}
export const get_payment_history = async (dispatch, uToken, page = 1, limit = 10) => {
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
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const get_customer_card = async (token, dispatch) => {
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
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
}
export const isSubscription = async (user) => {
  const now = new Date().getTime();
  let isExpired = true;
  const expiry = user?.next_billing_date ? new Date(user?.next_billing_date).getTime() : '';
  if (!expiry || (expiry && (now > expiry))) {
    isExpired = false;
  } else if (expiry && (now <= expiry)) {
    isExpired = true;
  }
  return isExpired;
}
export const add_change_card = async (uToken, token, dispatch) => {
  try {
    dispatch(start_loading());
    const url = `${REACT_APP_BOMO_URL}stripe/addCard`;
    let headers = HEADERS;
    headers.headers['x-access-token'] = uToken;
    const res = await axios.put(url, { cardToken: token?.id }, headers);
    if (res.data && res.data.status) {
      change_add_edit(dispatch)
      get_customer_card(uToken, dispatch);
      toast.success('Successfully added card.')
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
