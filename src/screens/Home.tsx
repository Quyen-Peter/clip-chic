import { Link } from "react-router-dom";
import Header from "../component/Header";
import img1 from "../assest/img1.png";
import "../css/Home.css";
import { useEffect, useRef, useState } from "react";
import backgroundMainTwo from "../assest/backgroundMainTwo.png";
import img2 from "../assest/img2.png";
import img3 from "../assest/img3.png";
import vector1 from "../assest/Vector.png";
import clip1 from "../assest/clip1.png";
import clip2 from "../assest/clip2.png";
import vector2 from "../assest/Vector2.png";
import clip3 from "../assest/clip3.png";
import background3 from "../assest/background3.png";
import vecter3 from "../assest/Vector3.png";
import vecter4 from "../assest/Vector4.png";
import box1 from "../assest/box1.png";
import box2 from "../assest/box2.png";
import Footer from "../component/Footer";


const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false); 

  useEffect(() => {

  const hero = ref.current;

  const heroObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {

        if (entry.isIntersecting) {
          setVisible(true);
        } else {

          setVisible(false);
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );
  if (hero) heroObserver.observe(hero);

  const root = document.querySelector(".home-container");
  const targets = root?.querySelectorAll<HTMLElement>(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-fade"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("show");   
        } else {
          el.classList.remove("show"); 
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  targets?.forEach((el) => io.observe(el));

  return () => {
    heroObserver.disconnect();
    io.disconnect();
  };
}, []);


  return (
    <div>
      <div className="home-header">
        <Header />
      </div>

      <div className="home-container">

        <div ref={ref} className="home-first">
          <div className={`home-first-content ${visible ? "show" : ""}`}>
            <h1>Sleek Hair, Sharp Style Trend Everyday!</h1>
            <p>
              Welcome to Clip&Chick - your online destination for stylish,
              custom hair clips! Pick your color, charm, and name - designing
              your own cute clip is super easy! Too cute to handle - just clip
              it and shine!
            </p>
            <button>Customize </button>
          </div>
          <img src={img1} className={visible ? "show" : ""} alt="Hair Clip" />
        </div>

        <div className="home-second">
          <img
            src={backgroundMainTwo}
            alt="Background"
            className="backgroundMainTwo reveal-fade"
          />
          <div className="imgContainer">
            <img src={img2} alt="Hair Clip" className="img2 reveal-left" />
            <div className="textContainer">
              <img src={img3} alt="Hair Clip" className="img3 reveal-up" />
              <h2 className="reveal-up">
                For Trendsetters, Dreamers, And Anyone Who Dares To Stand Out.
              </h2>
              <p className="reveal-up">
                At Clip&Chick, we create custom hair clips that show off your
                mood, your style, and your vibe. Each piece is handmade with
                love, color, and attitude - just like you.
              </p>
              <Link to="/About">
                <button className="reveal-up">
                  About us <img src="icon" alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="home-third">
          <div className="home-third-content">
            <h2 className="reveal-up">Our Favourite</h2>
            <p className="reveal-up">
              Every clip is handmade with care to bring you a perfect mix of
              function, comfort, and personality - all in one tiny accessory.
            </p>
          </div>

          <img src={clip1} alt="Clip" className="clip1 reveal-left" />
          <img src={vector1} alt="Vector" className="vector1 reveal-fade" />

          <h3 className="Blush-Pearl-h3 reveal-up">Blush Pearl</h3>
          <p className="Blush-Pearl reveal-up">
            Blush Pearl - a soft pastel claw clip with a pearly glow and gentle
            hold - perfect for everyday elegance. Wear it to coffee dates, work,
            or dreamy afternoon strolls.
          </p>

          <img src={clip2} alt="Clip" className="clip2 reveal-right" />
          <img src={vector2} alt="Vector" className="vector2 reveal-fade" />

          <h3 className="flutterbelle-h3 reveal-up">Flutterbelle</h3>
          <p className="flutterbelle reveal-up">
            Flutterbelle - a soft, floral claw clip with sparkly butterfly
            touches, adding a dreamy charm to your hair.
          </p>

          <img src={clip3} alt="Clip" className="clip3 reveal-left" />
          <h3 className="cloudine-h3 reveal-up">Cloudine</h3>
          <p className="cloudine reveal-up">
            Cloudine - a pearlescent claw clip with a dreamy, cloud-like
            shimmer, bringing a soft and airy elegance to your everyday look.
          </p>

          <Link to={"/Production"}>
            <button className="reveal-up">View more</button>
          </Link>
        </div>


        <div className="home-fourth">
          <img
            src={background3}
            alt="Background"
            className="background3 reveal-fade"
          />
          <div className="home-fourth-content">
            <h3 className="reveal-up">Surprise Me!</h3>
            <p className="reveal-up">A little mystery, a lot of style.</p>
            <p className="reveal-up">
              Your blindbox is curated just for you — playful, personal, and
              full of surprises.
            </p>
            <p className="Ready-p reveal-up">Ready to unwrap yours?</p>
          </div>

          <img src={vecter3} alt="Vector" className="vecter3 reveal-fade" />
          <img src={box1} alt="box1" className="box1 reveal-left" />
          <h3 className="box1-h3 reveal-up">SUMMER COLLECTION</h3>
          <p className="box1-p1 reveal-up">Sun-kissed colors. Carefree vibes.</p>
          <p className="box1-p2 reveal-up">
            Clip & Chic's Summer Collection brings the brightness of sunny days
            into every clip — perfect for beach strolls, iced coffee dates, and
            everything in between
          </p>
          <p className="box1-p3 reveal-up">Designed to glow with you.</p>
          <button className="box1-button reveal-up">Add to cart</button>

          <img src={vecter4} alt="Vector" className="vecter4 reveal-fade" />
          <img src={box2} alt="box2" className="box2 reveal-right" />
          <h3 className="box2-h3 reveal-up">BACK TO SCHOOL COLLECTION</h3>
          <p className="box2-p1 reveal-up">New semester, new style.</p>
          <p className="box2-p2 reveal-up">
            Our Back to School Collection is made for fresh starts and bold
            self-expression — whether you're acing classes or turning hallways
            into runways.
          </p>
          <p className="box2-p3 reveal-up">Stay smart, stay chic.</p>
          <button className="box2-button reveal-up">Add to cart</button>
        </div>
      </div>
      
      <div className="home-footer">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
