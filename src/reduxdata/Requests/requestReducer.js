import { GET_EDIT_REQUEST_DATA, GET_REQUEST_LIST, GET_ADMIN_PENDING_REQUEST_LIST, GET_POLL_REQUEST_LIST, GET_ADMIN_ASSIGN_REQUEST_LIST, GET_DESIGNER_ASSIGNED_REQUEST_LIST, GET_DESIGNER_ACTIVE_REQUEST_LIST, DELIEVER_REQUEST_DATA, GET_CUSTOMER_ACTIVE_REQUEST_LIST, GET_SUPER_ADMIN_APPROVE_REQUEST_LIST, SUBMIT_NOW, GET_FEEDBACK_QUE} from "./requestTypes";
const initialState = {
  pendingRequests: [],
  pendingTotal:0,
  totaldrafts:0,
  draftrequests:[],
  pollrequests:[],
  assignrequests:[],
  totalassigns:0,
  designerassignedrequests: [],
  activerequest: [],
  requestTypes:[
    {type: 'logo', color: '#6D3FF3',value:'logo'},
    {type: 'short ad', color: '#B185F2',value:'short_ad'},
    {type: 'web animation', color: '#EDAFFE',value:'web_animation'},
    {type: 'icon', color: '#2DB985',value:'icon'},
    {type: 'typography', color: '#D6C10B',value:'typography'},
    {type: 'brand element', color: '#0657EB',value:'brand_element'},
    {type: 'intro', color: '#FE58AE',value:'intro'},
    {type: 'outro', color: 'brown',value:'outro'},
    {type: 'transition', color: '#F92B34',value:'transition'},
    {type: 'UI animation', color: '#7C96FE',value:'ui_animation'},
    {type: 'loop', color: '#FA812A',value:'loop'},
    {type: 'custom', color: 'black',value:'custom'}
  ],
  editrequestData:null,
  delieverRequestdetails:null,
  customerActiverequests:[],
  superadminapprovelist:[],
  issubmit: false,
  feedbacklists:[]
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
      };
    case GET_DESIGNER_ASSIGNED_REQUEST_LIST:
      return {
        ...state,
        designerassignedrequests: action.payload.data,
      };
    case GET_DESIGNER_ACTIVE_REQUEST_LIST:
      return {
        ...state,
        activerequest: action.payload.data,
      };
    case DELIEVER_REQUEST_DATA:
      return {
        ...state,
        delieverRequestdetails: action.payload,
      };
    case GET_CUSTOMER_ACTIVE_REQUEST_LIST:
      return {
        ...state,
        customerActiverequests: action.payload.data,
      };
    case GET_SUPER_ADMIN_APPROVE_REQUEST_LIST:
      return {
        ...state,
        superadminapprovelist: action.payload.data,
      };
    case SUBMIT_NOW:
      return {
        ...state,
        issubmit: !state.issubmit
      };
    case GET_FEEDBACK_QUE:
      return {
        ...state,
        feedbacklists: action.payload
      }
    default:
      return state;
  }
};

export default requestReducer;
