import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import LoginWith from "../../component/LoginWith";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
const API_URL = process.env.REACT_APP_HOST_API;




const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedError = sessionStorage.getItem("savedError");
    if (savedError){
      setError(savedError);
      sessionStorage.removeItem("savedError");
    } 
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch(`${API_URL}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password: password
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.message);
    }
    else{
      console.log("Kết quả:", data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      navigate("/Account");
    }
    
  } catch (error) {
    setLoading(false);
    setError("Tài khoản chưa được đăng kí");
  }
};


  return (
    <div className="login-main-container">
      <div className="login-container">
        <h2>Tài khoản đăng nhập</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div style={{display: "flex", alignItems: "center"}}>
            <a className="title-a">Tên đăng nhập</a>
            <input type="email" required className="email-login" style={{marginLeft: "50px"}} value={email || ""}  onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <a className="title-a">Mật khẩu</a>
            <input type="password" required className="password-login" value={password || ""}  onChange={(e) => setPassword(e.target.value)}/>
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
            <div className="error-create-user">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button type="submit">{" "}
            {loading ? (
              <ThreeDot color="#ffffffff" size="small" text="" textColor="" />
            ) : (
              "Đăng nhập"
            )}{" "}
          </button>
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
