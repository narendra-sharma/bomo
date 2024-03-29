import { GET_OVERALL_STATS, GET_PROFILE_DETAILS, GET_PROFILE_SUCCESS, GET_SINGLE_DESIGNER_DETAILS, LOG_OUT, SET_SWITCH_TYPE, SET_USER_TYPE, UPDATE_PASSWORD_SUCCESS, UPLOAD_IMAGE_FILE_SUCCESS, USER_UPDATE, } from "./userTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem('userDetails')),
  role: JSON.parse(localStorage.getItem('USERTYPE')),
  updated:false,
  token:null,
  profile:null,
  singledesignerdata:null,
  profiledetails: null,
  image_path:null,
  overallstats:[],
  isSwitch: JSON.parse(localStorage.getItem('SWITCHTYPE')),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        user:null,
        role:null,
      };
    case SET_USER_TYPE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_SWITCH_TYPE:
      return {
        ...state,
        isSwitch: action.payload,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        token: action.payload,
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }
    case GET_SINGLE_DESIGNER_DETAILS:
      return {
        ...state,
        singledesignerdata: action.payload
      }
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        profiledetails: action.payload
      };
      case UPLOAD_IMAGE_FILE_SUCCESS:
        return {
          ...state,
          image_path: action.payload,
        };
        case GET_OVERALL_STATS: 
        return {
          ...state,
          overallstats: action.payload
        };
    default:
      return state;
  }
};

export default authReducer;