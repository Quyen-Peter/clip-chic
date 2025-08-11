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
    <div className="container">
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt="Logo"
        className="logo"
      />
      <div className="link-content">
        <Link className="Link" to="/About">
          Abount us
        </Link>
        <Link className="Link" to="/Production">
          Our Productions
        </Link>
        <Link className="Link" to="/Customization">
          3DCustomization
        </Link>
        <Link className="Link" style={{ marginRight: "-40px" }} to="/Blindbox">
          Blindbox
        </Link>
      </div>

      <div className="icon-content">
        <div className="container-search">
          
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="text-search"
            />
          
        </div>
        <div>
          <img
            className="icon"
            onClick={() => setShowSearch(!showSearch)}
            src={Search}
            alt="Search"
          />
          <img className="icon" src={Cart} onClick={() => navigate('/Cart')} alt="Cart" />
          <img
            className="icon"
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
