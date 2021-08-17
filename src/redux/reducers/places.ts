export type DailyT = {
  daily: {
    dt: number;
    temp: { max: number };
  }[];
};

export type InitT = {
  cache: {
    daily: { dt: number; temp: { max: number } }[];
    lat: number;
    lon: number;
  }[];
};

const initialState: InitT = {
  cache: [],
};

const cachePlaceReducer = (state = initialState, action: any): InitT => {
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
