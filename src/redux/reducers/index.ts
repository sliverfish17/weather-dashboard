import { combineReducers } from "redux";
import userReducer from "./user";
import currentPlaceReducer from "./currentPlace";

const rootReducer = combineReducers({
  userInfo: userReducer,
  currentPoint: currentPlaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
