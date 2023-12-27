import { BRAND_CREATE, UPLOAD_ZIP_FILE_SUCCESS } from "./brandTypes";

const initialState = {
  zip_path: null,
  brandprofile:[],
};

const brandReducer = (state = initialState, action) => {
  console.log("Zippath ==>",state.zip_path);
  switch (action.type) {
    case UPLOAD_ZIP_FILE_SUCCESS:
      return {
        ...state,
        zip_path: action.payload,
      };
    case BRAND_CREATE:
      return {
        ...state,
        brandprofile: [...state.brandprofile, action.payload],
      };
    default:
      return state;
  }
};

export default brandReducer;
