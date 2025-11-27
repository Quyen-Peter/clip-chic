import React, { useMemo, useState } from "react";

export default function BaseProductModal({ 
  bases = [], 
  selectedBase, 
  isVisible, 
  onClose, 
  onSelectBase,
  isLoading = false
}) {
  const [search, setSearch] = useState("");
  const formatVnd = (value) => Number(value || 0).toLocaleString('vi-VN');

  const filteredBases = useMemo(() => {
    if (!search.trim()) return bases;
    const term = search.toLowerCase();
    return bases.filter((b) => (b.name || "").toLowerCase().includes(term));
  }, [bases, search]);

  if (!isVisible) return null;

  const handleBaseSelect = (base) => {
    onSelectBase(base);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Chọn mẫu kẹp</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            A-
          </button>
        </div>

        <div className="customizer-layout-popup-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm dáng kẹp..."
            className="customizer-layout-search-input"
          />
        </div>

        <div className="customizer-layout-popup-content">
          {isLoading ? (
            <div className="customizer-layout-popup-empty">
              <p>Đang tải danh sách mẫu kẹp...</p>
            </div>
          ) : filteredBases && filteredBases.length > 0 ? (
            filteredBases.map((base) => {
              const previewImage = base.previewImage || (base.image && base.image.address);
              return (
                <div
                  key={base.id}
                  className={`customizer-layout-popup-item ${
                    selectedBase && selectedBase.id === base.id ? "selected" : ""
                  }`}
                  onClick={() => handleBaseSelect(base)}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={base.name}
                      className="customizer-layout-popup-image"
                    />
                  ) : (
                    <div className="customizer-layout-popup-placeholder">
                      Không có ảnh
                    </div>
                  )}
                  <div className="customizer-layout-popup-info">
                    <p className="customizer-layout-popup-name">{base.name}</p>
                    <p className="customizer-layout-popup-price">{formatVnd(base.price)} VND</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="customizer-layout-popup-empty">
              <p>Không có mẫu kẹp nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
