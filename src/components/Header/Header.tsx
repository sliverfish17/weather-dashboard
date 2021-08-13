import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { setLogOut } from "../../redux/actions/user";
import "./Header.scss";
function Header() {
  const dispatch = useDispatch();
  const info = useSelector((loggedIn: RootStateOrAny) => loggedIn.userInfo);

  const handleLogOut = () => {
    dispatch(setLogOut());
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
