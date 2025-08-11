import "../css/Footer.css";
import IconRight from '../assest/IconRight.png';
import { Link } from "react-router-dom";
import In from '../assest/in.png';
import Inta from '../assest/inta.png';

const Footer = () =>{
    return(
        <div className="container">
            <h1>CONTACT HERE</h1>
            <div className="contact-first">
                <div>
                    <span className="dot">•</span>
                    <a className="text-titel">Email Address</a><br/>
                    <div className="email-container">
                        <input type="text" className="input-email" placeholder="name@example.com"/>
                        <button className="button-email">Send</button>
                    </div>
                </div>
                <div className="location">
                    <div className="location-text">
                       <span className="text-titel">Location</span><br/><br/>
                       <a>FPT - HCM - VietNam</a><br/>
                       <a>+84 1010101010</a>
                    </div>
                    <div className="location-buttom">
                       <button className="buttom">Route <img className="buttom-img" src={IconRight}/></button>
                    </div>
                </div>
            </div>
            <div className="line"></div> 
            <div className="contact-second">
                <div>
                    <span className="text-titel">Directly To</span>
                    <div className="link-grid">
                        <div>
                            <Link className="Link" to="/About">Abount us</Link><br/>
                            <Link className="Link" to="/Production">Our Productions</Link>
                        </div>
                        <div>
                            <Link className="Link" to="/Customization">3DCustomization</Link><br/>
                            <Link className="Link" to="/Blindbox">Blindbox</Link>
                        </div>
                    </div>
                </div>
                <div className="Privacy">
                    <img className="image" src={Inta}/>
                    <img className="image" src={In}/>
                    <a>Privacy Policy</a>
                </div>
            </div>
            <div className="line" style={{marginBottom: "70px"}}></div> 
        </div>
    )
}

export default Footer;