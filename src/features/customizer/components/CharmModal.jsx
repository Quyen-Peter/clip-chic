import React from "react";

export default function CharmModal({ 
  isVisible, 
  onClose, 
  onCharmDoubleClick,
  charms = [],
  isLoading = false
}) {
  if (!isVisible) return null;

  const handleCharmDoubleClick = (charm) => {
    onCharmDoubleClick(charm);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Select Charm</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">Double-click to add to model</p>
        <div className="customizer-layout-popup-content">
          {isLoading ? (
            <div className="customizer-layout-popup-empty">
              <p>Loading charms...</p>
            </div>
          ) : charms && charms.length > 0 ? (
            charms.map((charm) => (
              <div
                key={charm.id}
                className="customizer-layout-popup-item"
                onDoubleClick={() => handleCharmDoubleClick(charm)}
                title="Double-click to add to model"
              >
                <img
                  src={charm.previewImage || charm.image?.address}
                  alt={charm.name}
                  className="customizer-layout-popup-image"
                />
                <div className="customizer-layout-popup-info">
                  <p className="customizer-layout-popup-name">{charm.name}</p>
                  <p className="customizer-layout-popup-price">${charm.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="customizer-layout-popup-empty">
              <p>No charms available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}