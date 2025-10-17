import "../../css/CreateLogin.css";
import { Link, useNavigate } from "react-router-dom";
import LoginWith from "../../component/LoginWith";
import { useState } from "react";

const CreateLogin = () => {
  const API_URL = process.env.REACT_APP_HOST_API;
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          password: password,
          email: email,
        }),
      });

     const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }
      console.log("Tạo tài khoản thành công:", data);
      alert("Tạo tài khoản thành công!");
      navigate("/Account/Login");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi đăng ký tài khoản.");
    }
  };

  return (
    <div className="create-login-main-container">
      <div className="create-login-container">
        <h2>Tạo tài khoản mới</h2>
        <form className="create-login-form" onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <a className="title-a" style={{ width: "130px" }}>
              Tên đăng nhập
            </a>
            <input
              type="text"
              required
              className="name"
              style={{ marginLeft: "26px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <a className="title-a">Email</a>
            <input
              type="email"
              required
              className="email email-login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <a className="title-a">Mật khẩu</a>
            <input
              type="password"
              required
              className="password password-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="title-a">
            <a>Xác nhận mật khẩu</a>
            <input
              type="password"
              required
              className="confirm-password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <div className="checkbox-container">
            <input type="checkbox" required />
            <p>
              Bằng cách đăng ký thông tin của bạn, bạn đồng ý với Điều khoản &
              Điều kiện, Chính sách Quyền riêng tư và Cookie của chúng tôi.
            </p>
          </div>
          <div className="error-create-user">
            <p>{error}</p>
          </div>
          <button type="submit">Tạo tài khoản</button>
        </form>

        <div className="or-container">
          <div className="line-coler"></div>
          <a>OR</a>
          <div className="line-coler"></div>
        </div>
        <div className="social-login">
          <LoginWith />
        </div>
        <div className="login-link">
          <p>
            Bạn đã có tài khoản? <Link to={"/Account/Login"}>Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;
