import { GET_EDIT_REQUEST_DATA, GET_REQUEST_LIST, GET_ADMIN_PENDING_REQUEST_LIST, GET_POLL_REQUEST_LIST, GET_ADMIN_ASSIGN_REQUEST_LIST} from "./requestTypes";
const initialState = {
  pendingRequests: [],
  pendingTotal:0,
  totaldrafts:0,
  draftrequests:[],
  pollrequests:[],
  assignrequests:[],
  totalassigns:0,
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
  isEditRequest: false
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
      };
    case GET_POLL_REQUEST_LIST:
      return {
        ...state,
        pollrequests: action.payload.data,
      };
    case GET_ADMIN_ASSIGN_REQUEST_LIST:
      return {
        ...state,
        assignrequests: action.payload.data,
        totalassigns: action.payload.total,
      }
    default:
      return state;
  }
};

export default requestReducer;
