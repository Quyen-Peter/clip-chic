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
          <h1>ABOUT US</h1>
          <p className="brand">Clip &amp; Chic</p>
          <p className="tagline">“Sleek Hair, Sharp Style Trend Everyday!”</p>
        </div>
        <div className="about-block">
          <h3 className="eyebrow pink">OUR STORY</h3>
          <p>
            Founded in 2025, <strong>Clip &amp; Chic</strong> is a Vietnamese
            brand that brings personalization to everyday accessories. We
            empower users to design their own hair clips with 3D tools, get AI
            styling tips, and enjoy the fun of surprise with our Blindbox
            experience.
          </p>
          <p>
            At <strong>Clip &amp; Chic</strong>, self-expression is made simple,
            stylish, and joyful.
          </p>
        </div>

        <div className="about-block">
          <h3 className="eyebrow pink">OUR VISION</h3>
          <p>Create. Express. Share.</p>
          <p>Vietnam’s DIY beauty hub for the next generation</p>
        </div>

        <div className="about-block">
          <h3 className="eyebrow pink">OUR MISSION</h3>
          <p>“Be yourself with the clips.”</p>

          <p>We create more than accessories.</p>
          <p>We create little moments of self-expression.</p>
        </div>

        <div className="about-block line-line">
          <h3 className="eyebrow pink">THE CLIP – A TWIST OF YOU</h3>

          <p>
            More than just a hair accessory, the Clip is a swirl of personality
            – soft, elegant, and ever-changing.
          </p>

          <p>
            Inspired by the graceful curves of claw clips, our logo captures the
            spirit of self-expression:
            <br />
            Sometimes gentle, sometimes bold – always uniquely you.
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
