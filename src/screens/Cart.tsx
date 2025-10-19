import "../css/Cart.css";
import Footer from "../component/Footer";
import RightBackgrount from "../assest/RightBackgrount.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon_out_cart from "../assest/icon-out-cart.png";
import trast from "../assest/trast-cart.png";
import cod from "../assest/COD.png";
import qr from "../assest/QAPayment.png";
import visa from "../assest/VISA.png";
import mastercard from "../assest/Mastercard.png";
import address from "../assest/address.png";
import iconchange from "../assest/icon-out-cart.png";
import { ThreeDot } from "react-loading-indicators";
const API_URL = process.env.REACT_APP_HOST_API;

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  qty: number;
};

type Ship = {
  id: number;
  name: string;
  price: number;
};

const Cart = () => {
  const acc = "108885490245";
  const bank = "VietinBank";

  const Navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [method, setMethod] = useState("cod");
  const [isAddress, setIsAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  const [shrinkPayment, setShrinkPayment] = useState(false);
  const [shipList, setShipList] = useState<Ship[]>([]);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = selectedShip ? selectedShip.price : 0;
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

  const handleShip = async () => {
    try {
      const res = await fetch(`${API_URL}/Ship/GetAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Không thể tải danh sách ship");

      const data = await res.json();
      setShipList(data);
      if (data.length > 0) setSelectedShip(data[0]);
    } catch (error) {
      console.error("Lỗi khi tải danh sách ship:", error);
    }
  };

  // Theo dõi footer hiển thị
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setShrinkPayment(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const handleOrrder = async () =>{

  }


  useEffect(() => {
    handleShip();
  }, []);

  useEffect(() => {
    if (method === "qr") {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(
            `https://localhost:7169/api/Payment/check?account=${acc}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();

          const transactions = Array.isArray(data.transactions)
            ? data.transactions
            : data.data?.transactions || [];

          const transaction = transactions.find(
            (t: any) =>
              t.transaction_content?.toLowerCase().includes("don hang 9") &&
              parseFloat(t.amount_in) >= 3000
          );

          if (transaction) {
            clearInterval(interval);
            alert("Thanh toán thành công!");
            setLoading(false);
          }
        } catch (err) {
          console.error("Lỗi khi kiểm tra thanh toán:", err);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [method, total]);

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
          <div>
            {products.length ? (
              <div>
                {products.map((p) => (
                  <div className="product-container" key={p.id}>
                    <div className="left-container">
                      <div className="border-img-product">
                        <img src={p.img} alt={p.name} />
                      </div>
                      <div className="product-info-left-container">
                        <h5>{p.name}</h5>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                    <div className="right-container">
                      <div className="quantity-container-cart">
                        <span className="qty">{p.qty}</span>
                        <div className="quantity-control">
                          <button
                            className="btn-qty"
                            onClick={() => increase(p.id)}
                          >
                            ▲
                          </button>
                          <button
                            className="btn-qty"
                            onClick={() => decrease(p.id)}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                      <p className="price">
                        {(p.price * p.qty).toLocaleString("vi-VN")} vnd
                      </p>
                      <button className="bnt-delete-cart">
                        <img src={trast} alt="delete" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <button
                onClick={() => Navigate("/")}
                className="shoping-continue-btn null-cart"
              >
                Bạn chưa có sản phẩm nào trong giỏ hàng. Tiếp tục mua sắm tại
                đây!
              </button>
            )}
          </div>
        </div>

        {/* === Phần thanh toán bên phải === */}
        <div className={`info-payment ${shrinkPayment ? "shrink" : ""}`}>
          {/* <img
            src={RightBackgrount}
            className={`right-backgrount ${shrinkPayment ? "shrink-bg" : ""}`}
          /> */}

          <div className={`payment-show`}>
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
                <img src={visa} className="img-payment-bnt-visa" />
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
                        <input
                          className="input-address-cod-pay"
                          type="text"
                          placeholder="Trịnh Trọng Quyền"
                        />
                        <input
                          className="input-address-cod-pay"
                          type="text"
                          placeholder="(+84) 123 456 789"
                        />
                        <input
                          className="input-address-cod-pay"
                          type="text"
                          placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP. HCM"
                        />
                        <button
                          className="bnt-apply-address"
                          onClick={() => setIsAddress(false)}
                        >
                          Xác nhận
                        </button>
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

              {method === "qr" && (
                <div className="border-qr-one">
                  <p className="content-qr-pay">
                    Mở ứng dụng ngân hàng và quét mã QR.
                  </p>
                  <div className="border-qr-two">
                    <div className="border-qr-three">
                      <img
                        src={`https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&amount=${3000}&des=${"SEVQR thanh toan don hang 9"}`}
                        alt="QR thanh toán"
                      />
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
                <p>Phương thức giao hàng</p>
              </div>
              <div className="ship-options">
                {shipList.length > 0 ? (
                  shipList.map((ship) => (
                    <label key={ship.id} className="ship-option">
                      <input
                        type="radio"
                        name="ship"
                        checked={selectedShip?.id === ship.id}
                        onChange={() => setSelectedShip(ship)}
                      />
                      {ship.name} – {ship.price.toLocaleString("vi-VN")}₫
                    </label>
                  ))
                ) : (
                  <p>Đang tải phương thức giao hàng...</p>
                )}
              </div>
              <div className="sub-payment">
                <p>Tổng (Tax incl.)</p>
                <p>{formatVNDText(total)}</p>
              </div>
              {method === "qr" && (
                <button className="bnt-checkout-payment">
                  {" "}
                  {loading ? (
                    <ThreeDot
                      color="#ffffffff"
                      size="small"
                      text=""
                      textColor=""
                    />
                  ) : (
                    "Đặt hàng"
                  )}{" "}
                </button>
              )}{" "}
              {method === "visa" && (
                <button className="bnt-checkout-payment">
                  {" "}
                  {loading ? (
                    <ThreeDot
                      color="#ffffffff"
                      size="small"
                      text=""
                      textColor=""
                    />
                  ) : (
                    "Đặt hàng"
                  )}{" "}
                </button>
              )}{" "}
              {method === "cod" && (
                <button className="bnt-checkout-payment">Đặt hàng</button>
              )}
            </div>
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
