import React from "react";

export default function CharmSelector({ onShowMenu, showMenu, charms = [], isLoading = false }) {
  const firstCharm = charms && charms.length > 0 ? charms[0] : null;

  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
          style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          <div className="customizer-layout-charm-item">
            <h5 className="customizer-layout-title">Charms</h5>
            {firstCharm ? (
              <img
                src={firstCharm.previewImage || firstCharm.image?.address}
                alt={firstCharm.name}
                className="customizer-layout-accessory"
              />
            ) : (
              <div className="customizer-layout-placeholder">
                {isLoading ? 'Loading...' : 'No charms'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}