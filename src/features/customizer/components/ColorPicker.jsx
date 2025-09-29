// src/features/customizer/components/ColorPicker.jsx
import React from "react";

export default function ColorPicker({ baseModelColor, onColorChange, onShowMenu }) {
  const presetColors = [
    { color: "#ffffff", name: "White" },
    { color: "#000000", name: "Black" },
    { color: "#ff0000", name: "Red" },
    { color: "#00ff00", name: "Green" },
    { color: "#0000ff", name: "Blue" },
    { color: "#ffff00", name: "Yellow" }
  ];

  // Find the current color name
  const currentColorName = presetColors.find(preset => preset.color === baseModelColor)?.name || "Custom";

  return (
    <div>
      <h5 className="customizer-layout-title">Color</h5>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-product-card-content">
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