import "../../css/OrderHistory.css";

const OrderHistory = () => {
  return (
    <div className="history-container">
      <div className="table-order">
        <h3 className="order-history-content">ORDER HISTORY</h3>
        <div className="order-history">
          <table className="table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href={`/Account/OrderDtail/${1}`}>#96459761</a>
                </td>
                <td className="status in-progress">IN PROGRESS</td>
                <td>Dec 30, 2019 07:52</td>
                <td>405.000 vnd (5 Products)</td>
                <td>
                  <a href={`/Account/OrderDtail/${1}`} className="view-details">
                    View Details →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={`/Account/OrderDtail/${1}`}>#71667167</a>
                </td>
                <td className="status completed">COMPLETED</td>
                <td>Dec 7, 2019 23:26</td>
                <td>350.000 vnd (4 Products)</td>
                <td>
                  <a href={`/Account/OrderDtail/${1}`} className="view-details">
                    View Details →
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={`/Account/OrderDtail/${1}`}>#95214362</a>
                </td>
                <td className="status canceled">CANCELED</td>
                <td>Dec 7, 2019 23:26</td>
                <td>165.000 vnd (2 Products)</td>
                <td>
                  <a href={`/Account/OrderDtail/${1}`} className="view-details">
                    View Details →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
