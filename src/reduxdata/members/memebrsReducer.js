import { MEMBERS_LIST, USERS_LIST } from "./mmebersTypes";

const initialState = {
  members: [],
  users:[],
  total: 0,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_LIST:
      return {
        ...state,
        members: action.payload?.data,
        total: action.payload?.customer_count,
      };
    case USERS_LIST:
      return {
        ...state,
        members: action.payload?.data,
        total: action.payload?.customer_count,
      };  
    default:
      return state;
  }
};

export default memberReducer;
