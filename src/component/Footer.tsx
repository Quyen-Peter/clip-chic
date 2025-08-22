import "../css/Footer.css"
import IconRight from '../assest/IconRight.png';
import { Link } from "react-router-dom";
import In from '../assest/in.png';
import Inta from '../assest/inta.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h1 className="footer__title">CONTACT HERE</h1>

        <div className="footer__top">
          <div>
            <span className="footer__dot">•</span>
            <span className="footer__label">Email Address</span><br/>
            <div className="footer__email">
              <input type="text" className="footer__input" placeholder="name@example.com"/>
              <button className="footer__send">Send</button>
            </div>
          </div>

          <div className="footer__location">
            <div className="footer__locText">
              <span className="footer__label">Location</span><br/><br/>
              <span>FPT - HCM - VietNam</span><br/>
              <span>+84 1010101010</span>
            </div>
            <div className="footer__locBtn">
              <button className="footer__route">Route <img className="footer__routeIcon" src={IconRight} alt=">" /></button>
            </div>
          </div>
        </div>

        <hr className="footer__hr" />

        <div className="footer__bottom">
          <div>
            <span className="footer__label">Directly To</span>
            <div className="footer__links">
              <div>
                <Link className="footer__link" to="/About">About us</Link><br/>
                <Link className="footer__link" to="/Production">Our Productions</Link>
              </div>
              <div>
                <Link className="footer__link" to="/Customization">3DCustomization</Link><br/>
                <Link className="footer__link" to="/Blindbox">Blindbox</Link>
              </div>
            </div>
          </div>

          <div className="footer__privacy">
            <img className="footer__icon" src={Inta} alt="Instagram" />
            <img className="footer__icon" src={In} alt="LinkedIn" />
            <a className="footer__privacyLink">Privacy Policy</a>
          </div>
        </div>

        <hr className="footer__hr footer__hr--end" />
      </div>
    </footer>
  );
};

export default Footer;
