import { combineReducers } from "redux";
import authReducer from "./User/userReducer";
import loaderReducer from "./Loader/loaderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
  });
  
  export default rootReducer;
