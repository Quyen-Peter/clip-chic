import React from "react";

export default function CharmModal({ 
  isVisible, 
  onClose, 
  onCharmDoubleClick,
  charms = [],
  isLoading = false
}) {
  if (!isVisible) return null;

  const formatVnd = (value) => Number(value || 0).toLocaleString('vi-VN');

  const handleCharmDoubleClick = (charm) => {
    onCharmDoubleClick(charm);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Chọn phụ kiện</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            A-
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">Nhấp đúp để thêm vào mô hình</p>
        <div className="customizer-layout-popup-content">
          {isLoading ? (
            <div className="customizer-layout-popup-empty">
              <p>Đang tải phụ kiện...</p>
            </div>
          ) : charms && charms.length > 0 ? (
            charms.map((charm) => (
              <div
                key={charm.id}
                className="customizer-layout-popup-item"
                onDoubleClick={() => handleCharmDoubleClick(charm)}
                title="Nhấp đúp để thêm vào mô hình"
              >
                <img
                  src={charm.previewImage || charm.image?.address}
                  alt={charm.name}
                  className="customizer-layout-popup-image"
                />
                <div className="customizer-layout-popup-info">
                  <p className="customizer-layout-popup-name">{charm.name}</p>
                  <p className="customizer-layout-popup-price">{formatVnd(charm.price)} VND</p>
                </div>
              </div>
            ))
          ) : (
            <div className="customizer-layout-popup-empty">
              <p>Không có phụ kiện nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
