// src/features/customizer/components/ColorModal.jsx
import React from "react";

export default function ColorModal({ 
  baseModelColor,
  onColorChange,
  isVisible, 
  onClose
}) {
  if (!isVisible) return null;

  const presetColors = [
    { color: "#ffffff", name: "Tr?ng" },
    { color: "#000000", name: "?en" },
    { color: "#ff0000", name: "??" },
    { color: "#00ff00", name: "Xanh l?" },
    { color: "#0000ff", name: "Xanh d??ng" },
    { color: "#ffff00", name: "V?ng" },
    { color: "#ff8c00", name: "Cam" },
    { color: "#800080", name: "T?m" },
    { color: "#ffc0cb", name: "H?ng" },
    { color: "#a52a2a", name: "N?u" },
    { color: "#808080", name: "X?m" },
    { color: "#c0c0c0", name: "B?c" }
  ];

  const handleColorSelect = (color) => {
    onColorChange(color);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Ch?n m?u</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">
          Ch?n m?u cho m?u k?p
        </p>
        <div className="customizer-layout-popup-content">
          {/* Custom Color Picker */}
          <div className="customizer-layout-color-custom">
            <label className="customizer-layout-color-label">M?u t?y ch?nh:</label>
            <div className="customizer-layout-color-picker">
              <input
                type="color"
                value={baseModelColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="customizer-layout-color-input"
                title="Ch?n m?u t?y ch?nh"
              />
              <span className="customizer-layout-color-value">{baseModelColor}</span>
            </div>
          </div>
          
          {/* Preset Colors */}
          <div className="customizer-layout-color-presets">
            <label className="customizer-layout-color-label">M?u c? s?n:</label>
            <div className="customizer-layout-preset-grid">
              {presetColors.map((preset) => (
                <div 
                  key={preset.color}
                  className={`customizer-layout-color-option ${
                    baseModelColor === preset.color ? "selected" : ""
                  }`}
                  onClick={() => handleColorSelect(preset.color)}
                >
                  <div 
                    className="customizer-layout-color-swatch"
                    style={{ backgroundColor: preset.color }}
                  ></div>
                  <span className="customizer-layout-color-name">{preset.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}