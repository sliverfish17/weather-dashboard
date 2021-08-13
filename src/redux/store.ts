import { createStore, compose, applyMiddleware } from "redux";
import appReducer from "./reducers";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const saveState = (state: any) => {
  try {
    const serialisedState = JSON.stringify(state);

    window.localStorage.setItem("app_state", serialisedState);
  } catch (err) {}
};

const loadState = () => {
  try {
    const serialisedState = window.localStorage.getItem("app_state");
    if (!serialisedState) return undefined;

    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

const oldState = loadState();

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  oldState,
  composeEnchancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
