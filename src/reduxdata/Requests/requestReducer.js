import { GET_REQUEST_LIST } from "./requestTypes";
import { GET_ADMIN_REQUEST_LIST } from "./requestTypes";
const initialState = {
  draftrequests: [],
  allRequest: [],
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        draftrequests: action.payload.data,
      };
    case GET_ADMIN_REQUEST_LIST:
      return {
        ...state,
        allRequest: action.payload.data,
      };
    default:
      return state;
  }
};

export default requestReducer;
