import { Link, useNavigate } from "react-router-dom";
import Logo from "../assest/Logo.png";
import User from "../assest/user.png";
import Search from "../assest/search.png";
import Cart from "../assest/shoppingCart.png";
import { useState } from "react";
import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="header-container">
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt="Logo"
        className="header-logo"
      />
      <div className="header-link-content">
        <Link className="header-link" to="/About">
          Về chúng tôi
        </Link>
        <Link className="header-link" to="/Production">
          Sản phẩm
        </Link>
        <Link className="header-link" to="/Customizer">
          3D thiết kế
        </Link>
        <Link className="header-link" style={{ marginRight: "-40px" }} to="/Blindbox">
          Hộp bất ngờ
        </Link>
      </div>

      <div className="header-icon-content">
        {/* <div className="header-container-search">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="header-text-search"
          />
        </div> */}
        <div>
          {/* <img
            className="header-icon"
            onClick={() => setShowSearch(!showSearch)}
            src={Search}
            alt="Search"
          /> */}
          <img className="header-icon" src={Cart} onClick={() => navigate('/Cart')} alt="Cart" />
          <img
            className="header-icon"
            onClick={() => navigate("/Account")}
            src={User}
            alt="User"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
