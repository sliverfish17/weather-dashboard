import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  loggedIn: false,
};

const user = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UserActionTypes.SET_USER_LOGGED_IN:
      return {
        user: { ...state },
        loggedIn: action.payload,
      };

    case UserActionTypes.SET_USER_LOGGED_OUT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default user;
