import { CUSTOMER_CARD, GET_PAYMENT_HISTORY, GET_PLANS, PAY_NOW, PAY_NOW_SUCCESS, SUBSCRIPTION_INFO } from "./planTypes";

const initialState = {
  plans: [],
  isPay: false,
  payments: [],
  cpayments: [],
  dpayments: [],
  subscription: [],
  total: 0,
  cards: null,
  is_pay_success:false
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload?.data[0]?.tiers
      };
    case PAY_NOW:
      return {
        ...state,
        isPay: !state.isPay
      };
    case PAY_NOW_SUCCESS:
    return {
      ...state,
      is_pay_success: !state.is_pay_success
    };
    case GET_PAYMENT_HISTORY:
      return {
        ...state,
        payments: action.payload?.data,
        total: action.payload?.total
      }
    case CUSTOMER_CARD:
      return {
        ...state,
        cards: action.payload
      }
    case SUBSCRIPTION_INFO:
      return {
        ...state,
        subscription: action.payload
      }
    default:
      return state;
  }
};

export default planReducer;