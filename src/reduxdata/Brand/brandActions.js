import { toast } from "react-toastify";
import { BRAND_CREATE, UPLOAD_ZIP_FILE_SUCCESS } from "./brandTypes";
import axios from "axios";
import { start_loading, stop_loading } from "../rootAction";

const { REACT_APP_BOMO_URL } = process.env;

export const uploadZipFileSuccess = (zipPath) => ({
  type: UPLOAD_ZIP_FILE_SUCCESS,
  payload: zipPath,
});

export const uploadZip = async (zipFile) => {
  try {
    const formData = new FormData();
    formData.append('zipFile', zipFile
    );
    const url = `${REACT_APP_BOMO_URL}add_brand_profile_zip`;
    console.log("API URL====>:", url);
    const res = await axios.post(url, formData);
    console.log("res status checkkkkkk",res.data.status);
    console.log("res.data:=====================>", res.data);
    if (res.data && res.data.status) {
      console.log("Response Data path ===> ", res.data.path);
      uploadZipFileSuccess(res.data.path);
      console.log("My Zip Path", res.data.path);
      return res.data.path;
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if(error.response){
      toast.error(error.response.data.message)
    }else{
      toast.error(error.message)
    }
  }
}

export const addBrandSuccess = (brandData) => ({
  type: BRAND_CREATE,
  payload: brandData,
});

export const addBrand = async (branddata, dispatch) => {
  dispatch(start_loading());
  console.log(branddata);
  try {
      const formData = new FormData();
      formData.append('zipFile', branddata.zipFile);
      formData.append('brandname', branddata.brandname);

      const tagsArray = branddata.tags[0].split(',').map(tag => tag.trim());

      tagsArray.forEach((tag) => {
        formData.append('tags[]', tag);
      });

      formData.append('logo', branddata.logo);

      console.log("Formdata====>",formData);

      const url = `${REACT_APP_BOMO_URL}add_brand_profile`;

      const res = await axios.post(url, formData);
      console.log("response branddata", res);
      console.log("response Data of New Brand ====> ", res.data.data);

      if (res.data && res.data.status) {
        toast.success(res.data.message);
        console.log("New Brand Response =========>", res.data);
        addBrandSuccess(res.data.data);
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
