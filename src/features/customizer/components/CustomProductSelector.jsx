// src/features/customizer/components/CustomProductSelector.jsx
import React from "react";

export default function CustomProductSelector({ onShowMenu }) {
  return (
    <div>
      <h5 className="customizer-layout-title">Load Custom Products</h5>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-product-card-content">
            <div className="customizer-layout-load-icon">
              📁
            </div>
            <p className="customizer-layout-product-name">Load Saved Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}