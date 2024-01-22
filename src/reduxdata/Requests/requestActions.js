import axios from "axios";
import {
  start_loading,
  stop_loading,
  catch_errors_handle,
  change_add_edit,
  get_user_subscription,
} from "../rootAction";
import { toast } from "react-toastify";
import { GET_EDIT_REQUEST_DATA, GET_REQUEST_LIST,GET_ADMIN_PENDING_REQUEST_LIST, GET_POLL_REQUEST_LIST, GET_ADMIN_ASSIGN_REQUEST_LIST, GET_DESIGNER_ASSIGNED_REQUEST_LIST } from "./requestTypes";
const { REACT_APP_BOMO_URL } = process.env;

export const get_draft_requestlist = async (dispatch, token, page, limit) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}customerAdmin/request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_admin_pending_requestlist = async (dispatch, token, page=1, limit=10,search) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/request-listing?page=${page}&limit=${limit}${search?'&search='+search:''}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ADMIN_PENDING_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_admin_assign_requestlist = async (dispatch, token, page=1, limit=5) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/accepted-request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_ADMIN_ASSIGN_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_designer_pool_requestlist = async (dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/pool-request`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_POLL_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const assign_admin_request = async (requestdata, dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/assign-designer`;
    const HEADERS = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,  
      },
    };
    const requestDataToSend = {
      request_id: requestdata.request_id,
      primary_designer: requestdata.primary_designer,
      backup_designer: requestdata.backup_designer,
    };
    const res = await axios.put(url,JSON.stringify(requestDataToSend),HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_admin_assign_requestlist(dispatch,token);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
}

export const poll_request_apply = async (requestdata, dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/designer-action?request_id=${requestdata}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url,{}, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.msg);
      get_designer_pool_requestlist(dispatch,token);
    } else {
      toast.error(res.data?.msg);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const change_request_status = async (dispatch, token, id, status) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}superAdmin/request-action`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url, { status: status,request_id:id }, HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
      get_admin_pending_requestlist(dispatch, token);
    }else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const desginer_accept_assignrequest = async (dispatch,token,request_id,email,designer_id) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/accept-request?request_id=${request_id}&email=${email}&designer_id=${designer_id}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.put(url,{},HEADERS);
    if (res.data && res.data.status) {
      toast.success(res.data?.message);
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const get_designer_assigned_requestlist = async (dispatch, token) => {
  dispatch(start_loading);
  try {
    const url = `${REACT_APP_BOMO_URL}designer/assign-request`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_DESIGNER_ASSIGNED_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading);
  }
};

export const newRequest = async (requestdata, dispatch, token, navigate) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append("request_name", requestdata.requestName);
    formData.append("brand_profile", requestdata.brandProfile);
    formData.append("request_type", requestdata.requestype);
    formData.append("description", requestdata.description);
    formData.append("file_type", requestdata.fileType);
    formData.append("size", requestdata.size);
    formData.append("references", requestdata.references);
    formData.append("transparency", requestdata.transparency);
    formData.append("image", requestdata.uploadFiles);
    formData.append("status", requestdata.status);

    if (requestdata?.request_id) {
      formData.append('request_id', requestdata?.request_id);
    }

    const url = `${REACT_APP_BOMO_URL}customer/${requestdata?.request_id ? 'request_edit' : 'request_create'}`;
    const headers = { 
      "x-access-token": token,
    };
    const res = requestdata?.request_id ? await axios.put(url, formData, { headers }) : await axios.post(url, formData, { headers });
    if (res.data && res.data.status) {
      get_user_subscription({token:token},dispatch);
      get_draft_requestlist(dispatch, token); 
      change_add_edit(dispatch);
      toast.success(`Request ${requestdata?.request_id ? 'updated' : 'created'} Successfully`);
      navigate('/');
      return res.data;
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_edit_request_data = (requestdetails) => {
    return ({ type: GET_EDIT_REQUEST_DATA, payload: requestdetails });
};



