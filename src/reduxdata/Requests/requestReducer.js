import { GET_EDIT_REQUEST_DATA, GET_REQUEST_LIST, GET_ADMIN_PENDING_REQUEST_LIST } from "./requestTypes";
const initialState = {
  pendingRequests: [],
  pendingTotal:0,
  totaldrafts:0,
  draftrequests:[],
  requestTypes:[
    {type: 'logo', color: 'purple',value:'logo'},
    {type: 'short ad', color: 'green',value:'short_ad'},
    {type: 'web animation', color: 'pink',value:'web_animation'},
    {type: 'icon', color: 'lightgreen',value:'icon'},
    {type: 'typography', color: 'orange',value:'typography'},
    {type: 'brand element', color: 'blue',value:'brand_element'},
    {type: 'intro', color: 'Violet',value:'intro'},
    {type: 'outro', color: 'brown',value:'outro'},
    {type: 'transition', color: 'red',value:'transition'},
    {type: 'UI animation', color: 'teal',value:'ui_animation'},
    {type: 'loop', color: 'orange',value:'loop'},
    {type: 'custom', color: 'black',value:'custom'}
  ],
  editrequestData:null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_LIST:
      return {
        ...state,
        draftrequests: action.payload.data,
        totaldrafts: action.payload.request_length,
      };
    case GET_ADMIN_PENDING_REQUEST_LIST:
      return {
        ...state,
        pendingRequests: action.payload?.data,
        pendingTotal: action.payload?.total || 0,
      };
    case GET_EDIT_REQUEST_DATA:
      return {
        ...state,
        editrequestData: action.payload,
      }
    default:
      return state;
  }
};

export default requestReducer;
