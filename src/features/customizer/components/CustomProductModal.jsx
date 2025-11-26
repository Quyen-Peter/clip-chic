import React from "react";

export default function CustomProductModal({ 
  customProducts = [],
  isVisible, 
  onClose, 
  onSelectCustomProduct,
  isLoading = false
}) {
  if (!isVisible) return null;

  const formatVnd = (value) => Number(value || 0).toLocaleString('vi-VN');

  const handleCustomProductSelect = (customProduct) => {
    onSelectCustomProduct(customProduct);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Tải sản phẩm tùy chỉnh</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            A-
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">
          Chọn sản phẩm đã lưu để tải
        </p>
        <div className="customizer-layout-popup-content">
          {isLoading ? (
            <div className="customizer-layout-popup-empty">
              <p>Đang tải sản phẩm tùy chỉnh...</p>
            </div>
          ) : customProducts && customProducts.length > 0 ? (
            customProducts.map((product) => {
              const previewImage = product.images && product.images.length > 0
                ? product.images[0].address
                : (product.previewImage || (product.image && product.image.address));
              
              const price = product.totalprice || product.price || 0;
              
              return (
                <div
                  key={product.id}
                  className="customizer-layout-popup-item"
                  onClick={() => handleCustomProductSelect(product)}
                  title={`Tải "${product.title}" - ${formatVnd(price)} VND`}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={product.title}
                      className="customizer-layout-popup-image"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K";
                      }}
                    />
                  ) : (
                    <div className="customizer-layout-popup-placeholder">
                      Không có ảnh
                    </div>
                  )}
                  <div className="customizer-layout-popup-info">
                    <p className="customizer-layout-popup-name">{product.title}</p>
                    <p className="customizer-layout-popup-price">{formatVnd(price)} VND</p>
                    <p className="customizer-layout-popup-description">{product.descript}</p>
                    <p className="customizer-layout-popup-date">
                      Ngày tạo: {new Date(product.createDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="customizer-layout-popup-empty">
              <p>Chưa có sản phẩm tùy chỉnh.</p>
              <p>Tạo và lưu để xem danh sách tại đây!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
