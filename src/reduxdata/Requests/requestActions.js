import axios from "axios";
import {
  start_loading,
  stop_loading,
  catch_errors_handle,
} from "../rootAction";
import { toast } from "react-toastify";
import { GET_EDIT_REQUEST_DATA, GET_REQUEST_LIST,GET_ADMIN_PENDING_REQUEST_LIST } from "./requestTypes";
import { IS_ADD_EDIT } from "../Brand/brandTypes";
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
      toast.success(`Request ${requestdata?.request_id ? 'updated' : 'created'} Successfully`);
      navigate('/');
      get_draft_requestlist(dispatch, token); 
      dispatch({ type: IS_ADD_EDIT });
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

