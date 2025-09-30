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
    <div className="home">
      <div className="home-header">
        <Header />
      </div>

      <div className="home-container">
        <div ref={ref} className="home-first">
          <div className={`home-first-content ${visible ? "show" : ""}`}>
            <h1>Tóc mượt mà, phong cách sắc nét - xu hướng mỗi ngày!</h1>
            <p>
              Chào mừng đến với Clip&Chic - điểm đến trực tuyến cho những chiếc
              kẹp tóc thời trang và cá tính! Hãy chọn màu sắc, charm và tên của
              bạn - thiết kế chiếc kẹp đáng yêu của riêng mình thật dễ dàng! Quá
              dễ thương để cưỡng lại - chỉ cần kẹp và tỏa sáng!
            </p>
            <button>Cá nhân hóa </button>
          </div>
          <img src={img1} className={visible ? "show" : ""} alt="Hair Clip" />
        </div>

        <div className="home-second">
          <img
            src={backgroundMainTwo}
            alt="Background"
            className="backgroundMainTwo"
          />
          <div className="imgContainer">
            <img src={img2} alt="Hair Clip" className="img2 reveal-left" />
            <div className="textContainer">
              <img src={img3} alt="Hair Clip" className="img3 reveal-up" />
              <h2 className="reveal-up">
                Dành cho những người dẫn đầu xu hướng, kẻ mộng mơ và bất kỳ ai
                dám khác biệt.
              </h2>
              <p className="reveal-up">
                Tại Clip&Chic, chúng tôi tạo ra những chiếc kẹp tóc tùy chỉnh
                phản chiếu tâm trạng, phong cách và cá tính của bạn. Mỗi sản
                phẩm đều được làm thủ công với tình yêu, sắc màu và thái độ
                riêng - giống như chính bạn.
              </p>
              <Link to="/About">
                <button className="reveal-up">
                  Về chúng tôi <img src="icon" alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="home-third">
          <div className="home-third-content">
            <h2 className="reveal-up">Sản phẩm được ưa chuộng nhất</h2>
            <p className="reveal-up">
              Mỗi chiếc kẹp đều được làm thủ công tỉ mỉ để mang đến cho bạn sự
              kết hợp hoàn hảo giữa tiện ích, thoải mái và cá tính - tất cả gói
              gọn trong một phụ kiện nhỏ bé.
            </p>
          </div>

          <img src={clip1} alt="Clip" className="clip1 reveal-left" />
          <img src={vector1} alt="Vector" className="vector1 reveal-fade" />

          <h3 className="Blush-Pearl-h3 reveal-up">Hồng Ngọc Trai</h3>
          <p className="Blush-Pearl reveal-up">
            Blush Pearl - chiếc kẹp càng cua pastel dịu nhẹ với ánh ngọc trai
            óng ánh và độ giữ chắc vừa phải - hoàn hảo cho vẻ thanh lịch mỗi
            ngày. Thích hợp để đi cà phê, đi làm, hay những buổi dạo chiều mộng
            mơ.
          </p>

          <img src={clip2} alt="Clip" className="clip2 reveal-right" />
          <img src={vector2} alt="Vector" className="vector2 reveal-fade" />

          <h3 className="flutterbelle-h3 reveal-up">Nàng Bướm Xinh</h3>
          <p className="flutterbelle reveal-up">
            Flutterbelle - chiếc kẹp càng cua mềm mại, mang họa tiết hoa cùng
            điểm xuyến cánh bướm lấp lánh, đem lại nét cuốn hút mộng mơ cho mái
            tóc của bạn.
          </p>

          <img src={clip3} alt="Clip" className="clip3 reveal-left" />
          <h3 className="cloudine-h3 reveal-up">Mây Bồng Bềnh</h3>
          <p className="cloudine reveal-up">
            Cloudine - chiếc kẹp càng cua ánh ngọc trai với vẻ lấp lánh tựa mây,
            mang đến nét thanh lịch nhẹ nhàng và bồng bềnh cho phong cách hằng
            ngày của bạn.
          </p>

          <Link to={"/Production"}>
            <button className="reveal-up">Xem thêm</button>
          </Link>
        </div>

        <div className="home-fourth">
          <img src={background3} alt="Background" className="background3 " />
          <div className="home-fourth-content">
            <h3 className="reveal-up">Bất ngờ dành cho bạn!</h3>
            <p className="reveal-up">Một chút bí ẩn, muôn phần phong cách.</p>
            <p className="reveal-up">
              Blindbox của bạn được chọn lọc riêng - tinh nghịch, cá tính và
              tràn ngập bất ngờ.
            </p>
            <p className="Ready-p reveal-up">
              Bạn đã sẵn sàng mở bất ngờ của mình chưa?
            </p>
          </div>

          <img src={vecter3} alt="Vector" className="vecter3 reveal-fade" />
          <img src={box1} alt="box1" className="box1 reveal-left" />
          <h3 className="box1-h3 reveal-up">Bộ Sưu Tập Mùa Hè</h3>
          <p className="box1-p1 reveal-up">
            Gam màu nắng hôn. Phong thái tự do, thoải mái.
          </p>
          <p className="box1-p2 reveal-up">
            Bộ Sưu Tập Mùa Hè của Clip & Chic mang ánh sáng rực rỡ của những
            ngày nắng vào từng chiếc kẹp — hoàn hảo cho những buổi dạo biển, hẹn
            cà phê đá hay bất kỳ khoảnh khắc nào trong ngày.
          </p>
          <p className="box1-p3 reveal-up">Tỏa sáng theo cách của riêng bạn.</p>
          <button className="box1-button reveal-up">Thêm vào giỏ hàng</button>

          <img src={vecter4} alt="Vector" className="vecter4 reveal-fade" />
          <img src={box2} alt="box2" className="box2 reveal-right" />
          <h3 className="box2-h3 reveal-up">Sắc Màu Tựu Trường</h3>
          <p className="box2-p1 reveal-up">Học kỳ mới, phong cách mới.</p>
          <p className="box2-p2 reveal-up">
            Bộ Sưu Tập Back to School của chúng tôi được tạo ra cho những khởi
            đầu mới và sự tự tin thể hiện cá tính — dù bạn đang chinh phục lớp
            học hay biến hành lang thành sàn diễn thời trang.
          </p>
          <p className="box2-p3 reveal-up">Vừa thông minh, vừa phong cách.</p>
          <button className="box2-button reveal-up">Thêm vào giỏ hàng</button>
        </div>
      </div>

      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
