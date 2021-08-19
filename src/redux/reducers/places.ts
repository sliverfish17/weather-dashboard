import { InitT } from "../../types/places";

const initialState: InitT = {
  cache: [],
};

const cachePlaceReducer = (state = initialState, action): InitT => {
  switch (action.type) {
    case "SET_WEATHER":
      return {
        ...state,
        cache: [...state.cache, action.payload],
      };
    default:
      return state;
  }
};

export default cachePlaceReducer;
