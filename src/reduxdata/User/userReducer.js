import { GET_PROFILE_SUCCESS, LOG_OUT, SET_USER_TYPE, UPDATE_PASSWORD_SUCCESS, USER_UPDATE, } from "./userTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem('userDetails')),
  role: JSON.parse(localStorage.getItem('USERTYPE')),
  token:null,
  profile:null
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
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
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
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
    default:
      return state;
  }
};

export default authReducer;