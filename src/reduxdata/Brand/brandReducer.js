import { BRAND_LIST, IS_ADD_EDIT, UPLOAD_ZIP_FILE_SUCCESS } from "./brandTypes";

const initialState = {
  zip_path: null,
  brands:[],
  total:0,
  isAddEdit:false
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_ZIP_FILE_SUCCESS:
      return {
        ...state,
        zip_path: action.payload,
      };
    case BRAND_LIST:
      return {
        ...state,
        brands: action.payload.brand_listing_data,
        total:action.payload.brand_length,
      };
    case IS_ADD_EDIT:
      return {
        ...state,
        isAddEdit:!state.isAddEdit
      }  
    default:
      return state;
  }
  
};

export default brandReducer;
