import axios from "axios";
import { start_loading, stop_loading } from "../rootAction";
import { toast } from "react-toastify";
const { REACT_APP_BOMO_URL } = process.env;

export const newRequest = async (requestdata, dispatch, token) => {
    dispatch(start_loading());
    console.log(requestdata);
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
        formData.append('File', requestdata.uploadFiles);
        formData.append('status', requestdata.status);
  
        const url = `${REACT_APP_BOMO_URL}new-request`;
        const headers = {
            "x-access-token": token, 
          }
  
        const res = await axios.post(url, formData, { headers });
  
        if (res.data && res.data.status) {
          toast.success(res.data.message);
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