import { GET_PLANS } from "./planTypes";

const initialState = {
    plans: []
  };
  
  const planReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case GET_PLANS:
        return { ...state, 
            plans: action.payload 
        };
      default:
        return state;
    }
  };
  
  export default planReducer;