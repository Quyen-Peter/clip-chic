import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ComingSoon.css";
import logo from "../assest/logoNoBack.png";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <img src={logo} alt="Logo" className="coming-soon-logo" />
      <h1>Trang này đang được phát triển</h1>
      <p>Chúng tôi đang hoàn thiện tính năng này. Hãy quay lại sau nhé</p>
      <button className="coming-soon-btn" onClick={() => navigate("/")}>
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default ComingSoon;
