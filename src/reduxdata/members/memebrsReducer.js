import { MEMBERS_LIST, USERS_LIST, SINGLE_USER_DATA } from "./mmebersTypes";

const initialState = {
  members: [],
  users: [],
  inactiveUsers: [],
  singleUserData: [],
  total: 0,
  inactiveTotal: 0,
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
      return action.payload?.role === "designer" && action.payload?.active
        ? {
            ...state,
            users: action.payload?.data,
            total: action.payload?.total,
          }
        : action.payload?.role === "designer" && !action.payload?.active
        ? {
            ...state,
            inactiveUsers: action.payload?.data,
            inactiveTotal: action.payload?.total,
          }
        : {
            ...state,
            users: action.payload?.data,
            total: action.payload?.total,
          };
    case SINGLE_USER_DATA:
      return {
        ...state,
        singleUserData: action.payload,
      };
    default:
      return state;
  }
};

export default memberReducer;
