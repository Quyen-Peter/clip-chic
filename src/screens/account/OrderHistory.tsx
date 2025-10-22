import { useEffect, useState } from "react";
import "../../css/OrderHistory.css";
import { fetchUserOrders, Order } from "../../services/orderService";
import { getOrderStatus } from "../../utils/orderStatus";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = Number(sessionStorage.getItem("userID"));
    if (!token || !userId) {
      alert("Vui lòng đăng nhập lại!");
      return;
    }

    fetchUserOrders(userId, token)
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.error("❌ Lỗi khi lấy đơn hàng:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="history-container">
      <div className="table-order">
        <h3 className="order-history-content">Lịch sử đặt hàng</h3>
        <div className="order-history">
          <table className="table">
            <thead>
              <tr>
                <th>MÃ đơn hàng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt hàng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>
                    <a href={`/Account/OrderDetail/${order.id}`}>#{order.id}</a>
                  </td>
                  {(() => {
                    const { text, className } = getOrderStatus(order.status);
                    return <td className={className}>{text}</td>;
                  })()}

                  <td>{new Date(order.createDate).toLocaleString("vi-VN")}</td>
                  <td>
                    {order.totalPrice?.toLocaleString("vi-VN") || 0}VND (
                    {order.orderDetails?.length || 0} sản phẩm)
                  </td>
                  <td>
                    <a
                      href={`/Account/OrderDetail/${order.id}`}
                      className="view-details"
                    >
                      Chi tiết →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
