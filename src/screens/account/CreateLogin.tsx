import "../../css/CreateLogin.css";
import logo from "../../assest/logoNoBack.png";
import { Link } from "react-router-dom";
import LoginWith from "../../component/LoginWith";


const CreateLogin = () => {
  return (
    <div className="create-login-main-container">
      {/* <img src={logo} alt="Logo" className="logoCreateLogin" /> */}
      <div className="create-login-container">
        
        <h2>Tạo tài khoản mới</h2>
        <form className="create-login-form">
          <div style={{display: "flex"}}>
            <a className="title-a" style={{width: "130px"}}>Tên đăng nhập</a>
            <input type="text"  required className="name" style={{marginLeft: "26px"}}/>
          </div>
          <div>
            <a className="title-a">Email</a>
            <input type="email"  required className="email email-login"/>
          </div>
          <div>
            <a className="title-a">Mật khẩu</a>
            <input type="password"  required className="password password-login" />
          </div>
          <div className="title-a">
            <a>Confirm password </a>
            <input type="password"  required className="confirm-password"/>
          </div>
          <div className="checkbox-container">
            <input type="checkbox"  required />
            <p>Bằng cách đăng ký thông tin của bạn, bạn đồng ý với Điều khoản & Điều kiện, Chính sách Quyền riêng tư và Cookie của chúng tôi.</p>
          </div>
          <button type="submit">Tạo tài khoản</button>
        </form>
        <div className="or-container">
          <div className="line-coler"></div>
          <a>OR</a>
          <div className="line-coler"></div>
        </div>
        <div className="social-login">
            <LoginWith/>
        </div>
        <div className="login-link">
          <p>Bạn đã có tài khoản? <Link to={"/Account/Login"}>Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CreateLogin;
