// src/features/customizer/components/BaseProductModal.jsx
import React from "react";

export default function BaseProductModal({ 
  bases, 
  selectedBase, 
  isVisible, 
  onClose, 
  onSelectBase 
}) {
  if (!isVisible) return null;

  const handleBaseSelect = (base) => {
    onSelectBase(base);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Select Base Product</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="customizer-layout-popup-content">
          {bases.map((base) => (
            <div
              key={base.id}
              className={`customizer-layout-popup-item ${
                selectedBase.id === base.id ? "selected" : ""
              }`}
              onClick={() => handleBaseSelect(base)}
            >
              <img
                src={base.previewImage}
                alt={base.name}
                className="customizer-layout-popup-image"
              />
              <div className="customizer-layout-popup-info">
                <p className="customizer-layout-popup-name">{base.name}</p>
                <p className="customizer-layout-popup-price">${base.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}