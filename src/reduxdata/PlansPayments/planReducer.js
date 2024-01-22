import { CUSTOMER_CARD, GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW } from "./planTypes";

const initialState = {
    plans: [],
    isPay:false,
    payments:[],
    cpayments:[],
    dpayments:[],
    total:0,
    cards:[]
  };
  
  const planReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PLANS:
        return { ...state, 
          plans: action.payload?.data[0]?.tiers
        };
      case PAY_NOW:
        return { ...state, 
          isPay: !state.isPay 
        }; 
      case GET_PAYMENT_HISTORY:
        return {
          ...state,
          payments:action.payload?.data,
          total:action.payload?.total
        }  
      case CUSTOMER_CARD:
      return {
        ...state,
        cards:action.payload
      }   
      default:
        return state;
    }
  };
  
  export default planReducer;