import { combineReducers } from "redux";
import authReducer from "./User/userReducer";
import loaderReducer from "./Loader/loaderReducer";
import planReducer from "./Plans/planReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    plan: planReducer,
  });
  
  export default rootReducer;
