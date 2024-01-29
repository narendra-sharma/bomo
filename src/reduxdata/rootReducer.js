import { combineReducers } from "redux";
import authReducer from "./User/userReducer";
import loaderReducer from "./Loader/loaderReducer";
import planReducer from "./PlansPayments/planReducer";
import brandReducer from "./Brand/brandReducer";
import memberReducer from "./members/memebrsReducer";
import requestReducer from "./Requests/requestReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  plan: planReducer,
  brand: brandReducer,
  member: memberReducer,
  requests: requestReducer,
});

export default rootReducer;
