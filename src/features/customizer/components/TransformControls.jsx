// src/features/customizer/components/TransformControls.jsx
import React, { useMemo } from "react";
import MoveIcon from "../../../assest/move-icon.png";
import RotateIcon from "../../../assest/rotate-icon.png";

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
    { mode: "translate", label: MoveIcon, title: "Move (Translate)" },
    { mode: "rotate", label: RotateIcon, title: "Rotate" },
  ];

  return (
    <div className="customizer-layout-info-panel">      
      {/* Transform Mode Buttons */}
      <div className="customizer-layout-control-group" tiletle="Transform Mode">
        <div className="customizer-layout-button-group">
          {transformModes.map((modeItem) => (
            <button
              key={modeItem.mode}
              onClick={() => onTransformModeChange(modeItem.mode)}
              className={`customizer-layout-bottom-button transform-button ${transformMode === modeItem.mode ? 'active' : ''}`}
              title={modeItem.title}
            >
              <img
                height={40} width={40}
                src={modeItem.label} alt={modeItem.mode} />
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
              title="Deselect charm"
              style={{ fontSize: '1.2rem' }}
            >
              ❌
            </button>
            <button
              onClick={() => onRemoveCharm(selectedCharm)}
              className="customizer-layout-button inactive"
              title="Remove selected charm"
              style={{ fontSize: '1.2rem' }}
            >
              🗑️
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
                💎{index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}