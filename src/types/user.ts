export interface UserState {
  user: { [key: string]: any } | null;
  loggedIn: boolean;
}

export interface UserLogin {
  user: any | null;
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN",
  SET_USER_LOGGED_OUT = "SET_USER_LOGGED_OUT",
}

interface SetUserAction {
  type: UserActionTypes.SET_USER;
  payload: any[];
}

interface FetchUserLoggedIn {
  type: UserActionTypes.SET_USER_LOGGED_IN;
  payload: boolean;
}

interface FetchUserLoggedOut {
  type: UserActionTypes.SET_USER_LOGGED_OUT;
}

export type UserAction = SetUserAction | FetchUserLoggedIn | FetchUserLoggedOut;
