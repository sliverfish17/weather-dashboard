const initialState = {
  weather: {},
};

const currentPlaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.payload,
      };
    default:
      return state;
  }
};

export default currentPlaceReducer;
