import { useNavigate, useParams } from "react-router-dom";
import "../../css/OrderDetail.css";
import { useEffect, useState } from "react";
import OrderSteps from "../../component/OrderSteps";
import {
  fetchOrderDetail,
  type OrderDetail as OrderDetailType,
} from "../../services/orderService";
import { getOrderStatus } from "../../utils/orderStatus";
import { cancelOrder } from "../../services/orderService";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);


 const handleCancelOrder = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("Vui lòng đăng nhập lại!");
    navigate("/Account/Login");
    return;
  }

  if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này không?")) return;

  try {
    await cancelOrder(order.id, token);
    alert("Đơn hàng đã được hủy thành công!");
    window.location.reload();
  } catch (err) {
    console.error("❌ Lỗi khi hủy đơn hàng:", err);
    alert("Hủy đơn hàng thất bại!");
  }
};
   
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại!");
      navigate("/Account/Login");
      return;
    }

    fetchOrderDetail(Number(orderId), token)
      .then((data) => setOrder(data))
      .catch((err) => console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", err))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p>Đang tải chi tiết đơn hàng...</p>;
  if (!order) return <p>Không tìm thấy đơn hàng.</p>;

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <div>
          <h3 className="order-id">Mã đơn hàng: #{order.id}</h3>
          {(() => {
            const { text } = getOrderStatus(order.status);
            return (
              <p className="thank-confirmed">
                Cảm ơn bạn. Đơn hàng của bạn {text}!
              </p>
            );
          })()}
        </div>

        {order.status === "payment" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "90px",
            }}
          >
            <button className="bnt-canllel" onClick={handleCancelOrder}>Hủy</button>
            <p style={{ color: "#173da2" }}>Bạn có thể hủy đơn trước khi </p>
            <p style={{ color: "#173da2", marginTop: "-20px" }}>
              nhận viên xác nhân đơn.
            </p>
          </div>
        )}
      </div>

      <div>
        <OrderSteps status={order?.status} />
      </div>

      <div className="order-detail-content">
        <h3 className="product-list">Sản phẩm</h3>
        <div className="product-items">
          {order?.orderDetails.map((detail: OrderDetailType) => {
            const item = detail.product || detail.blindBox;

            let name = "Sản phẩm không xác định";
            let desc = "";
            if (item) {
              if ("title" in item) {
                name = item.title;
                desc = item.descript || "";
              } else if ("name" in item) {
                name = item.name;
                desc = item.description || "";
              }
            }

            const img =
              item?.images && item.images.length > 0
                ? item.images[0].address
                : "https://via.placeholder.com/100";

            return (
              <div className="product-item" key={detail.id}>
                <img src={img} alt={name} className="product-image" />
                <div className="product-info">
                  <div className="product-name-title">
                    <h4 className="product-title">{name}</h4>
                    <p className="product-name">{desc}</p>
                  </div>
                  <p className="product-quantity">
                    Số lượng: {detail.quantity}
                  </p>
                  <p className="product-price">
                    {detail.price.toLocaleString("vi-VN")} vnd
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shipping-address">
        <h3 className="shipping-address-title">Thông tin giao hàng</h3>
        <div className="address-info-border">
          <div className="name-phone">
            <p>Tên:</p>
            <p className="content-name-info">{order.name} |</p>
            <p> (+84) {order.phone}</p>
          </div>
          <div className="address-detail">
            <p>Địa chỉ: </p>
            <p className="content-address-info">{order.address}</p>
          </div>
        </div>
      </div>

      <div className="payment-method-container">
        <h3 className="payment-method">Thanh toán</h3>
        <div className="total-info-border">
          <div className="subtotal">
            <p>Tạm tính:</p>
            <p>{order.totalPrice.toLocaleString("vi-VN")} vnd</p>
          </div>
          <div className="shipping-charge">
            <p>Phí vận chuyển:</p>
            <p>{order.shipPrice.toLocaleString("vi-VN")} vnd</p>
          </div>
          <div className="shipping-charge">
            <p>Hình thức thanh toán:</p>
            <p>
              {order.payMethod === "cod"
                ? "Thanh toán khi nhận hàng"
                : "Thanh toán chuyển khoản"}
            </p>
          </div>
          <div className="line-order-detail-payment"></div>
          <div className="total">
            <p>Tổng thanh toán</p>
            <p>{order.payPrice.toLocaleString("vi-VN")} vnd</p>
          </div>
          <div className="total">
            <p>Trạng thái thanh toán</p>
            <p>
              {["refunded"].includes(order.status)
                ? "Đã hoàn tiền"
                : ["returned"].includes(order.status)
                ? "Đã trả hàng"
                : ["failed"].includes(order.status)
                ? "Thanh toán thất bại"
                : order.payMethod === "qr" &&
                  ["returned"].includes(order.status)
                ? "Đã trả hàng - đang chờ hoàn tiền"
                : ["cancelled"].includes(order.status)
                ? "Đã hủy"
                : order.payMethod === "cod" &&
                  ["payment", "processing", "shipping"].includes(order.status)
                ? "Chưa thanh toán"
                : "Đã thanh toán"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
