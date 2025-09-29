// src/features/customizer/components/TransformControls.jsx
import React, { useMemo } from "react";

export default function TransformControls({ 
  transformMode, 
  onTransformModeChange, 
  selectedCharm, 
  onDeselectCharm,
  onRemoveCharm,
  charmsList = [],
  onSelectCharm
}) {
  
  // Memoize the charms list to prevent unnecessary re-renders
  const stableCharmsList = useMemo(() => {
    return charmsList.map(charm => ({
      id: charm.id,
      // Only include properties needed for rendering, not position/rotation/scale
      modelPath: charm.modelPath
    }));
  }, [charmsList.length, charmsList.map(c => c.id).join(',')]);
  const transformModes = [
    { mode: "translate", label: "Move", title: "Move (Translate)" },
    { mode: "rotate", label: "Rotate", title: "Rotate" },
    { mode: "scale", label: "Scale", title: "Scale" }
  ];

  return (
    <div className="customizer-layout-info-panel">
      <h5 className="customizer-layout-info-title">Transform Controls</h5>
      
      {/* Transform Mode Buttons */}
      <div className="customizer-layout-control-group">
        <h6 className="customizer-layout-control-title">Transform Mode</h6>
        <div className="customizer-layout-button-group">
          {transformModes.map((modeItem) => (
            <button
              key={modeItem.mode}
              onClick={() => onTransformModeChange(modeItem.mode)}
              className={`customizer-layout-button ${transformMode === modeItem.mode ? 'active' : ''}`}
              title={modeItem.title}
            >
              {modeItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selection Info */}
      {selectedCharm && (
        <div className="customizer-layout-control-group">
          <p className="customizer-layout-info-text">Charm selected</p>
          <div className="customizer-layout-button-group">
            <button
              onClick={onDeselectCharm}
              className="customizer-layout-button"
            >
              Deselect
            </button>
            <button
              onClick={() => onRemoveCharm(selectedCharm)}
              className="customizer-layout-button inactive"
              title="Remove selected charm"
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      )}
      
      {/* Charms List for Selection */}
      {stableCharmsList.length > 0 && (
        <div className="customizer-layout-control-group">
          <h6 className="customizer-layout-control-title">Added Charms</h6>
          <p className="customizer-layout-instruction">Click to select charm</p>
          <div className="customizer-layout-button-group">
            {stableCharmsList.map((charm, index) => (
              <button
                key={`charm-btn-${charm.id}`}
                onClick={() => {
                  onSelectCharm(charm.id);
                }}
                className={`customizer-layout-button ${selectedCharm === charm.id ? 'active' : ''}`}
                title={`Select Charm ${index + 1}`}
              >
                💎 Charm {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      {!selectedCharm && stableCharmsList.length === 0 && (
        <div className="customizer-layout-control-group">
          <p className="customizer-layout-info-text">
            💡 Add charms first, then select them from the list above or click in 3D view
          </p>
        </div>
      )}
      
      {!selectedCharm && stableCharmsList.length > 0 && (
        <div className="customizer-layout-control-group">
          <p className="customizer-layout-info-text">
            💡 Select a charm from the list above or click on it in the 3D view
          </p>
        </div>
      )}
    </div>
  );
}