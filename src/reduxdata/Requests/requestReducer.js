import { CREATE_REQUEST_SUCCESS } from "./requestTypes";


const initialState = {
  createRequest:false
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        createRequest: !state.createRequest
      }  
    default:
      return state;
  }
};

export default requestReducer;
