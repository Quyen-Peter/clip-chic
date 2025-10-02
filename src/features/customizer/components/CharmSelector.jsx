// src/features/customizer/components/CharmSelector.jsx
import React from "react";
import { charms } from "../mock/mockData";

export default function CharmSelector({ onShowMenu, showMenu }) {
  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
        >
          <div className="customizer-layout-charm-item">
            <h5 className="customizer-layout-title">Charms</h5>
            <img
              src={charms[0].previewImage}
              alt={charms[0].name}
              className="customizer-layout-accessory"
            />
          </div>
        </div>
      </div>
    </div>
  );
}