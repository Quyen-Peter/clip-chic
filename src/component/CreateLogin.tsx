import "../css/CreateLogin.css";
import logo from "../assest/logoNoBack.png";
import { Link } from "react-router-dom";



const CreateLogin = () => {
  return (
    <div className="create-login-main-container">
      <img src={logo} alt="Logo" className="logoCreateLogin" />
      <div className="create-login-container">
        
        <h2>CREATE AN ACCOUNT</h2>
        <form className="create-login-form">
          <div>
            <a className="title-a">Name</a>
            <input type="text"  required className="name"/>
          </div>
          <div>
            <a className="title-a">Email</a>
            <input type="email"  required className="email"/>
          </div>
          <div>
            <a className="title-a">Password</a>
            <input type="password"  required className="password" />
          </div>
          <div className="title-a">
            <a>Confirm password </a>
            <input type="password"  required className="confirm-password"/>
          </div>
          <div className="checkbox-container">
            <input type="checkbox"  required />
            <p>By registering your details, you agree with our Terms & Conditions, and Privacy and Cookie Policy.</p>
          </div>
          <button type="submit">CREATE  ACCOUNT</button>
        </form>
        <div className="or-container">
          <div className="line-coler"></div>
          <a>OR</a>
          <div className="line-coler"></div>
        </div>
        <div className="social-login">
          <Link to={"/Production"}>Facebook</Link>
          <a>|</a>
          <Link to={"/About"} >Google</Link>
        </div>
        <div className="login-link">
          <p>Already have an account? <Link to={"/Login"}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;
