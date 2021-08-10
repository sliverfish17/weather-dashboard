import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setUserData } from "../../redux/actions/user";
import "./Header.scss";
function Header() {
  //@ts-ignore
  const info = useSelector((loggedIn) => loggedIn.userInfo);
  const dispatch = useDispatch();
  // header
  return (
    <div className="header">
      <h1>Weather-Dashboard App</h1>
      {
        <div>
          {info.loggedIn ? (
            <>
              <div className="info">
                <img
                  src={info.user.photoURL}
                  alt="avatar"
                  className="info__picture"
                />
                <span className="info__name">{info.user.displayName}</span>
                <button
                  className="info__button"
                  onClick={() => dispatch(setLoggedIn(false))}
                >
                  Log out
                </button>
              </div>
            </>
          ) : null}
        </div>
      }
    </div>
  );
}

export default Header;
