import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserData } from "../../redux/actions/user";
import { UserLogin } from "../../types/user";

import google from "../../assets/img/google-logo.png";
import facebook from "../../assets/img/facebook-logo.png";
import github from "../../assets/img/github-logo.png";

import "./Login.scss";

function Login() {
  const dispatch = useDispatch();

  const auth = firebase.auth();

  const loginGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user }: UserLogin = await auth.signInWithPopup(provider);
    dispatch(setUserData(user));
    dispatch(setLoggedIn(true));
  };

  const loginGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    const { user }: UserLogin = await auth.signInWithPopup(provider);
    dispatch(setUserData(user));
    dispatch(setLoggedIn(true));
  };

  const loginFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { user }: UserLogin = await auth.signInWithPopup(provider);
    dispatch(setUserData(user));
    dispatch(setLoggedIn(true));
  };

  return (
    <div className="login">
      <div className="login__block">
        <div className="login__block_logos" onClick={loginGoogle}>
          <img
            src={google}
            alt="google_logo"
            className="login__block_logos_img"
          />
          Sign up with Google
        </div>
        <div className="login__block_logos" onClick={loginFacebook}>
          <img
            src={facebook}
            alt="facebook_logo"
            className="login__block_logos_img"
          />
          Sign up with Facebook
        </div>
        <div className="login__block_logos" onClick={loginGithub}>
          <img
            src={github}
            alt="github_logo"
            className="login__block_logos_img"
          />
          Sign up with Github
        </div>
      </div>
    </div>
  );
}

export default Login;
