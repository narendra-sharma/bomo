import { MEMBERS_LIST } from "./mmebersTypes";

const initialState = {
  members: [],
  total: 0,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERS_LIST:
      return {
        ...state,
        members: action.payload.data,
        total: action.payload.members.length,
      };
    default:
      return state;
  }
};

export default memberReducer;
