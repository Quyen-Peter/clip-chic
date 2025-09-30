import "../css/Cart.css";
import Footer from "../component/Footer";
import RightBackgrount from "../assest/RightBackgrount.png";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import icon_out_cart from "../assest/icon-out-cart.png";
import trast from "../assest/trast-cart.png";
import cod from "../assest/COD.png";
import qr from "../assest/QAPayment.png";
import visa from "../assest/VISA.png";
import mastercard from "../assest/Mastercard.png";
import qrPay from "../assest/QRPay.png";
import address from "../assest/address.png";
import iconchange from "../assest/icon-out-cart.png";

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  qty: number;
};

const Cart = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [method, setMethod] = useState("cod");
  const [isAddress, setIsAddress] = useState(false);

  useEffect(() => {
    const mockData: Product[] = [
      {
        id: 1,
        name: "Flutterbelle",
        desc: "Hair Clips",
        price: 85000,
        img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-05/doaremon_wdyw.jpg",
        qty: 1,
      },
      {
        id: 2,
        name: "Summer Box",
        desc: "Blind box",
        price: 150000,
        img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-05/doaremon_wdyw.jpg",
        qty: 1,
      },
      {
        id: 3,
        name: "Back To School Box",
        desc: "Blind box",
        price: 150000,
        img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-05/doaremon_wdyw.jpg",
        qty: 1,
      },
      {
        id: 4,
        name: "Back To School Box",
        desc: "Blind box",
        price: 150000,
        img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-05/doaremon_wdyw.jpg",
        qty: 1,
      },
    ];
    setProducts(mockData);
  }, []);

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = 10000;
  const total = subtotal + shipping;
  const formatVNDText = (value: number) => {
    return value.toLocaleString("vi-VN") + " vnd";
  };
  const increase = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
    );
  };

  const footerRef = useRef<HTMLDivElement>(null);
  const [shrinkPayment, setShrinkPayment] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShrinkPayment(true);
        } else {
          setShrinkPayment(false);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="cart-page">
      <div className="main-content-cart">
        <div className="info-product">
          <button
            onClick={() => Navigate("/")}
            className="shoping-continue-btn"
          >
            <img src={icon_out_cart} className="icon-out-cart" />
            Tiếp tục mua sắm
          </button>
          <div className="line-cart"></div>
          <h4 className="title-cart-info-product">Giỏ hàng</h4>
          <p>Bạn có {products.length} sản phẩm trong giỏ hàng</p>

          {products.map((p) => (
            <div className="product-container">
              <div className="left-container">
                <div className="border-img-product">
                  <img src="https://media.vov.vn/sites/default/files/styles/large/public/2021-05/doaremon_wdyw.jpg" />
                </div>

                <div className="product-info-left-container">
                  <h5>Flutterbelle</h5>
                  <p>Hair Clips</p>
                </div>
              </div>

              <div className="right-container">
                <div className="quantity-container-cart">
                  <span className="qty">{p.qty}</span>
                  <div className="quantity-control">
                    <button className="btn-qty" onClick={() => increase(p.id)}>
                      ▲
                    </button>
                    <button className="btn-qty" onClick={() => decrease(p.id)}>
                      ▼
                    </button>
                  </div>
                </div>
                <p className="price">
                  {(p.price * p.qty).toLocaleString("vi-VN")} vnd
                </p>
                <button className="bnt-delete-cart">
                  <img src={trast} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="info-payment">
          <img src={RightBackgrount} className="right-backgrount" />

          <div className={`payment-show ${shrinkPayment ? "shrink" : ""}`}>
            <h4>Thanh toán</h4>
            <p className="title-payment-info">
              Mọi giao dịch đều được bảo mật và mã hóa.
            </p>
            <div className="bnt-payment-container">
              <button
                className={`bnt-payment ${
                  method === "cod" ? "bnt-payment-active" : ""
                }`}
                onClick={() => setMethod("cod")}
              >
                <img className="img-payment-bnt" src={cod} />
              </button>
              <button
                className={`bnt-payment ${
                  method === "qr" ? "bnt-payment-active" : ""
                }`}
                onClick={() => setMethod("qr")}
              >
                <img className="img-payment-bnt" src={qr} />
              </button>
              <button
                className={`bnt-payment ${
                  method === "visa" ? "bnt-payment-active" : ""
                }`}
                onClick={() => setMethod("visa")}
              >
                <img src={visa} className="img-payment-bnt-visa" />{" "}
                <img className="img-payment-bnt-visa" src={mastercard} />
              </button>
            </div>

            <div className="content-payment-method">
              {method === "cod" && (
                <div className="cod-payment-method">
                  <div className="title-cod-pay">
                    <img src={address} className="img-address-cod" />
                    <h5 className="delivery-information">
                      Thông tin giao hàng
                    </h5>
                  </div>

                  <div className="info-cod-pay">
                    {isAddress ? (
                      <div className="border-info-cod-pay-address-edit">

                        <input className="input-address-cod-pay" type="text" placeholder="Trịnh Trọng Quyền"/>
                        <input className="input-address-cod-pay" type="text" placeholder="(+84) 123 456 789"/>
                        <input className="input-address-cod-pay" type="text" placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP. HCM"/>
                        <button className="bnt-apply-address" onClick={()=> setIsAddress(false)}>Xác nhận</button>
                      </div>
                    ) : (
                      <div className="border-info-cod-pay">
                        <div>
                          <p className="content-cod-pay">
                            Trịnh Trọng Quyền (+84) 123 456 789
                          </p>
                          <p className="address-cod-pay">
                            123 Đường ABC, Phường XYZ, Quận 1, TP. HCM
                          </p>
                        </div>
                        <button
                          className="bnt-change-address"
                          onClick={() => setIsAddress(true)}
                        >
                          <img src={iconchange} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {method === "visa" && (
                <div className="card-payment-method">
                  <p className="title-content-card">Tên trên thẻ</p>
                  <input
                    className="input-content"
                    type="text"
                    placeholder="Name"
                  />
                  <p className="title-content-card">Số thẻ</p>
                  <input
                    className="input-content"
                    type="text"
                    placeholder="1111 2222 3333 4444"
                  />
                  <div className="content-date-cvv-card">
                    <div>
                      <p className="title-content-card">Ngày hết hạn</p>
                      <input
                        className="input-content-date-cvv"
                        type="text"
                        placeholder="mm/yy"
                      />
                    </div>
                    <div className="cvv-card">
                      <p className="title-content-card">CVV</p>
                      <input
                        className="input-content-date-cvv"
                        type="text"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "qr" && (
                <div className="border-qr-one">
                  <p className="content-qr-pay">
                    Mở ứng dụng ngân hàng và quét mã QR.
                  </p>
                  <div className="border-qr-two">
                    <div className="border-qr-three">
                      <img src={qrPay} />
                    </div>
                  </div>
                  <p className="payment-amount-qr">
                    Số tiền thanh toán {formatVNDText(total)}
                  </p>
                </div>
              )}
            </div>

            <div className="line-payment-amount"></div>

            <div className="sub-payment-container">
              <div className="sub-payment">
                <p>Tạm tính</p>
                <p>{formatVNDText(subtotal)}</p>
              </div>
              <div className="sub-payment">
                <p>Phí giao hàng</p>
                <p>{formatVNDText(shipping)}</p>
              </div>
              <div className="sub-payment">
                <p>Tổng (Tax incl.)</p>
                <p>{formatVNDText(total)}</p>
              </div>
              <button className="bnt-checkout-payment">Thanh toán</button>
            </div>

            <div></div>
          </div>
        </div>
      </div>

      <div ref={footerRef} className="cart-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
