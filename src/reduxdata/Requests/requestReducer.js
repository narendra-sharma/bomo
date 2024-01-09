import { CREATE_REQUEST_SUCCESS, GET_REQUEST_LIST } from "./requestTypes";


const initialState = {
  createRequest:false,
  draftrequests: []
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        createRequest: !state.createRequest
      }  
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
