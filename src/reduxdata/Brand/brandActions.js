import { toast } from "react-toastify";
import { BRAND_LIST, IS_ADD_EDIT, UPLOAD_ZIP_FILE_SUCCESS } from "./brandTypes";
import axios from "axios";
import { start_loading, stop_loading,catch_errors_handle } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;
export const getbrandlist = async (dispatch, token, page=1, limit=10) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}brand-profile/list?page=${page}&limit=${limit}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      }
    }
    const res = await axios.get(url, HEADERS);
    console.log(res.data);
    if (res.data && res.data.status) {
      dispatch({ type: BRAND_LIST, payload: res.data });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};

export const uploadZip = async (zipFile, dispatch) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append('zipFile', zipFile
    );
    const url = `${REACT_APP_BOMO_URL}brand-profile/zipupload`;
    const res = await axios.post(url, formData);

    if (res.data && res.data.status) {
      const zipPath = res.data.path;
      dispatch({ type: UPLOAD_ZIP_FILE_SUCCESS, payload: zipPath });
      return res.data.path;
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};

export const addBrand = async (branddata, dispatch, token) => {
  dispatch(start_loading());
  try {
    const formData = new FormData();
    formData.append('zipFile', branddata.zipFile);
    formData.append('brandname', branddata.brandname);

    const tagsArray = branddata.tags.map(tag => tag.trim());

    if (tagsArray.length > 5) {
      toast.error('You can add up to 5 tags*');
      return;
    }

    tagsArray.forEach((tag) => {
      formData.append(`tags[]`, tag);
    });

    formData.append('logo', branddata.logo);

    if (branddata?.brand_id) {
      formData.append('brand_id', branddata.brand_id);
    }

    const url = `${REACT_APP_BOMO_URL}brand-profile/${branddata?.brand_id ? 'update' : 'create'}`;
    const headers = {
      "x-access-token": token,
    }

    const res = branddata?.brand_id ? await axios.put(url, formData, { headers }) : await axios.post(url, formData, { headers });

    if (res.data && res.data.status) {
      toast.success(`Brand ${branddata?.brand_id ? 'updated' : 'created'} Successfully`);
      getbrandlist(dispatch, token);
      change_add_edit(dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};



export const deleteBrand = async (brandId, dispatch, token) => {
  dispatch(start_loading());
  try {
    const url = `${REACT_APP_BOMO_URL}brand-profile/delete/${brandId}`;
    const HEADERS = {
      headers: {
        "x-access-token": token,
      }
    }
    const res = await axios.post(url, {}, HEADERS);

    if (res.data && res.data.status) {
      toast.success(res.data.message);
      getbrandlist(dispatch, token);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const change_add_edit = (dispatch) => {
  dispatch({ type: IS_ADD_EDIT });
};

