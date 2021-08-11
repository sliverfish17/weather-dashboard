import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { setLoggedIn, setUserData } from "../../redux/actions/user";
import "./Header.scss";
function Header() {
  const info = useSelector((loggedIn: RootStateOrAny) => loggedIn.userInfo);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setLoggedIn(false));
    dispatch(setUserData(null));
  };

  return (
    <div className="header">
      <h1>Weather-Dashboard App</h1>
      {
        <div>
          {info.user ? (
            <>
              <div className="info">
                <img
                  src={info.user.photoURL}
                  alt="avatar"
                  className="info__picture"
                />
                <span className="info__name">{info.user.displayName}</span>
                <button className="info__button" onClick={handleLogOut}>
                  Log out
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      }
    </div>
  );
}

export default Header;
