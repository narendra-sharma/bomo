import axios from "axios";
import { start_loading, stop_loading, catch_errors_handle } from "../rootAction";
import { toast } from "react-toastify";
import { GET_REQUEST_LIST } from "./requestTypes";
import { IS_ADD_EDIT } from "../Brand/brandTypes";
const { REACT_APP_BOMO_URL } = process.env;

export const getrequestlist = async (dispatch, token, page, limit) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}customerAdmin/request-listing?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      }
    }
    const res = await axios.get(url, HEADERS);
    if (res.data && res.data.status) {
      dispatch({ type: GET_REQUEST_LIST, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const newRequest = async (requestdata, dispatch, token) => {
    dispatch(start_loading());
    try {
        const formData = new FormData();
        formData.append('request_name', requestdata.requestName);
        formData.append('brand_profile', requestdata.brandProfile);
        formData.append('request_type', requestdata.requestype);
        formData.append('description', requestdata.description);
        formData.append('file_type', requestdata.fileType);
        formData.append('size', requestdata.size);
        formData.append('references', requestdata.references);
        formData.append('transparency', requestdata.transparency);
        formData.append('image', requestdata.uploadFiles);
        formData.append('status', requestdata.status);
  
        const url = `${REACT_APP_BOMO_URL}customer/request_create`;
        const headers = {
            "x-access-token": token, 
          }
        const res = await axios.post(url, formData, { headers }); 
        if (res.data && res.data.status) {
          toast.success(res.data.message);
          getrequestlist(dispatch, token); 
          dispatch({ type: IS_ADD_EDIT }); 
          return res.data;
        } else {
          toast.error(res.data.message);
        }
    } catch (error) {
      dispatch(catch_errors_handle(error,dispatch));
    } finally {
      dispatch(stop_loading());
    }
  };

  

