// component/SidebarProfile.tsx
import { NavLink, useNavigate } from "react-router-dom";
import backgroundSidebar from "../assest/backgroundNavbar.png";
import icon from "../assest/IconRightDown.png";
import "../css/SidebarProfile.css";

const SidebarProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    navigate("/Account/Login");
  };

  return (
    <div className="sidebar-container">
      <img className="background-sidebar-profile" src={backgroundSidebar} />
      <div className="content-sidebar-container">
        <div className="sidebar-item">
          {/* <img src={icon} className="arrow-icon" /> */}
          <NavLink end to="/Account" className="link-sidebar-profile">
            <button className="link-sidebar-profile-bnt">Thông tin cá nhân</button>
          </NavLink>
        </div>
        <div className="sidebar-item">
          {/* <img src={icon} className="arrow-icon" /> */}
          <NavLink to="/Account/MyDesign" className="link-sidebar-profile">
            <button className="link-sidebar-profile-bnt">Thiết kế của tôi</button>
          </NavLink>
        </div>
        {/* <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink to="/Account/TrackShipping" className="link-sidebar-profile">
            Track Shipping
          </NavLink>
        </div> */}
        <div className="sidebar-item">
          {/* <img src={icon} className="arrow-icon" /> */}
          <NavLink to="/Account/OrderHistory" className="link-sidebar-profile">
            <button className="link-sidebar-profile-bnt">Lịch sử đặt hàng</button>
          </NavLink>
        </div>
        <div className="sidebar-item">
          {/* <img src={icon} className="arrow-icon" /> */}
          <NavLink to="/Account/Privacy" className="link-sidebar-profile">
            <button className="link-sidebar-profile-bnt">Bảo mật & Trợ giúp</button>
          </NavLink>
        </div>

        <div className="sidebar-item buttom-logout">
          <button className="logout" onClick={handleLogout}>
            <button className="link-sidebar-profile-bnt">Đăng xuất</button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
