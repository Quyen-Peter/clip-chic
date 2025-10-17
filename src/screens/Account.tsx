// Account.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SidebarProfile from "../component/SidebarProfile";
import Header from "../component/Header";
import "../css/Account.css";
import background from "../assest/logologin.png";
import Footer from "../component/Footer";


const Account = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/Account") {
      navigate("/Account/Login", { replace: false });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div>
      <Header />
      <div className="main-container">
        {isLoggedIn ? (
          <div>
            <div className="SidebarProfile">
              <SidebarProfile />
            </div>
            <div className="account-content">
              <Outlet />
            </div>
            <div className="footer-account">
              <Footer/>
            </div>
          </div>
        ) : (
          <div className="account-login-container">
            <div className="logo-background">
               <img className="logo-clip-and-chic" src={background} />
            </div>
            <div className="form-login-logout">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
