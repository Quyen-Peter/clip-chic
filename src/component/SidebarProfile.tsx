// component/SidebarProfile.tsx
import { NavLink, useNavigate } from "react-router-dom";
import backgroundSidebar from "../assest/backgroundNavbar.png";
import icon from "../assest/IconRightDown.png";
import "../css/SidebarProfile.css";

const SidebarProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/Account/Login");
  };

  return (
    <div className="sidebar-container">
      <img className="background-sidebar-profile" src={backgroundSidebar} />
      <div className="content-sidebar-container">
        <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink end to="/Account" className="link-sidebar-profile">
            Account
          </NavLink>
        </div>
        <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink to="/Account/MyDesign" className="link-sidebar-profile">
            My Design
          </NavLink>
        </div>
        <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink to="/Account/TrackShipping" className="link-sidebar-profile">
            Track Shipping
          </NavLink>
        </div>
        <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink to="/Account/OrderHistory" className="link-sidebar-profile">
            Order History
          </NavLink>
        </div>
        <div className="sidebar-item">
          <img src={icon} className="arrow-icon" />
          <NavLink to="/Account/Privacy" className="link-sidebar-profile">
            Privacy & Help
          </NavLink>
        </div>

        <div className="sidebar-item buttom-logout">
          <button className="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
