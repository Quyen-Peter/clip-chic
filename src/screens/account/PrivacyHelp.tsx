import "../../css/PrivacyHelp.css";

const PrivacyHelp = () => {
  return (
    <div className="privacy-help-container">
      <h2>Chính sách bảo mật & Trợ giúp</h2>

      <section>
        <h3>Chính sách bảo mật</h3>
        <p>
          Clip & Chic cam kết bảo vệ thông tin cá nhân của bạn. Mọi dữ liệu
          được thu thập chỉ nhằm mục đích cải thiện trải nghiệm người dùng và
          hỗ trợ dịch vụ.
        </p>
        <ul>
          <li>Chúng tôi không chia sẻ thông tin với bên thứ ba.</li>
          <li>Bạn có thể yêu cầu xóa tài khoản bất kỳ lúc nào.</li>
          <li>Dữ liệu được mã hóa và lưu trữ an toàn.</li>
        </ul>
      </section>

      <section>
        <h3>Trợ giúp</h3>
        <p>
          Nếu bạn gặp sự cố khi đặt hàng, thanh toán hoặc nhận hàng, hãy liên
          hệ với đội ngũ hỗ trợ của chúng tôi qua:
        </p>
        <ul>
          <li>Email: support@clipchic.vn</li>
          <li>Hotline: 1900-8686</li>
          <li>Giờ làm việc: 8h00 – 22h00 (T2–CN)</li>
        </ul>
      </section>
    </div>
  );
};


export default PrivacyHelp;