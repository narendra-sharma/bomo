import { GET_REQUEST_LIST } from "./requestTypes";
import { GET_ADMIN_REQUEST_LIST } from "./requestTypes";
const initialState = {
  allRequest: [],
  totaldrafts:0,
  draftrequests:[],
  requestTypes:[
    {type: 'logo', color: '#6D3FF3'},
    {type: 'short ad', color: '#B185F2'},
    {type: 'web animation', color: '#EDAFFE'},
    {type: 'icon', color: '#2DB985'},
    {type: 'typography', color: '#D6C10B'},
    {type: 'brand element', color: '#0657EB'},
    {type: 'intro', color: '#FE58AE'},
    {type: 'outro', color: '#777034'},
    {type: 'transition', color: '#F92B34'},
    {type: 'UI animation', color: '#7C96FE'},
    {type: 'loop', color: '#FA812A'},
    {type: 'custom', color: '#000000'}
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
