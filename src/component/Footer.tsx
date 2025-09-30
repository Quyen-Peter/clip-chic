import "../css/Footer.css"
import IconRight from '../assest/IconRight.png';
import { Link } from "react-router-dom";
import In from '../assest/in.png';
import Inta from '../assest/inta.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h1 className="footer__title">Liên hệ với chúng tôi</h1>

        <div className="footer__top">
          <div>
            <span className="footer__dot">•</span>
            <span className="footer__label">Địa chỉ email</span><br/>
            <div className="footer__email">
              <input type="text" className="footer__input" placeholder="name@example.com"/>
              <button className="footer__send">Gửi</button>
            </div>
          </div>

          <div className="footer__location">
            <div className="footer__locText">
              <span className="footer__label">Địa điểm</span><br/><br/>
              <span>FPT - HCM - VietNam</span><br/>
              <span>+84 1010101010</span>
            </div>
            <div className="footer__locBtn">
              <button className="footer__route">Đường đi <img className="footer__routeIcon" src={IconRight} alt=">" /></button>
            </div>
          </div>
        </div>

        <hr className="footer__hr" />

        <div className="footer__bottom">
          <div>
            <span className="footer__label">Chuyển ngay đến</span>
            <div className="footer__links">
              <div>
                <Link className="footer__link" to="/About">Về chúng tôi</Link><br/>
                <Link className="footer__link" to="/Production">Sản phẩm</Link>
              </div>
              <div>
                <Link className="footer__link" to="/Customization">3D thiết kế</Link><br/>
                <Link className="footer__link" to="/Blindbox">Hộp bất ngờ</Link>
              </div>
            </div>
          </div>

          <div className="footer__privacy">
            <img className="footer__icon" src={Inta} alt="Instagram" />
            <img className="footer__icon" src={In} alt="LinkedIn" />
            <a className="footer__privacyLink">Chính sách bảo mật</a>
          </div>
        </div>

        <hr className="footer__hr footer__hr--end" />
      </div>
    </footer>
  );
};

export default Footer;
