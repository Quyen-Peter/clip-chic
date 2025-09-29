// src/features/customizer/components/CharmModal.jsx
import React from "react";
import { charms } from "../mock/mockData";

export default function CharmModal({ 
  isVisible, 
  onClose, 
  onCharmDoubleClick 
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
          {charms.map((charm) => (
            <div
              key={charm.id}
              className="customizer-layout-popup-item"
              onDoubleClick={() => handleCharmDoubleClick(charm)}
              title="Double-click to add to model"
            >
              <img
                src={charm.previewImage}
                alt={charm.name}
                className="customizer-layout-popup-image"
              />
              <div className="customizer-layout-popup-info">
                <p className="customizer-layout-popup-name">{charm.name}</p>
                <p className="customizer-layout-popup-price">${charm.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}