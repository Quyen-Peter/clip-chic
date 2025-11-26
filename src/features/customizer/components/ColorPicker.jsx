// src/features/customizer/components/ColorPicker.jsx
import React from "react";

export default function ColorPicker({ baseModelColor, onColorChange, onShowMenu }) {
  const presetColors = [
    { color: "#ffffff", name: "Trắng" },
    { color: "#000000", name: "Đen" },
    { color: "#ff0000", name: "Đỏ" },
    { color: "#00ff00", name: "Xanh lá" },
    { color: "#0000ff", name: "Xanh dương" },
    { color: "#ffff00", name: "Vàng" }
  ];

  // Find the current color name
  const currentColorName = presetColors.find(preset => preset.color === baseModelColor)?.name || "Tùy chỉnh";

  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-product-card-content">
            <h5 className="customizer-layout-title">Màu sắc</h5>
            <div 
              className="customizer-layout-color-preview"
              style={{ backgroundColor: baseModelColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
