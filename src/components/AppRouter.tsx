import { Route, Switch, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { LOGIN_ROUTE, MAP_ROUTE } from "./utils/consts";
import { useSelector } from "react-redux";
import { TUser } from "../types/weather";

function AppRouter() {
  const info = useSelector((info: TUser): any => info.userInfo);

  return info.user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => {
        return (
          <Route
            path={path}
            component={Component}
            exact={true}
            key={path}
          ></Route>
        );
      })}
      <Redirect to={MAP_ROUTE}></Redirect>
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => {
        return (
          <Route
            path={path}
            component={Component}
            exact={true}
            key={path}
          ></Route>
        );
      })}
      <Redirect to={LOGIN_ROUTE}></Redirect>
    </Switch>
  );
}
export default AppRouter;
