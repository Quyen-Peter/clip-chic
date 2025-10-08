import { Link, useNavigate } from "react-router-dom";
import logologin from "../../assest/logoNoBack.png";
import "../../css/Login.css";
import LoginWith from "../../component/LoginWith";


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/Account");
  };



  return (
    <div className="login-main-container">
      <div className="login-container">
        <h2>Tài khoản đăng nhập</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div style={{display: "flex", alignItems: "center"}}>
            <a className="title-a">Tên đăng nhập</a>
            <input type="email" required className="email-login" style={{marginLeft: "50px"}}/>
          </div>
          <div>
            <a className="title-a">Mật khẩu</a>
            <input type="password" required className="password-login" />
          </div>
          <div className="checkbox-forgot-container">
            <div className="checkbox-container-login">
              <input type="checkbox" />
              <a>Lưu mật khẩu</a>
            </div>
            <Link to={"/Forgot"} className="link-forgot">
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit">Đăng nhập</button>
        </form>

        <div className="or-container-login">
          <div className="line-coler"></div>
          <a>OR</a>
          <div className="line-coler"></div>
        </div>

        <div className="social-login">
            <LoginWith/>
        </div>

        <div className="login-link">
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link to={"/Account/Create"}>Tạo tài khoản mới</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
