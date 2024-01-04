import { combineReducers } from "redux";
import authReducer from "./User/userReducer";
import loaderReducer from "./Loader/loaderReducer";
import planReducer from "./PlansPayments/planReducer";
import brandReducer from "./Brand/brandReducer";
import memberReducer from "./members/memebrsReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  plan: planReducer,
  brand: brandReducer,
  member: memberReducer,
});

export default rootReducer;
