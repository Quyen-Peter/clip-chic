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
  orderDetailId: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  qty: number;
};

type OrderDetail = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  name: string;
  address: string;
  phone: string;
  createDate: string;
  shipPrice: number;
  payPrice: number;
  totalPrice: number;
  status: string;
  orderDetails: OrderDetail[];
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
  const [orderID, setOrderID] = useState<number>(0);
  const [orderName, setOrderName] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<string>("");
  const [orderPhone, setOrderPhone] = useState<string>("");
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [orderShip, setOrderShip] = useState<number>(0);
  const [orderPay, setOrderPay] = useState<number>(0);
  const [method, setMethod] = useState("cod");
  const [isAddress, setIsAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  const [shrinkPayment, setShrinkPayment] = useState(false);
  const [shipList, setShipList] = useState<Ship[]>([]);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [loadOrder, setLoadOrder] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [errorPay, setErrorPay] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupState, setPopupState] = useState<
    "confirm" | "loading" | "success" | "error" | null
  >(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = selectedShip ? selectedShip.price : 0;
  const total = subtotal + shipping;
  const formatVNDText = (value: number) => {
    return value.toLocaleString("vi-VN") + " vnd";
  };
  const increase = (orderDetailId: number, currentQty: number) => {
    const newQty = currentQty + 1;
    handleUpdateQuantity(orderDetailId, newQty);
  };

  const decrease = (orderDetailId: number, currentQty: number) => {
    const newQty = Math.max(1, currentQty - 1);
    handleUpdateQuantity(orderDetailId, newQty);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top > windowHeight) {
        setShrinkPayment(false);
      } else {
        setShrinkPayment(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetPendingOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userID");

      if (!token) {
        Navigate("/Account/Login");
        return;
      }
      if (!userId) {
        alert("Không tìm thấy thông tin người dùng!");
        return;
      }

      const url = `${API_URL}/api/Order/pending/${userId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
      const data = await res.json();

      setOrderID(data.id);
      // setOrderName(data.name);
      // setOrderAddress(data.address);
      // setOrderPhone(data.phone);
      setOrderShip(data.shipPrice);
      setOrderPay(data.payPrice);
      setOrderTotal(data.totalPrice);

      const mappedProducts: Product[] = data.orderDetails.map((d: any) => {
        const isProduct = d.product != null;
        const item = isProduct ? d.product : d.blindBox;

        return {
          orderDetailId: d.id,
          name: isProduct ? item.title : item.name,
          desc: item.descript || item.description || "(N/N)",
          price: item.price || d.price,
          qty: d.quantity,
          img:
            item.images?.[0]?.address ||
            "https://via.placeholder.com/150x150?text=No+Image",
        };
      });

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng pending:", error);
    }
  };

  const fetchUserInfo = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/Users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Không lấy được thông tin!");

      setUserInfo(data);

      setOrderName(data.name || "");
      setOrderPhone(data.phone || "");
      setOrderAddress(data.address || "");
    } catch (err) {
      console.error("Lỗi khi lấy thông tin người dùng:", err);
    }
  };

  useEffect(() => {
    handleShip();
    handleGetPendingOrder();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (method === "qr") {
      if (checkoutDisabled) {
        setLoading(false);
        setErrorPay("Vui lòng điền đầy đủ thông tin giao hàng!");
        return;
      }

      setLoading(true);
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
              t.transaction_content
                ?.toLowerCase()
                .includes("don hang " + orderID) &&
              parseFloat(t.amount_in) == total
          );

          if (transaction) {
            clearInterval(interval);
            handlePayment();
            setLoading(false);
          }
        } catch (err) {
          console.error("Lỗi khi kiểm tra thanh toán:", err);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [method, total]);

  const handleDeleteProduct = (orderDetailId: number) => {
    setDeleteTarget(orderDetailId);
    setPopupState("confirm");
    setPopupMessage("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userID");

    if (!token || !userId) {
      setPopupState("error");
      setPopupMessage("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
      return;
    }
    setPopupState("loading");
    setPopupMessage("Đang xóa sản phẩm...");

    try {
      const res = await fetch(
        `${API_URL}/api/Order/delete-detail/${userId}/${deleteTarget}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      setProducts((prev) =>
        prev.filter((p) => p.orderDetailId !== deleteTarget)
      );
      setPopupState("success");
      setPopupMessage("Đã xóa sản phẩm khỏi giỏ hàng thành công!");
    } catch (err) {
      setPopupState("error");
      setPopupMessage("Xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleUpdateQuantity = async (
    orderDetailId: number,
    newQuantity: number
  ) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại!");
      Navigate("/Account/Login");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/Order/update-quantity-detail/${orderDetailId}?quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      setProducts((prev) =>
        prev.map((p) =>
          p.orderDetailId === orderDetailId ? { ...p, qty: newQuantity } : p
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const updateOrderInfo = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại!");
      Navigate("/Account/Login");
      return;
    }
    try {
      setLoadUpdate(true);
      const res = await fetch(`${API_URL}/api/Order/update-order/${orderID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: orderName,
          phone: orderPhone,
          address: orderAddress,

          status: "pending",
          payMethod: null,
          totalPrice: 0,
          shipPrice: 0,
          payPrice: 0,
        }),
      });
      if (!res.ok) {
        setLoadUpdate(false);
        setErrorPay("Cập nhật thất bại, vui lòng thử lại!");
        throw new Error(`HTTP ${res.status}`);
      }
      if (res.ok) {
        const formData = new FormData();
        formData.append("name", orderName);
        formData.append("phone", orderPhone);
        formData.append("address", orderAddress);

        await fetch(`${API_URL}/api/Users/me`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        setErrorPay(null);
        setIsAddress(false);
        const data = await res.json();
        setLoadUpdate(false);
      }
    } catch (error) {
      console.error("❌ Lỗi Cập nhật thông tin giao hàng:", error);
    }
  };

  const handlePayment = async () => {
    if (checkoutDisabled) {
      setErrorPay("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại!");
      Navigate("/Account/Login");
      return;
    }
    try {
      setLoadOrder(true);
      const res = await fetch(`${API_URL}/api/Order/update-order/${orderID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: orderName,
          phone: orderPhone,
          address: orderAddress,

          status: "payment",
          payMethod: method,
          totalPrice: subtotal,
          shipPrice: selectedShip ? selectedShip.price : 0,
          payPrice: total,
        }),
      });
      if (!res.ok) {
        setErrorPay("Thanh toán thất bại, vui lòng thử lại!");
        throw new Error(`HTTP ${res.status}`);
      }

      if (res.ok) {
        const data = await res.json();
        setLoadOrder(false);
        Navigate(`/Account/OrderDetail/${orderID}`);
      }
    } catch (error) {
      console.error("❌ Lỗi thanh toán giao hàng:", error);
    }
  };

  const checkoutDisabled =
    products.length === 0 || !orderName || !orderAddress || !orderPhone;

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
                  <div className="product-container" key={p.orderDetailId}>
                    <div className="left-container">
                      <div className="border-img-product">
                        <img src={p.img} alt={p.name} />
                      </div>
                      <div className="product-info-left-container">
                        <h5>{p.name}</h5>
                        <p className="product-info-left-product-cart-desc">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                    <div className="right-container">
                      <div className="quantity-container-cart">
                        <span className="qty">{p.qty}</span>
                        <div className="quantity-control">
                          <button
                            className="btn-qty"
                            onClick={() => increase(p.orderDetailId, p.qty)}
                          >
                            ▲
                          </button>
                          <button
                            className="btn-qty"
                            onClick={() => decrease(p.orderDetailId, p.qty)}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                      <p className="price">
                        {(p.price * p.qty).toLocaleString("vi-VN")} vnd
                      </p>
                      <button
                        className="bnt-delete-cart"
                        onClick={() => handleDeleteProduct(p.orderDetailId)}
                      >
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
          <div className="payment-wrapper">
            <div className={`payment-show ${shrinkPayment ? "shrink" : ""}`}>
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
                {/* <button
                  className={`bnt-payment ${
                    method === "visa" ? "bnt-payment-active" : ""
                  }`}
                  onClick={() => setMethod("visa")}
                >
                  <img src={visa} className="img-payment-bnt-visa" />
                  <img className="img-payment-bnt-visa" src={mastercard} />
                </button> */}
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
                            placeholder={orderName || "Tên người nhận"}
                            onChange={(e) => setOrderName(e.target.value)}
                          />
                          <input
                            className="input-address-cod-pay"
                            type="text"
                            placeholder={
                              `(84+)` + orderPhone || "Số điện thoại"
                            }
                            onChange={(e) => setOrderPhone(e.target.value)}
                          />
                          <input
                            className="input-address-cod-pay"
                            type="text"
                            placeholder={orderAddress || "Địa chỉ nhận hàng"}
                            onChange={(e) => setOrderAddress(e.target.value)}
                          />
                          <button
                            className="bnt-apply-address"
                            onClick={() => updateOrderInfo()}
                          >
                            {" "}
                            {loadUpdate ? (
                              <ThreeDot
                                color="#ffffffff"
                                size="small"
                                text=""
                                textColor=""
                              />
                            ) : (
                              "Xác nhận"
                            )}{" "}
                          </button>
                        </div>
                      ) : (
                        <div className="border-info-cod-pay">
                          <div>
                            <p className="content-cod-pay">
                              {orderName} {" : 84+" + orderPhone}
                            </p>
                            <p className="address-cod-pay">
                              Địa chỉ:{orderAddress || "N/N"}
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
                          src={`https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&amount=${total}&des=${
                            "SEVQR thanh toan don hang " + orderID
                          }`}
                          alt="QR thanh toán"
                        />
                      </div>
                    </div>
                    <p className="payment-amount-qr">
                      Số tiền thanh toán {formatVNDText(total)}
                    </p>
                  </div>
                )}

                {/* {method === "visa" && (
                  <div className="border-visa-payment">
                    <p className="content-visa-pay">
                      Tính năng đang được phát triển. Vui lòng chọn phương thức
                      thanh toán khác.
                    </p>
                  </div>
                )} */}
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
                      errorPay
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
                      errorPay
                    )}{" "}
                  </button>
                )}{" "}
                {method === "cod" && (
                  <button
                    className="bnt-checkout-payment"
                    onClick={() => handlePayment()}
                  >
                    {loadOrder ? (
                      <ThreeDot
                        color="#ffffffff"
                        size="small"
                        text=""
                        textColor=""
                      />
                    ) : errorPay ? (
                      errorPay
                    ) : (
                      "Đặt hàng"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {popupState === "confirm" && (
              <>
                <h3>Xác nhận xóa</h3>
                <p>{popupMessage}</p>
                <div className="popup-buttons">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowPopup(false)}
                  >
                    Hủy
                  </button>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    Xác nhận
                  </button>
                </div>
              </>
            )}

            {popupState === "loading" && (
              <div className="popup-loading">
                <ThreeDot color="#FF6EA5" size="small" text="" textColor="" />
                <p>{popupMessage}</p>
              </div>
            )}

            {popupState === "success" && (
              <>
                <h3>Thành công</h3>
                <p>{popupMessage}</p>
                <button className="btn-ok" onClick={() => setShowPopup(false)}>
                  OK
                </button>
              </>
            )}

            {popupState === "error" && (
              <>
                <h3>Lỗi</h3>
                <p>{popupMessage}</p>
                <button className="btn-ok" onClick={() => setShowPopup(false)}>
                  Đóng
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div ref={footerRef} className="cart-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
