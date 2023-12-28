import { GET_PLANS, PAY_NOW } from "./planTypes";

const initialState = {
    plans: [],
    isPay:false
  };
  
  const planReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PLANS:
        return { ...state, 
          plans: action.payload 
        };
      case PAY_NOW:
        return { ...state, 
          isPay: !state.isPay 
        };  
      default:
        return state;
    }
  };
  
  export default planReducer;