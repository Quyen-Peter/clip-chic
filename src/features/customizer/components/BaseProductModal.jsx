import React from "react";

export default function BaseProductModal({ 
  bases = [], 
  selectedBase, 
  isVisible, 
  onClose, 
  onSelectBase,
  isLoading = false
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
          {isLoading ? (
            <div className="customizer-layout-popup-empty">
              <p>Loading bases...</p>
            </div>
          ) : bases && bases.length > 0 ? (
            bases.map((base) => {
              const previewImage = base.previewImage || (base.image && base.image.address);
              return (
                <div
                  key={base.id}
                  className={`customizer-layout-popup-item ${
                    selectedBase && selectedBase.id === base.id ? "selected" : ""
                  }`}
                  onClick={() => handleBaseSelect(base)}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={base.name}
                      className="customizer-layout-popup-image"
                    />
                  ) : (
                    <div className="customizer-layout-popup-placeholder">
                      No image
                    </div>
                  )}
                  <div className="customizer-layout-popup-info">
                    <p className="customizer-layout-popup-name">{base.name}</p>
                    <p className="customizer-layout-popup-price">${base.price}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="customizer-layout-popup-empty">
              <p>No bases available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}