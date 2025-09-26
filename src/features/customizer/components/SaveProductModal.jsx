// src/features/customizer/components/SaveProductModal.jsx
import React from "react";
import { charms } from "../mock/mockData";

export default function SaveProductModal({ 
  isVisible, 
  onClose, 
  selectedBase,
  modelViewerRef,
  productTitle,
  setProductTitle,
  productDescription,
  setProductDescription,
  productStatus,
  setProductStatus,
  onSaveProduct
}) {
  if (!isVisible) return null;

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(selectedBase.price) || 0;
    const currentCharms = modelViewerRef.current?.getCharms?.() || [];
    const charmsPrice = currentCharms.reduce((total, charm) => {
      const charmData = charms.find(c => c.modelPath === charm.modelPath);
      return total + (charmData ? parseFloat(charmData.price) : 0);
    }, 0);
    return basePrice + charmsPrice;
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-save-modal" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Save Custom Product</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="customizer-layout-save-form">
          <div className="customizer-layout-form-group">
            <label className="customizer-layout-form-label">Product Title</label>
            <input
              type="text"
              className="customizer-layout-form-input"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              placeholder="Enter product title"
              maxLength={100}
            />
          </div>
          
          <div className="customizer-layout-form-group">
            <label className="customizer-layout-form-label">Description</label>
            <textarea
              className="customizer-layout-form-textarea"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe your custom product"
              rows={3}
              maxLength={500}
            />
          </div>
          
          <div className="customizer-layout-form-group">
            <label className="customizer-layout-form-label">Visibility</label>
            <div className="customizer-layout-radio-group">
              <label className="customizer-layout-radio-option">
                <input
                  type="radio"
                  name="productStatus"
                  value="public"
                  checked={productStatus === "public"}
                  onChange={(e) => setProductStatus(e.target.value)}
                />
                <span className="customizer-layout-radio-label">
                  🌍 Public - Everyone can see this product
                </span>
              </label>
              <label className="customizer-layout-radio-option">
                <input
                  type="radio"
                  name="productStatus"
                  value="private"
                  checked={productStatus === "private"}
                  onChange={(e) => setProductStatus(e.target.value)}
                />
                <span className="customizer-layout-radio-label">
                  🔒 Private - Only you can see this product
                </span>
              </label>
            </div>
          </div>
          
          <div className="customizer-layout-price-preview">
            <span>Estimated Price: </span>
            <strong>${calculateTotalPrice().toFixed(2)}</strong>
          </div>
          
          <div className="customizer-layout-modal-actions">
            <button
              className="customizer-layout-modal-button cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="customizer-layout-modal-button save"
              onClick={onSaveProduct}
              disabled={!productTitle.trim()}
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}