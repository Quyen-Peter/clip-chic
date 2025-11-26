import React from "react";

export default function BaseProductSelector({ selectedBase, onShowMenu, showMenu, isLoading = false }) {
  const previewImage = selectedBase?.previewImage || selectedBase?.image?.address;
  const baseName = selectedBase?.name || 'Chọn dáng kẹp';

  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
          style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          <div className="customizer-layout-product-card-content">
            <h5 className="customizer-layout-title">Dáng kẹp</h5>
            {previewImage ? (
              <img
                src={previewImage}
                alt={baseName}
                className="customizer-layout-product-image"
              />
            ) : (
              <div className="customizer-layout-placeholder">
                {isLoading ? 'Đang tải...' : 'Không có ảnh'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
