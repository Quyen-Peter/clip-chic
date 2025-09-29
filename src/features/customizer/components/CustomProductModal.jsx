// src/features/customizer/components/CustomProductModal.jsx
import React from "react";

export default function CustomProductModal({ 
  customProducts,
  isVisible, 
  onClose, 
  onSelectCustomProduct 
}) {
  if (!isVisible) return null;

  const handleCustomProductSelect = (customProduct) => {
    onSelectCustomProduct(customProduct);
    onClose();
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-popup-menu" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Load Custom Product</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p className="customizer-layout-popup-instruction">
          Select a saved custom product to load
        </p>
        <div className="customizer-layout-popup-content">
          {customProducts.map((product) => (
            <div
              key={product.id}
              className="customizer-layout-popup-item"
              onClick={() => handleCustomProductSelect(product)}
              title={`Load "${product.title}" - $${product.price}`}
            >
              <img
                src={product.previewImage}
                alt={product.title}
                className="customizer-layout-popup-image"
                onError={(e) => {
                  // Fallback to a default image or icon if preview image fails to load
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K";
                }}
              />
              <div className="customizer-layout-popup-info">
                <p className="customizer-layout-popup-name">{product.title}</p>
                <p className="customizer-layout-popup-price">${product.price}</p>
                <p className="customizer-layout-popup-description">{product.descript}</p>
                <p className="customizer-layout-popup-date">
                  Created: {new Date(product.createDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {customProducts.length === 0 && (
            <div className="customizer-layout-popup-empty">
              <p>No saved custom products found.</p>
              <p>Create and save a custom product to see it here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}