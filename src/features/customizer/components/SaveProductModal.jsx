import React, { useState } from "react";
import { createCustomProduct } from "../services/customizerService";
import { getUserIdFromToken } from "../../../utils/authUtils";
import { toast } from "react-toastify";

export default function SaveProductModal({ 
  isVisible, 
  onClose, 
  selectedBase,
  selectedCharms,
  modelViewerRef,
  productTitle,
  setProductTitle,
  productDescription,
  setProductDescription,
  productStatus,
  setProductStatus,
  onSaveComplete
}) {
  const [isSaving, setIsSaving] = useState(false);

  if (!isVisible) return null;

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(selectedBase?.price) || 0;
    const charmsPrice = (selectedCharms || []).reduce((total, charm) => {
      return total + (parseFloat(charm.price) || 0);
    }, 0);
    return basePrice + charmsPrice;
  };

  const handleSaveProduct = async () => {
    try {
      if (!productTitle.trim()) {
        toast.error('Product title is required');
        return;
      }

      setIsSaving(true);

      const userId = getUserIdFromToken();
      if (!userId) {
        toast.error('You must be logged in to save products');
        setIsSaving(false);
        return;
      }

      const totalPrice = calculateTotalPrice();

      const productData = {
        collectId: null,
        title: productTitle.trim(),
        descript: productDescription.trim(),
        baseId: selectedBase?.id,
        price: totalPrice,
        userId: userId,
        stock: 1,
        status: productStatus || 'active'
      };

      // Capture screenshot from 3D viewer as product image
      let images = null;
      try {
        if (modelViewerRef.current && modelViewerRef.current.captureScreenshot) {
          const screenshotBlob = await modelViewerRef.current.captureScreenshot();
          if (screenshotBlob) {
            // Convert blob to File object for FormData
            const screenshotFile = new File(
              [screenshotBlob],
              `product-preview-${productTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`,
              { type: 'image/png' }
            );
            images = [screenshotFile];
          }
        }
      } catch (error) {
        console.warn('Could not capture screenshot:', error);
      }

      // Create a model file from the customization data
      let modelFile = null;
      try {
        const currentCharms = modelViewerRef.current?.getCharms?.() || [];
        const customizationData = {
          baseId: selectedBase?.id,
          baseModel: selectedBase?.modelPath || (selectedBase?.model?.address),
          baseModelColor: '#ffffff',
          charms: currentCharms.map(charm => ({
            id: charm.id,
            charmId: charm.id,
            modelPath: charm.modelPath || (charm.model?.address),
            position: charm.position || [0, 0, 0],
            rotation: charm.rotation || [0, 0, 0],
            scale: charm.scale || [0.5, 0.5, 0.5]
          })),
          timestamp: new Date().toISOString(),
          version: "1.0"
        };
        
        // Create a JSON file from customization data
        const jsonString = JSON.stringify(customizationData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        modelFile = new File(
          [blob],
          `customization-${productTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`,
          { type: 'application/json' }
        );
      } catch (error) {
        console.warn('Could not create model file:', error);
      }

      const result = await createCustomProduct(productData, images, modelFile);
      
      toast.success(`Product "${productTitle}" created successfully!`);
      setIsSaving(false);
      
      if (onSaveComplete) {
        onSaveComplete(result);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.message || 'Failed to save product');
      setIsSaving(false);
    }
  };

  return (
    <div className="customizer-layout-popup-overlay" onClick={onClose}>
      <div className="customizer-layout-save-modal" onClick={(e) => e.stopPropagation()}>
        <div className="customizer-layout-popup-header">
          <h6>Save Custom Product</h6>
          <button 
            className="customizer-layout-popup-close"
            onClick={onClose}
            disabled={isSaving}
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
              disabled={isSaving}
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
              disabled={isSaving}
            />
          </div>
          
          <div className="customizer-layout-form-group">
            <label className="customizer-layout-form-label">Visibility</label>
            <div className="customizer-layout-radio-group">
              <label className="customizer-layout-radio-option">
                <input
                  type="radio"
                  name="productStatus"
                  value="active"
                  checked={productStatus === "active"}
                  onChange={(e) => setProductStatus(e.target.value)}
                  disabled={isSaving}
                />
                <span className="customizer-layout-radio-label">
                  Public - Everyone can see this product
                </span>
              </label>
              <label className="customizer-layout-radio-option">
                <input
                  type="radio"
                  name="productStatus"
                  value="inactive"
                  checked={productStatus === "inactive"}
                  onChange={(e) => setProductStatus(e.target.value)}
                  disabled={isSaving}
                />
                <span className="customizer-layout-radio-label">
                  Private - Only you can see this product
                </span>
              </label>
            </div>
          </div>
          
          <div className="customizer-layout-price-preview">
            <span>Total Price: </span>
            <strong>${calculateTotalPrice().toFixed(2)}</strong>
          </div>
          
          <div className="customizer-layout-modal-actions">
            <button
              className="customizer-layout-modal-button cancel"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="customizer-layout-modal-button save"
              onClick={handleSaveProduct}
              disabled={!productTitle.trim() || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}