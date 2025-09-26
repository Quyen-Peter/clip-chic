// src/features/customizer/components/BaseProductSelector.jsx
import React from "react";

export default function BaseProductSelector({ selectedBase, onShowMenu, showMenu }) {
  return (
    <div>
      <h5 className="customizer-layout-title">Shape</h5>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-product-card-content">
            <img
              src={selectedBase.previewImage}
              alt={selectedBase.name}
              className="customizer-layout-product-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}