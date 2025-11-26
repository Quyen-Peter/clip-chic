import React from "react";

export default function CustomProductSelector({ 
  onShowMenu, 
  customProducts = [], 
  isLoading = false 
}) {
  const hasCustomProducts = customProducts && customProducts.length > 0;
  const firstProduct = hasCustomProducts ? customProducts[0] : null;
  const previewImage = firstProduct?.previewImage || (firstProduct?.image && firstProduct?.image.address);

  return (
    <div>
      <div className="customizer-layout-selection-container">
        <div
          className="customizer-layout-selection-trigger"
          onClick={onShowMenu}
          style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          <div className="customizer-layout-product-card-content">
            <h5 className="customizer-layout-title">Sản phẩm đã lưu</h5>

            {hasCustomProducts && previewImage ? (
              <img
                src={previewImage}
                alt="Sản phẩm tùy chỉnh"
                className="customizer-layout-product-image"
                style={{ maxHeight: '60px', objectFit: 'cover' }}
              />
            ) : (
              <div className="customizer-layout-load-icon">
                {isLoading ? '⏳' : '📁'}
              </div>
            )}
            {hasCustomProducts && (
              <p style={{ fontSize: '0.8em', marginTop: '5px', color: '#666' }}>
                {customProducts.length} sản phẩm
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
