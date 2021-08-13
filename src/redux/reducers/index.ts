import { combineReducers } from "redux";
import userReducer from "./user";
import cachePlaceReducer from "./places";

const appReducer = combineReducers({
  userInfo: userReducer,
  weatherInfo: cachePlaceReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SET_LOGGED_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
