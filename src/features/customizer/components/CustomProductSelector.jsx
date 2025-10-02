// src/features/customizer/components/CustomProductSelector.jsx
import React from "react";

export default function CustomProductSelector({ onShowMenu }) {
  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-product-card-content">
            <h5 className="customizer-layout-title">Customs</h5>

            <div className="customizer-layout-load-icon">
              📁
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}