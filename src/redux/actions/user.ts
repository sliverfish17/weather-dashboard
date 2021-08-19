import { UserState } from "../../types/user";

export const setLoggedIn = (loggedIn: boolean) => ({
  type: "SET_LOGGED_IN",
  payload: loggedIn,
});

export const setUserData = (user: UserState | null) => ({
  type: "SET_USER",
  payload: user,
});

export const setLogOut = () => ({
  type: "SET_LOGGED_OUT",
});
