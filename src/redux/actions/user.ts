export const setLoggedIn = (loggedIn: boolean) => ({
  type: "SET_LOGGED_IN",
  payload: loggedIn,
});

export const setUserData = (user: object | null) => ({
  type: "SET_USER",
  payload: user,
});

export const setLogOut = () => ({
  type: "OUT_USER",
});
