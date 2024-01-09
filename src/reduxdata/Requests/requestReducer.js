import { GET_REQUEST_LIST } from "./requestTypes";


const initialState = {
  draftrequests: []
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        draftrequests: action.payload.data,
      };
    default:
      return state;
  }
};

export default requestReducer;
