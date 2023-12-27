import { combineReducers } from "redux";
import authReducer from "./User/userReducer";
import loaderReducer from "./Loader/loaderReducer";
import planReducer from "./Plans/planReducer";
import brandReducer from "./Brand/brandReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    plan: planReducer,
    brand: brandReducer,
  });
  
  export default rootReducer;
