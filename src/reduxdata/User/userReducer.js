import { LOG_OUT, SET_USER_TYPE, USER_UPDATE, } from "./userTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem('userDetails')),
  role: JSON.parse(localStorage.getItem('USERTYPE')),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        user:'',
        role: '',
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
    default:
      return state;
  }
};

export default authReducer;