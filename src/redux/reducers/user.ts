const initialState = {
  user: null,
  loggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default user;
