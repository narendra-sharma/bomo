import { MEMBERS_LIST } from "./mmebersTypes";

const initialState = {
  members: [],
  total: 0,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_LIST:
      console.log("action", action.payload?.customer_count);
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
