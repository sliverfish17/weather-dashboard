import { combineReducers } from "redux";
import userReducer from "./user";

const rootReducer = combineReducers({ userInfo: userReducer });

export default rootReducer;
