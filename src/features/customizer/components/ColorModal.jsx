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
    { color: "#ffffff", name: "White" },
    { color: "#000000", name: "Black" },
    { color: "#ff0000", name: "Red" },
    { color: "#00ff00", name: "Green" },
    { color: "#0000ff", name: "Blue" },
    { color: "#ffff00", name: "Yellow" },
    { color: "#ff8c00", name: "Orange" },
    { color: "#800080", name: "Purple" },
    { color: "#ffc0cb", name: "Pink" },
    { color: "#a52a2a", name: "Brown" },
    { color: "#808080", name: "Gray" },
    { color: "#c0c0c0", name: "Silver" }
  ];

  const handleColorSelect = (color) => {
    onColorChange(color);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Select Color</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">
          Choose a color for your base product
        </p>
        <div className="customizer-layout-popup-content">
          {/* Custom Color Picker */}
          <div className="customizer-layout-color-custom">
            <label className="customizer-layout-color-label">Custom Color:</label>
            <div className="customizer-layout-color-picker">
              <input
                type="color"
                value={baseModelColor}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="customizer-layout-color-input"
                title="Choose custom color"
              />
              <span className="customizer-layout-color-value">{baseModelColor}</span>
            </div>
          </div>
          
          {/* Preset Colors */}
          <div className="customizer-layout-color-presets">
            <label className="customizer-layout-color-label">Preset Colors:</label>
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