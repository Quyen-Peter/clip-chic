// src/features/customizer/components/ActionButtons.jsx
import React from "react";
import camera360 from "../../../assest/360.png";

export default function ActionButtons({ 
  isCameraLocked, 
  onToggleCameraLock, 
  onSaveAll
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
          onClick={onSaveAll}
          className="customizer-layout-bottom-button save-button"
          title="Save configuration & product"
        >
          💾🛍️ Save
        </button>
      </div>
    </div>
  );
}