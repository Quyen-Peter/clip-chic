// Account.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SidebarProfile from "../component/SidebarProfile";
import Header from "../component/Header";
import "../css/Account.css";
import background from "../assest/logologin.png";


const Account = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
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
          <>
            <div className="SidebarProfile">
              <SidebarProfile />
            </div>
            <div className="account-content">
              <Outlet />
            </div>
          </>
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
