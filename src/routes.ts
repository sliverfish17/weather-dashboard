import Login from "./components/Login/Login";
import Map from "./components/Map/Map";
import { LOGIN_ROUTE, MAP_ROUTE } from "./components/utils/consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: MAP_ROUTE,
    Component: Map,
  },
];
