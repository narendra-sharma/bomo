import { GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW } from "./planTypes";

const initialState = {
    plans: [],
    isPay:false,
    payments:[],
    cpayments:[],
    dpayments:[],
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
      case GET_PAYMENT_HISTORY:
        return {
          ...state,
          payments:action.payload
        }   
      default:
        return state;
    }
  };
  
  export default planReducer;