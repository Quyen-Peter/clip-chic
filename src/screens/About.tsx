import { Link } from "react-router-dom";
import Header from "../component/Header";
import IMG from "../assest/IMG.png";
import "../css/AbountUs.css";
import chic from "../assest/chic.png";
import Footer from "../component/Footer";

const About = () => {
  return (
    <div className="about-page">
      <header className="Header site-header">
        <Header />
      </header>
      <main className="site-main">
        <div className="about-hero">
          <img src={IMG} />
        </div>
        <div className="about-hero__text">
          <h1>Về chúng tôi</h1>
          <p className="brand">Clip &amp; Chic</p>
          <p className="tagline">
            “Tóc mượt, phong cách chất, bắt trend mỗi ngày”
          </p>
        </div>
        <div className="about-block">
          <h3 className="eyebrow pink">Hành trình của chúng tôi</h3>
          <p>
            Ra đời năm 2025, <strong>Clip &amp; Chic</strong> là một thương hiệu
            Việt Nam mang sự cá nhân hóa vào những phụ kiện hằng ngày. Chúng tôi
            trao quyền cho người dùng tự thiết kế kẹp tóc của riêng mình với
            công cụ 3D, nhận gợi ý tạo kiểu từ AI và tận hưởng niềm vui bất ngờ
            với trải nghiệm Blindbox.
          </p>
          <p>
            Tại <strong>Clip &amp; Chic</strong>, Thể hiện bản thân - đơn giản,
            phong cách, vui tươi.
          </p>
        </div>

        <div className="about-block">
          <h3 className="eyebrow pink">Định hướng của chúng tôi</h3>
          <p>Tạo dấu ấn. Thể hiện mình. Chia sẻ niềm vui.</p>
          <p>Trung tâm làm đẹp DIY của Việt Nam dành cho thế hệ mới.</p>
        </div>

        <div className="about-block">
          <h3 className="eyebrow pink">Sứ mệnh của chúng tôi</h3>
          <p>“Hãy là chính bạn với những chiếc kẹp tóc.”</p>

          <p>
            Chúng tôi mang đến trải nghiệm và cá tính, chứ không chỉ là kẹp tóc.
          </p>
          <p>Mỗi chiếc kẹp là một khoảnh khắc bạn được là chính mình.</p>
        </div>

        <div className="about-block line-line">
          <h3 className="eyebrow pink">
            Chiếc kẹp - phong cách mang dấu ấn của bạn.
          </h3>

          <p>
            Không chỉ là một món phụ kiện tóc, chiếc kẹp còn là vòng xoáy cá
            tính - mềm mại, thanh lịch và luôn đổi mới.
          </p>

          <p>
            Lấy cảm hứng từ những đường cong uyển chuyển của chiếc kẹp càng cua,
            logo của chúng tôi khắc họa tinh thần tự do thể hiện bản thân:
            <br />
            Đôi khi dịu dàng, đôi khi táo bạo - nhưng luôn là chính bạn, thật
            độc đáo.
          </p>
        </div>

        <div className="imgChic">
          <img src={chic} alt="Chic Logo" />
        </div>
      </main>

      <footer className="footer site-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default About;
