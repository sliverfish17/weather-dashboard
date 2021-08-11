import "./Login.scss";
import google from "../../assets/img/google-logo.png";
import twitter from "../../assets/img/twitter-logo.png";
import github from "../../assets/img/github-logo.png";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserData } from "../../redux/actions/user";

function Login() {
  const dispatch = useDispatch();
  const auth = firebase.auth();

  const loginGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    dispatch(setUserData(user));
    dispatch(setLoggedIn(true));
  };

  const loginGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    console.log(provider);

    dispatch(setUserData(user));
    dispatch(setLoggedIn(true));
  };

  return (
    <div className="login">
      <div className="login__block">
        <div className="login__block_logos" onClick={loginGoogle}>
          <img src={google} alt="google_logo" className="logos" />
          Sign up with Google
        </div>
        <div className="login__block_logos">
          <img src={twitter} alt="facebook_logo" className="logos" />
          Sign up with Twitter
        </div>
        <div className="login__block_logos" onClick={loginGithub}>
          <img src={github} alt="github_logo" className="logos" />
          Sign up with Github
        </div>
      </div>
    </div>
  );
}

export default Login;
