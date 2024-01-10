import { MEMBERS_LIST, USERS_LIST } from "./mmebersTypes";

const initialState = {
  members: [],
  users:[],
  inactiveUsers:[],
  total: 0,
  inactiveTotal:0
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
      return ((action.payload?.role==='designer') && action.payload?.active)?
      {
        ...state,
        users: action.payload?.data,
        total: action.payload?.total,
      }
      :((action.payload?.role==='designer') && !action.payload?.active)?
      {
        ...state,
        inactiveUsers: action.payload?.data,
        inactiveTotal: action.payload?.total,
      }:{
        ...state,
        users: action.payload?.data,
        total: action.payload?.total,
      };  
    default:
      return state;
  }
};

export default memberReducer;
