import { GET_REQUEST_LIST } from "./requestTypes";
import { GET_ADMIN_REQUEST_LIST } from "./requestTypes";
const initialState = {
  allRequest: [],
  totaldrafts:0,
  draftrequests:[],
  requestTypes:[
    {type: 'logo', color: 'purple'},
    {type: 'short ad', color: 'green'},
    {type: 'web animation', color: 'pink'},
    {type: 'icon', color: 'lightgreen'},
    {type: 'typography', color: 'orange'},
    {type: 'brand element', color: 'blue'},
    {type: 'intro', color: 'Violet'},
    {type: 'outro', color: 'brown'},
    {type: 'transition', color: 'red'},
    {type: 'UI animation', color: 'teal'},
    {type: 'loop', color: 'orange'},
    {type: 'custom', color: 'black'}
  ]
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        draftrequests: action.payload.data,
        totaldrafts: action.payload.request_length,
      };
    case GET_ADMIN_REQUEST_LIST:
      return {
        ...state,
        allRequest: action.payload.data,
      };
    default:
      return state;
  }
};

export default requestReducer;
