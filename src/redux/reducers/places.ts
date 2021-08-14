export type DailyT = {
  daily: {
    dt: number;
    temp: { max: number };
  }[];
};

export type InitT = {
  current: DailyT | null;
  cache: {
    daily: { dt: number; temp: { max: number } }[];
  }[];
};

const initialState: InitT = {
  current: null,
  cache: [],
};

const cachePlaceReducer = (state = initialState, action: any): InitT => {
  switch (action.type) {
    case "SET_WEATHER":
      return {
        ...state,
        current: action.payload,
        cache: [...state.cache, action.payload],
      };
    default:
      return state;
  }
};

export default cachePlaceReducer;
