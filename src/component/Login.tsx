import { Link } from "react-router-dom";
import logologin from "../assest/logoNoBack.png";
import "../css/Login.css";


const Login = () => {
  return (
    <div className="login-main-container">
      <img src={logologin} alt="Logo" className="logoLogin"/>
      <div className="login-container">
        <h2>LOG IN ACCOUNT</h2>
        <form className="login-form">
          <div>
            <a className="title-a">Email or username</a>
            <input type="email" required className="email-login"/>
          </div>
          <div>
            <a className="title-a">Password</a>
            <input type="password" required  className="password-login"/>
          </div>
          <div className="checkbox-forgot-container">
            <div className="checkbox-container-login">
              <input type="checkbox" required />
              <a>Save password</a>
            </div>
            <Link to={"/Forgot"} className="link-forgot">Forgot your password?</Link>
          </div>
          <button type="submit">LOG IN</button>
        </form>
        <div className="or-container-login">
          <div className="line-coler"></div>
          <a>OR</a>
          <div className="line-coler"></div>
        </div>
        <div className="social-login">
          <Link to={"/Production"}>Facebook</Link>
          <a>|</a>
          <Link to={"/About"}>Google</Link>
        </div>
        <div className="login-link">
          <p>
            Don’t have an account? <Link to={"/CreateLogin"}>Create your account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
