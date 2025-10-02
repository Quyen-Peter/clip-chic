// src/features/customizer/components/ActionButtons.jsx
import React from "react";
import camera360 from "../../../assest/360.png";

export default function ActionButtons({ 
  isCameraLocked, 
  onToggleCameraLock, 
  onSaveConfig, 
  onSaveProduct 
}) {
  return (
    <div className="customizer-layout-bottom-row">
      <div className="customizer-layout-bottom-controls">
        <button
          onClick={onToggleCameraLock}
          className={`customizer-layout-bottom-button ${isCameraLocked ? 'camera-locked' : 'camera-unlocked'}`}
        >
          <img 
            src={camera360}
            alt="Camera Toggle" 
            className="camera-toggle-icon"
          />
        </button>
        
        <button
          onClick={onSaveConfig}
          className="customizer-layout-bottom-button save-button"
          title="Save Customization Configuration"
        >
          💾 Save Config
        </button>
        
        <button
          onClick={onSaveProduct}
          className="customizer-layout-bottom-button product-button"
          title="Save as Product to Database"
        >
          🛍️ Save Product
        </button>
      </div>
    </div>
  );
}